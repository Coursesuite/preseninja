localforage.config({
	name: 'audiopresenter'
});

let dragHandler = {},
	mr_blobby = {},
	progress = null,
	body = document.body,
	slideIndex = -1,
	zone = null;

const SupportedAudio = ['ogg','mp3','m4a','wma','wav','weba'];
const SupportedPres = ['ppt','pptx','odp','pdf','key'];
const slideNode = document.getElementById("current-slide")
const thumbNode = document.getElementById("thumbnails");
const currentAudio = document.getElementById("current-audio");
const resetAudio = document.getElementById("audio-reset-button");
const recordButton = document.querySelector("a[href='#record']");
const slideCount = document.getElementById("slidecount");
const noAudioCount = document.getElementById("noaudiocount");
const recorder = new MicRecorder({
  bitRate: 128
});
const downloadButton = document.getElementById("download-button");
const previewButton = document.getElementById("preview-button");
const presEntry = document.querySelector(".presentation-entry");
const presSlides = document.querySelector(".presentation-slides");

// init
$(function() {

	$("a[href='#upload']").click(function(e) {
		e.preventDefault();
		zone = e.target.closest(".droppable");
		document.getElementById('fileupload').click();
	});

	$("a[href='#kloudless']").click(function(e) {
		zone = e.target.closest(".droppable");
		e.preventDefault();
	});

	downloadButton.addEventListener("click", tryDownloading);
	previewButton.addEventListener("click", tryPreview);

	Kloud.Init();

	localforage.getItem('cache', function (error, cache) {
		if (cache && cache.files) createSlides(cache);
	});

});

function performAlert(title, message) {
	UIkit.notification("<span uk-icon='icon: bell'></span><b>" + title + "</b><br>" + message.replace("\n","<br>"));
}

function unsupportedConversion(kind, ext) {
	if (kind === 'slide') {
		performAlert('Conversion failed', ext+' files not supported. Support presentation file types are: \n'+SupportedPres.join(', '));
	} else {
		performAlert('Conversion failed', ext+' files not supported. Support audio file types are: \n'+SupportedAudio.join(', '));
	}
}

function conversion_finished(data) {

	if (!data.files) {
		performAlert('An error occured processing your file', JSON.stringify(data));
		return;
	}

	switch (zone.id) {
		case "audio-dropzone":
			// find out the name we need to save this as
			localforage.getItem('cache')
				.then(function(cache) {
					return cache.files[slideIndex].replace(".jpg",".mp3");
				})
				.then(function(filename) {
					data.files.forEach(function(v,i) {
						fetch(data.workspace+'/'+v)
						.then(function(response) {
							return response.blob();
						})
						.then(function(blob) {
							return localforage.setItem(filename, blob);
						})
						.then(function () {
							showAudio();
						});
					});
				});
		break;

		case "presentation-dropzone":
			// store a fresh list
			localforage.setItem('cache', data);

			// download the images from the server to local storage
			const len = data.files.length-1;
			data.files.forEach(function(v,i) {
				fetch(data.workspace+'/'+v)
				.then(function(response) {
					return response.blob()
				})
				.then(function(blob) {
					localforage.setItem(v, blob);
					return URL.createObjectURL(blob);
				})
				.then(function(thumb) {
					createThumbnail(thumb,i,v);
					if (len === i) {
						thumbNode.querySelector("li:first-of-type a").click();
						countSlides();
					}
				});
			})

	}
}

function createThumbnail(data,i,v) {
	var li = document.createElement("li"),
		a = document.createElement("a"),
		img = document.createElement("img");
	img.src = data;
	img.width = "200";
	img.height = "112";
	a.appendChild(img);
	a.href = "#"+i;
	a.title = v;
	a.onclick = selectSlide;
	a.dataset.index = i;
	li.appendChild(a);
	//if(i===0)li.classList.add('uk-active');
	thumbNode.appendChild(li);
}

// clean up and reset everything
function hardReset() {
	let params = queryStringToJSON();
	fetch("reset.php?" + new URLSearchParams(params))
		.then(function(response) {
			return localforage.clear();
		})
		.then(function(foo) {
			location.reload();
		});
}

