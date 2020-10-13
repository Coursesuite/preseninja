  function interleave(chanData) {
      var chans = chanData.length;
      if (chans === 1) return chanData[0];
      var l0 = chanData[0].length;
      var length = l0 * chans;
      var result = new Float32Array(length);
      var index = 0;
      var inputIndex = 0;
      for (var i = 0; i < l0; i++) {
          for (var c = 0; c < chans; c++) {
              result[i * chans + c] = chanData[c][i];
          }
      }
      return result;
  }

  function floatTo16BitPCM(output, offset, input) {
      try {
          for (var i = 0; i < input.length; i++, offset += 2) {
              var s = Math.max(-1, Math.min(1, input[i]));
              output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          }
      } catch (ex) {
          console.dir(ex);
      }
  }

  function wryte(view, offset, string) {
      for (var i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
      }
  }

  function getAudioSamplesAsWavBlob(samples, interleavedChannels, sampleRate) {
      // see: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
      interleavedChannels = interleavedChannels || 1;
      var buffer = new ArrayBuffer(44 + samples.length * 2); // 44 + PCM points * 2
      var dv = new DataView(buffer);
      // -- header
      wryte(dv, 0, 'RIFF'); // RIFF
      dv.setUint32(4, 32 + samples.length * interleavedChannels, true); // 32 + length
      wryte(dv, 8, 'WAVE'); // RIFF type
      // -- chunk 1
      wryte(dv, 12, 'fmt '); // chunk id
      dv.setUint32(16, 16, true); // subchunk1size (16 for PCM)
      dv.setUint16(20, 1, true); // 1=PCM
      dv.setUint16(22, interleavedChannels, true); // num channels
      dv.setUint32(24, sampleRate, true); // samplerate
      dv.setUint32(28, sampleRate * interleavedChannels * 2, true); // byterate
      dv.setUint16(32, 2 * interleavedChannels, true); // block align
      dv.setUint16(34, 16, true); // bits per sample (16 = 2 bytes)
      // -- chunk 2
      wryte(dv, 36, 'data'); // data chunk id
      dv.setUint32(40, samples.length * interleavedChannels, true); // chunk len
      floatTo16BitPCM(dv, 44, samples);
      var wavBlob = new Blob([dv], {
          type: "audio/wav"
      });
      return wavBlob;
  };

  function exportWAVSampleAndSave(sample, callback) {
      var chanData = [];
      var chans = sample.numberOfChannels;
      for (var c = 0; c < chans; c++) {
          chanData.push(sample.getChannelData(c));
      }
      var sample_chandata = interleave(chanData);
      return callback(getAudioSamplesAsWavBlob(sample_chandata, chans, sample.sampleRate));
  };

  function go() {
      var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
          reader = new FileReader(),
          myBuffer;
      reader.onload = function() {
          var videoFileAsBuffer = reader.result;
          audioContext.decodeAudioData(videoFileAsBuffer, function(decodedAudioData) {
              try {
                  var duration = decodedAudioData.duration;
                  var offlineAudioContext = new(window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, 44100 * duration, 44100);
                  var soundSource = offlineAudioContext.createBufferSource();
                  myBuffer = decodedAudioData;
                  soundSource.buffer = myBuffer;
                  soundSource.connect(offlineAudioContext.destination);
                  var source = audioContext.createBufferSource();
                  offlineAudioContext.oncomplete = function(e) {
                      document.querySelectorAll("button")[1].onclick = function() {
                          this.setAttribute("disabled", "");
                          source.buffer = e.renderedBuffer;
                          source.connect(audioContext.destination);
                          source.start ? source.start(0) : source.noteOn(0);
                          exportWAVSampleAndSave(e.renderedBuffer, function(blob) {
                              window.open(window.URL.createObjectURL(blob), "");
                          });
                      };
                      document.querySelectorAll("button")[1].removeAttribute("disabled");
                  };
                  offlineAudioContext.startRendering();
                  soundSource.start ? soundSource.start(0) : soundSource.noteOn(0);
              } catch (ex) {
                  alert(ex);
              }
          });
      };
      reader.readAsArrayBuffer(document.querySelector("input[type=file]").files[0]);
  }

  function video2mp3(file_obj) {
      var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
          reader = new FileReader(),
          myBuffer;
      reader.onload = function() {
        audioContext.decodeAudioData(reader.result, audioBufferToWav);
      }
      reader.readAsArrayBuffer(file_obj);
  }

  function audioBufferToWav(aBuffer) {
    let numOfChan = aBuffer.numberOfChannels,
        btwLength = aBuffer.length * numOfChan * 2 + 44,
        btwArrBuff = new ArrayBuffer(btwLength),
        btwView = new DataView(btwArrBuff),
        btwChnls = [],
        btwIndex,
        btwSample,
        btwOffset = 0,
        btwPos = 0;
    setUint32(0x46464952); // "RIFF"
    setUint32(btwLength - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(aBuffer.sampleRate);
    setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" - chunk
    setUint32(btwLength - btwPos - 4); // chunk length

    for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
        btwChnls.push(aBuffer.getChannelData(btwIndex));

    while (btwPos < btwLength) {
        for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
            // interleave btwChnls
            btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
            btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
            btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
            btwPos += 2;
        }
        btwOffset++; // next source sample
    }

    let wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff));
    let wavSamples = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2);

    wavToMp3(wavHdr.channels, wavHdr.sampleRate, wavSamples);

    function setUint16(data) {
        btwView.setUint16(btwPos, data, true);
        btwPos += 2;
    }

    function setUint32(data) {
        btwView.setUint32(btwPos, data, true);
        btwPos += 4;
    }
}

function wavToMp3(channels, sampleRate, samples) {
    var buffer = [];
    var mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
    var remaining = samples.length;
    var samplesPerFrame = 1152;
    for (var i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
        var mono = samples.subarray(i, i + samplesPerFrame);
        var mp3buf = mp3enc.encodeBuffer(mono);
        if (mp3buf.length > 0) {
            buffer.push(new Int8Array(mp3buf));
        }
        remaining -= samplesPerFrame;
    }
    var d = mp3enc.flush();
    if(d.length > 0){
        buffer.push(new Int8Array(d));
    }

    var mp3Blob = new Blob(buffer, {type: 'audio/mp3'});
    var bUrl = window.URL.createObjectURL(mp3Blob);

    // send the download link to the console
    console.log('mp3 download:', bUrl);

}