// delete the current slides audio and return to the uploader screen
function pressResetAudio() {
	if (slideIndex<0) return;
	localforage.getItem('cache')
		.then(function(cache) {
			return cache.files[slideIndex].replace(".jpg",".mp3");
		})
		.then(function(filename) {
			return localforage.removeItem(filename);
		})
		.then(function() {
			resetAudio.classList.add("uk-hidden");
			currentAudio.classList.add("uk-hidden");
			document.getElementById("audio-dropzone").classList.remove("uk-hidden");
		});
}

// start loading the slide thumbnails
// once loaded all, click the first one
function createSlides(data) {
	const len = data.files.length-1;
	data.files.forEach(function(v,i) {
		localforage.getItem(v).then(function(blob) {
			return URL.createObjectURL(blob)
		})
		.then(function(thumb) {
			createThumbnail(thumb,i,v);
			if (len === i) {
				thumbNode.querySelector("li:first-of-type a").click();
				countSlides();
			}
		})
	});
}

function countSlides() {
	let audio = 0, slide = 0;
	localforage.keys().then(function(keys) {
		keys.forEach(function(value) {
			if (value.indexOf(".mp3") === value.length-4) { audio++ }
			if (value.indexOf(".jpg") === value.length-4) { slide++ }
		});
		slideCount.value = slide;
		noAudioCount.value = slide - audio;
		if (slide - audio === 0) {
			downloadButton.removeAttribute("disabled");
		} else {
			downloadButton.setAttribute("disabled", true);
		}
	});
}

// click on a slide
function selectSlide(e) {
	presEntry.classList.add("uk-hidden");
	presSlides.classList.remove("uk-hidden");
	e.preventDefault();
	$(slideNode).empty();
	var img = document.createElement("img");
	img.src = e.target.querySelector("img").src;
	slideNode.appendChild(img);
	slideIndex = +e.target.dataset.index;
	$(e.target).closest("li").addClass("uk-active").siblings().removeClass("uk-active");
	showAudio();
}

// show audio for the current slide, if it exists
function showAudio() {
	$(currentAudio).empty();
	document.getElementById("audio-dropzone").classList.remove("uk-hidden");
	resetAudio.classList.add("uk-hidden");
	currentAudio.classList.add("uk-hidden");
	if (slideIndex < 0) return;
	localforage.getItem('cache')
		.then(function(cache) {
			return cache.files[slideIndex].replace(".jpg",".mp3");
		})
		.then(function(filename) {
			return localforage.getItem(filename)
		})
		.then(function(blob) {
			if (blob === null) return;
			document.getElementById("audio-dropzone").classList.add("uk-hidden");
			resetAudio.classList.remove("uk-hidden");
			currentAudio.classList.remove("uk-hidden");
			currentAudio.src = URL.createObjectURL(blob);
			countSlides();
		});
}

recordButton.addEventListener('click', startRecording);

function startRecording() {
  recorder.start().then(() => {
    recordButton.textContent = 'Stop recording';
    recordButton.classList.add('uk-button-danger');
    recordButton.classList.remove('uk-button-primary');
    recordButton.removeEventListener('click', startRecording);
    recordButton.addEventListener('click', stopRecording);
  }).catch((e) => {
    console.error(e);
  });
}

function stopRecording() {
  recorder.stop().getMp3().then(([buffer, blob]) => {
    localforage.getItem("cache")
    	.then(function(cache) {
	    	const name = cache.files[slideIndex].replace(".jpg",".mp3");
		    // const file = new File(buffer, name, {
		    //   type: blob.type,
		    //   lastModified: Date.now()
		    // });
	    	return localforage.setItem(name, blob);
    	})
    	.then(showAudio);

    recordButton.textContent = 'Record microphone';
    recordButton.classList.add('uk-button-primary');
    recordButton.classList.remove('uk-button-danger');
    recordButton.removeEventListener('click', stopRecording);
    recordButton.addEventListener('click', startRecording);

  }).catch((e) => {
    console.error(e);
  });
}

if (window.File && window.FileList && window.FileReader) { // if we allow dropping and acccessing the data
	if ((new XMLHttpRequest()).upload) { // not that we upload, this is an opera-incompatibility-check

		dragHandler.IsOver = false;

		// dragging from within document, e.g. making a range, dragging a sortable item, etc
		dragHandler.DragStart = function (e) {
			e.dataTransfer.effectAllowed = "move"; // don't let internal links self-drop
		}

		// dragging from somewhere onto document (could be external file)
		dragHandler.DragEnter = function (e) {
			e.preventDefault();
			if (e.dataTransfer.effectAllowed == "move") return;
			dragHandler.IsOver=true;
			setTimeout(function(){dragHandler.IsOver=false},0);
			body.classList['add']("drag-over");
		};

		dragHandler.DragOver = function (e) {
			let droppable = e.target.closest(".droppable");
			if (droppable) zone = droppable;
			e.preventDefault();
		};

		dragHandler.DragLeave = function (e) {
			if (e.dataTransfer.effectAllowed == "move") return;
			if (!dragHandler.IsOver) {
				body.classList['remove']("drag-over");
			}
			dragHandler.IsOver = false;
		};

		// a file or link is dropped onto the document
		dragHandler.Drop = function (e) {
			var dt = e.clipboardData ? e.clipboardData : e.dataTransfer ? e.dataTransfer : e; // will be "e" for <input type="file">
			if (dt.effectAllowed === "move") return; // from internal drag event
			dragHandler.IsOver = false;
			body.classList['remove']("drag-over");

			if (dt.files.length) {
				for (var i=0;i<dt.files.length;i++) {
					if (typeof e.preventDefault === 'function') e.preventDefault(); // a file was dropped
					var ext = dt.files[i].name.split(".").pop();
					if (ext === 'mp3') {
						importMp3(dt.files[i]);

					} else if (['ppt','pptx','odp','pdf','key'].indexOf(ext)!==-1) {
						dragHandler.conversion({
								inputformat: ext,
								outputformat: "jpg"
							},
							dt.files[i],
							'audio',
							dt.files[i].name
						);

					} else if (dt.files[i].type.indexOf("audio/")!==-1 || dt.files[i].type.indexOf("video/")!==-1) {

						//if (dt.files[i].type === 'video/mp4' || dt.files[i].type === 'video/webm' || dt.files[i].type === 'video/ogg') {
						//	video2mp3(dt.files[i]);
						//} else {
							dragHandler.conversion({
									inputformat: ext,
									outputformat: "mp3"
								},
								dt.files[i],
								'audio',
								dt.files[i].name
							);
						//}

					} else if ('zip'.indexOf(ext) !== -1) {
						reImport(dt.files[i]);
					} else {
						performAlert('Invalid type', dt.files[i].name + ' was not a supported file type');
					}
				}
			} else {
				if ("TEXTAREA"===e.target.nodeName||"INPUT"===e.target.nodeName) return true;
				var url = dt.getData("text/uri-list") || dt.getData("url") || dt.getData("text/plain") || undefined;
				if (url.indexOf("slideshare")===-1 && url.indexOf(".google.com")===-1) return true;
				if (url) {
					if (typeof e.preventDefault === 'function') e.preventDefault();
					oEmbed(url);
				} else {
					console.log("Drop yielded no gatherable data");
				}
			}
		}

		// called by Drop (above)
		// file_obj = the raw file reference from the drop event
		// kind = 'slides' or 'audio', which is already determined
		// extension = file extension
		dragHandler.Load = function (file_obj, kind, extension) {
			var reader = new FileReader();
			reader.onabort = function (e) {}
			reader.onprogress = function (e) {
				if (zone && !progress) {
					progress = document.createElement('progress');
					progress.setAttribute("id","upload-progress");
					zone.appendChild(progress);
				}
				if (e.lengthComputable) {
					progress.value = (e.loaded / e.total);
				}
			}
			reader.onloadstart = function (e) {}
			reader.onload = function(event) {
				$("#upload-progress").remove();
				progress = undefined; // resets import progress bar
				performance.mark('file-reader-begin');
				dragHandler.conversion({
						inputformat: extension,
						outputformat: (kind === 'slides') ? "jpg" : "mp3" // one of jpg, png, html, mp3 to determine conversion engine
					},
					new Blob([new Uint8Array(event.target.result)]),
					kind,
					file_obj.name
				);
			}
			reader.readAsArrayBuffer(file_obj);
		}

		// Called by Load (above)
		// performs the (possibly long running) conversion by sending the file server-side
		// then picking up the response json
		dragHandler.conversion = function(params, blob, kind, title) {
			performance.mark('conversion-begin');
			var progress = 0;

			body.classList.add('waiting');

			var xhr = new XMLHttpRequest();
			xhr.responseType = "json";
			xhr.open("POST", "upload.php"+location.search, true);

			var fd = new FormData();
			fd.append("file", blob);
			for (const [key,value] of Object.entries(params)) {
				fd.append(key, value);
			}
			// fd.append("inputformat", params["inputformat"]);
			// fd.append("outputformat", params["outputformat"]);

			if (blob === null && typeof extras !== 'undefined') {
				fd.append("source","kloud");
			} else if (blob instanceof Blob) {
				// i need a clone of the original blob, which is destroyed by appending it to formdata later on
				mr_blobby = new Blob([blob], {type: blob.type});
			} else if (typeof title === 'undefined') {
				title = blob.name;
			}

			fd.append("name", title);

			if (zone && !progress) {
				progress = document.createElement('progress');
				progress.setAttribute("id","upload-progress");
				zone.appendChild(progress); // should still be a reference
			}

			xhr.upload.addEventListener('progress', function (e) {
				if (zone && !progress) {
					progress = document.createElement('progress');
					progress.setAttribute("id","upload-progress");
					zone.appendChild(progress); // should still be a reference
				}
				progress.value = e.loaded / e.total;
				if (e.loaded === e.total) {
					progress.removeAttribute("value"); // makes it indeterminate
				}
			});

			xhr.onload = function(e) {
				body.classList.remove('waiting');
				$("#upload-progress").remove();
				progress = undefined; // resets progress bar

				conversion_finished(xhr.response);
			};

			xhr.onerror = function(e) {
				body.classList.remove('waiting');
				$("#upload-progress").remove();
				console.log("Error, ", xhr.status, e);
				performAlert('Error in conversion', 'perhaps refresh and try again?');
			};

			xhr.send(fd);
		}

		dragHandler.Input = function (e) {
			var url = document.getElementById("paste-url").value.trim();
			if (url.length) oEmbed(url);
		}

		body.addEventListener("dragenter", dragHandler.DragEnter, false);
		body.addEventListener("dragover", dragHandler.DragOver, false);
		body.addEventListener("dragleave", dragHandler.DragLeave, false);
		body.addEventListener("drop", dragHandler.Drop, false);
		body.addEventListener("dragstart", dragHandler.DragStart, false);
		// body.addEventListener("paste", dragHandler.Drop, false);

		document.getElementById("paste-url-action").addEventListener("click", dragHandler.Input, false);

		//convert selected file
		// var browseUpload = function(file) {
		// 	var ext = file.name.substring(file.name.lastIndexOf('.')+1);
		// 	if ('zip'.indexOf(ext) !== -1) {
		// 		reImport(file);
		// 	} else {
		// 		var kind = (SupportedPres.includes(ext)) ? 'slides' : 'audio';
		// 		if (kind === 'slides' && props.slides.length > 0) {
		// 			document.querySelector('#addAnother > span').textContent = "Converting...";
		// 			document.getElementById('addAnother').disabled = true;
		// 		}
		// 		dragHandler.Load(file, kind, ext);
		// 	}
		// }
	}
}

function importMp3(file_obj) {
	if (slideIndex < 0) return;
    localforage.getItem("cache")
	.then(function(cache) {
    	const filename = cache.files[slideIndex].replace(".jpg",".mp3");
		const reader = new FileReader();
		reader.onload = function (event) {
			const blob = new Blob([new Uint8Array(event.target.result)]);
			localforage.setItem(filename, blob).then(function() {
				showAudio();
			});
		}
		reader.readAsArrayBuffer(file_obj);
	});
}

function tryDownloading() {
	if (downloadButton.hasAttribute("disabled")) return;
	performAlert("not implemented","yet");

}

var __win;
function tryPreview() {

	localforage.getItem('cache').then(function(cache) {

		var w = parseInt(body.offsetWidth * .75,10),
			h = parseInt(body.offsetHeight * .75, 10);

		__win = PopupCenter("preview.html","preview",w,h);

		__win.onload = function () {
			const div = __win.document.body.querySelector(".uk-slideshow-items");
			cache.files.forEach(function(v,i) {
				Promise.all([
				    localforage.getItem(v),
				    localforage.getItem(v.replace(".jpg",".mp3"))
	            ]).then(function(results) {
	            	const li = document.createElement("li");
	            	if (i===0) li.classList.add("uk-active");
	            	const img = document.createElement("img");
	            	img.src = URL.createObjectURL(results[0]);
	            	li.appendChild(img);
	            	const aud = document.createElement("audio");
	            	aud.setAttribute("controls", true);
	            	aud.classList.add("uk-width-1-1");
	            	aud.src = URL.createObjectURL(results[1]);
	            	li.appendChild(aud);
	            	div.appendChild(li);
	            });
			});
		}

   });
}

function queryStringToJSON(qs) {
    qs = qs || location.search.slice(1);

    var pairs = qs.split('&');
    var result = {};
    pairs.forEach(function(p) {
        var pair = p.split('=');
        var key = pair[0];
        var value = decodeURIComponent(pair[1] || '');

        if( result[key] ) {
            if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
                result[key].push( value );
            } else {
                result[key] = [ result[key], value ];
            }
        } else {
            result[key] = value;
        }
    });

    return JSON.parse(JSON.stringify(result));
};

// https://stackoverflow.com/questions/61264581/how-to-convert-audio-buffer-to-mp3-in-javascript
// https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/
// https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext
// https://github.com/zhuker/lamejs/issues
// https://stackoverflow.com/questions/24372870/audio-array-buffer-to-audio-element
// https://jsfiddle.net/8w5xs9o5/23/
// https://github.com/zhuker/lamejs
// https://jsfiddle.net/ayunami2000/c5xdL6xL/
// https://stackoverflow.com/questions/49140159/extracting-audio-from-a-video-file

function video2mp3(file_obj) {
  var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
      reader = new FileReader(),
      myBuffer;
  reader.onload = function() {
    audioContext.decodeAudioData(reader.result, function(buffer) {
    	var offlineAudioCtx = new OfflineAudioContext({
		  numberOfChannels: 2,
		  length: 44100 * buffer.duration,
		  sampleRate: 44100,
		});
		offlineAudioCtx.startRendering().then(audioBufferToWav);
    });
    //audioContext.decodeAudioData(reader.result, audioBufferToWav);
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

	localforage.getItem('cache')
		.then(function(cache) {
			return cache.files[slideIndex].replace(".jpg",".mp3");
		})
		.then(function(filename) {
			return localforage.setItem(filename, mp3Blob);
		})
		.then(function () {
			showAudio();
		});

    // var bUrl = window.URL.createObjectURL(mp3Blob);


    // // send the download link to the console
    // console.log('mp3 download:', bUrl);

}

// location, title, width, height
function PopupCenter(a, d, b, c) {
    var e = void 0 != window.screenLeft ? window.screenLeft : screen.left,
        f = void 0 != window.screenTop ? window.screenTop : screen.top;
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    a = window.open(a, d, "scrollbars=yes, width=" + b + ", height=" + c + ", top=" + (height / 2 - c / 2 + f) + ", left=" + (width / 2 - b / 2 + e) + ', resizable=yes');
    window.focus && a.focus()
    return a;
};