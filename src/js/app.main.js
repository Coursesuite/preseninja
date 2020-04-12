$(function() {
	performance.mark('jquery-init');

	document.addEventListener('keydown', function (evt) {
		var keycode = evt.keyCode || evt.which;
		switch (keycode) {
			case ArrowKeys.LEFT:
				if (!_recording) {
					UI.Nav.Slides.Left();
				}
				break;
			case ArrowKeys.RIGHT:
				if (_recording) {
					setCue();
				}
				UI.Nav.Slides.Right();
				break;
		}
	}, false);

	$(document.body).css("margin-top", (function() {
		return $("#banner").height() + $("#tabs").height() + "px";
	})());

	var h = $("#banner").height() + $("#tabs").height() + "px";
	document.documentElement.style.setProperty('--titleHeight', h);

	// L for log
	document.addEventListener('keyup', function(e) {
		if (e.code === 'KeyL' && window.location.href === 'http://localhost:8080/app/') {
			console.log(ChapterEditor.GetPeaks());
		}
	});

	completionInput.addEventListener('input', function(e) {
		var val = parseInt(this.value, 10);
		var max = parseInt(this.max, 10);
		var min = parseInt(this.min, 10);
		if (this.value != val) {
			this.value = '';
			return;
		}
		if (val > max) {
			this.value = max;
		} else if (val < min) {
			this.value = min;
		}
		props.completeAfter = val;
		UI.Dom.Cache.Save();
	});
	completionInput.addEventListener('focusout', function(e) {
		if (!this.value) {this.value = this.max;}
	});
	var kloudless_init = function() {
		Kloud.Init();
		document.getElementById('slideCloudUpload').removeEventListener("click", kloudless_init);
		document.getElementById('audioCloudUpload').removeEventListener("click", kloudless_init);
		$('#'+this.id).click();
	}
	document.getElementById('slideCloudUpload').addEventListener("click", kloudless_init);
	document.getElementById('audioCloudUpload').addEventListener("click", kloudless_init);

	// header tab switcher + animation
	$(nav).on("click","a[data-tab]", function (e) {
		e.preventDefault();
		loader.show(); // svgloader data-opening
		document.body.classList.remove('settings','sources','slides','design','download');
		// if (!MUTED) snd.play(); // ninja sword sound to match loader effect (chrome auto play policy changes are fucking with this)
		setTimeout( function() {
			window.scrollTo(0,0);
			document.body.classList.add(e.target.dataset.tab);
			loader.hide();
			UI.Dom.Settings.Save(); // remembers which tab you are on as a side-effect
			if (e.target.dataset.tab === 'slides' && ChapterEditor.GetPeaks() !== undefined) {
				if (props.cues.length !== props.slides.length) {
					fillCues();
					ChapterEditor.Reset(false);
				}
				ChapterEditor.Show();
			}
		}, speed * 2 );
	});

	// start the main observer and bind various interface bits
	UI.Dom.Cache.Load().then(function() {

		[].forEach.call(document.querySelectorAll("input.jscolor"), function (el) {
			//var p = tinycolorpicker(el);
			//_colour_pickers.push([p,el]);
			//p.setColor(el.dataset.default);
			_colour_pickers.push(el);
			el.addEventListener("change",function() {
				UI.Dom.Design.Compute(true);
			},false);
		});

	}).then(function() {

		UI.Dom.Design.Compute(false);
		if (document.querySelector("section#sources .done + .done") === null) {
			document.querySelector("a[data-tab='slides']").setAttribute("data-ready","false");
		}

	}).then(function() {

		// observe class changes on body and pre-prep the tab (might be via user-click or via cache-load or via 'continue' click)
		const bc = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutant) {
				if (mutant.type==='attributes' && mutant.attributeName==='class') { //  && !mutant.target.classList.contains(mutant.oldValue)) {
					if (document.body.classList.contains('slides')) {
						if (document.querySelector(".slide-processing.done") && document.querySelector(".audio-processing.done") !== null) {
							document.querySelector("a[data-tab='slides']").removeAttribute("data-ready");
						}

						if (document.querySelector(".slide-processing.done") === null || document.querySelector(".audio-processing.done") === null) {
							performAlert("Missing content", "<p>You need to add your audio and presentation before you can modify the slide markers.</p>");
							$("a[data-tab='sources']").trigger("click");
							return;
						}
						if (props.slides.length > 0) {
							completionInput.setAttribute("max", props.slides.length);
							completionInput.value = (props.completeAfter === 0) ? props.slides.length : props.completeAfter;
						}

						if (waveformLoaded === false) {
							ChapterEditor.Initialise();
						}

					} else if (document.body.classList.contains('download')) {
						if (document.querySelector("input[name='option-course-name']").value.trim().length === 0 && props.slides.length > 0) {
							var courseName = props.slides[0].label.replace(" - Page 1","");
							document.querySelector("input[name='option-course-name']").value = courseName;
							props['name'] = courseName;
							localforage.setItem('props', props);
						}

					}

				}
			})
		});
		bc.observe(document.body, {
			attributes: true,
			attributeOldValue: true,
			attributeFiter: ['class'],
			characterData: false
		});

	}).then(function() {

		UI.Dom.Settings.Load(); // settings menu, selected tab, AFTER observer

	}); // cues, slides, properties, converted audio

	/* -----------------------------------------
		BUTTON: delete all pages (start over)
	----------------------------------------- */
	$("#clearStorage").on("click", function(e) {
		e.preventDefault();
		$("#confirm").addClass("active");
		$("#reset-hint-text").text("Really?");
	});
	$("#cancelReset").on("click", function(e) {
		e.preventDefault();
		$("#confirm").removeClass("active");
		$("#reset-hint-text").text("Reset");
	});
	$("#confirmReset").on("click", function(e) {
		if (_player) _player.destroy();
		e.preventDefault();
		$("#confirm").removeClass("active");
		$("#reset-hint-text").text("Reset");
		localforage.clear().then(function() {
			if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
				$("#confirmSlideDelete").click();
				$("#confirmAudioDelete").click();
				ChapterEditor.UnInitialise();
				waveformLoaded = false;
				document.body.classList = 'sources';
			} else {
				location.reload(true);
			}
		});
	});

	/* -----------------------------------------
		BUTTON: delete slideshow
	------------------------------------------*/
	$("#deleteSlideshow").on("click", function(e) {
		e.preventDefault();
		$("span.slide-delete-confirm").addClass("active");
		$("#slide-delete-text").text("Really?");
	});
	$("#cancelSlideDelete").on("click", function(e) {
		e.preventDefault();
		$("span.slide-delete-confirm").removeClass("active");
		$("#slide-delete-text").text("Delete Slides");
	});
	$("#confirmSlideDelete").on("click", function(e) {
		e.preventDefault();
		$("span.slide-delete-confirm").removeClass("active");
		$("#slide-delete-text").text("Delete Slides");
		$("a[data-tab='slides']").attr("data-ready", "false");
		$(".slide.progress-bar > span").width("0%");
		UI.Reset.Sources.Slides();
		props.slides = [];
		props.slidePageNames = [];
		props.chapterWidths = [];
		localforage.removeItem("props");
		localforage.iterate(function(val, key, i) {
			if (key.startsWith("page-")) {
				localforage.removeItem(key);
			}
		});
		ChapterEditor.UnInitialise();
		waveformLoaded = false;
	});

	/* ----------------------------------------
		BUTTON: delete audio
	-----------------------------------------*/
	$("#deleteAudio").on("click",  function(e) {
		e.preventDefault();
		$("span.audio-delete-confirm").addClass("active");
		$("#audio-delete-text").text("Really?");
	});
	$("#cancelAudioDelete").on("click", function(e) {
		e.preventDefault();
		$("span.audio-delete-confirm").removeClass("active");
		$("#audio-delete-text").text("Delete Audio");
	});
	$("#confirmAudioDelete").on("click", function(e) {
		$("span.audio-delete-confirm").removeClass("active");
		$("#audio-delete-text").text("Delete Audio");
		$("a[data-tab='slides']").attr("data-ready", "false");
		$(".controls-container button[data-action='delete']").trigger("click");
		$(".audio.progress-bar > span").width("0%");
		UI.Reset.Sources.Audio();
		localforage.removeItem("mp3");
		localforage.removeItem("props");
		var audio = document.getElementById("page-audio-obj");
		audio.src = "";
		// audio.removeEventListener('canplaythrough', _audio_can_play);
		var len = audio.childNodes.length;
		for (var i = 0; i < len; i++) {
			audio.removeChild(audio.firstChild);
		}
		ChapterEditor.UnInitialise();
		waveformLoaded = false;
	});

	/* -----------------------------------------
		bind download button animation
	----------------------------------------- */
	[].forEach.call(document.querySelectorAll(".progress-button"), function(el) {
		var dl = new UIProgressButton(el, {
			callback: function (instance) { },
			onbegin: Downloader.Begin,
		});
	});

	$("#alert").on("click", "button", function (e) {
		$("#alert").removeClass("pop");
		$("#alert-text").html("");
	});

	// toggle settings and persist in body class
	$("#cog").on("click", "a", function (e) {
		e.preventDefault();
		var action = (e.currentTarget.dataset.action ? e.currentTarget.dataset.action : e.currentTarget.parentNode.dataset.action).replace("toggle-", "");
		document.body.classList.toggle(action);
		UI.Dom.Settings.Save();
		MUTED = body.classList.contains("mute");
		AUTOCONVERT = !body.classList.contains("no-autoconvert");
	});

	// save cache during various click / change events
	[].forEach.call(aspectRatios, function(el) {
		el.addEventListener("click", function (e) {
			[].forEach.call(aspectRatios, function(q) { // ugh!
				q.classList[q===e.target.parentNode ? 'add' : 'remove']('active');
			});
			UI.Dom.Cache.Save();
		});
	});
	document.forms["design-options"].querySelector("select").addEventListener("change", UI.Dom.Cache.Save, false);
	$("input[name]").on("change", function(event) {
		UI.Dom.Cache.Save();
	});
	$("h3[title]").on("click", function(e) {
		$("input[value=" + e.target.attributes.title.textContent + "]").prop('checked', true);
		UI.Dom.Cache.Save();
	});

	// if recording from microphone is available
	if (navigator.mediaDevices) {
		var recorder = (function() {
			var toggleRecording = document.querySelector('[data-action="record"]'),
				toggleRecordingLabel = toggleRecording.querySelector("span"),
				deleteRecording = document.querySelector('[data-action="delete"]'),
				useThis = document.querySelector('[data-action="use"]'),
				recorderObject = document.getElementById('recorder-audio'),
				canvas = document.querySelector("canvas.visualiser"),
				recDesc = document.querySelector('.rec-desc'),
				recHelp = document.querySelector('.rec-help'),
				constraints = {audio:true,video:false},
				chunks = [];

			// make record button visible
			toggleRecording.classList.add("visible");

			var supportedMime = function() {
				var types = ["audio/webm", "audio/ogg", "audio/mp3"];
				types.forEach(function(el) {
					if (MediaRecorder.isTypeSupported(el)) {return el}
				});
			}

			var onSuccess = function(stream) {
				// user chose to let us hear their microphone, so remove that listener
				toggleRecording.removeEventListener("click", recordingPrompt);
				toggleRecordingLabel.textContent = 'Begin';
				// record in webm format, which is ogg with opus
				var mime = supportedMime();
				var mediaRecorder = new MediaRecorder(stream, {mimeType : mime});
				var playing = false;
				var recordingTimerDisplay = document.getElementById("recorder-timestamp");
				var recordingTimerResolution = 50;
				var recordingInterval = undefined;
				_recordingTimestamp = 0;
				_recording = false;
				var recordingTimer = function () {
					_recordingTimestamp += recordingTimerResolution;
					/*
					if (props.slides.length) {
						props.slides[CurrentSlide].cue = Math.round((recordingTimestamp / 1000) * 1e3) / 1e3;
						props.split = true; // to prevent autosplitting after conversion
					}*/
					recordingTimerDisplay.innerHTML = HHMMSS(_recordingTimestamp / 1000);
				};

				// clicking record button changes it to stop
				toggleRecording.addEventListener("click", function () {
					deleteRecording.classList.remove("visible");
					useThis.classList.remove("visible");
					if (_recording) {
						_recording = false;
						canvas.classList.remove('visible');
						toggleRecordingLabel.textContent = "Begin";
						toggleRecording.classList.remove("button-error");
						toggleRecording.classList.add("button-secondary");
						recHelp.classList.remove('visible');
						recordingTimerDisplay.innerHTML = '';
						mediaRecorder.stop();
						clearInterval(recordingInterval);
					} else {
						_recording = true;
						visualize(canvas, stream);
						chunks = []; // reset before you start, in case this is a re-recording
						canvas.classList.add("visible");
						toggleRecordingLabel.textContent = "Stop";
						toggleRecording.classList.add("button-error");
						toggleRecording.classList.remove("button-secondary");
						recDesc.classList.remove('visible');
						recHelp.classList.add('visible');
						mediaRecorder.start(); // minimum resolution for recording slide changes
						recordingInterval = setInterval(recordingTimer, recordingTimerResolution);
					}
				}, false);

				// when the stream stops, enable various interface actions
				mediaRecorder.addEventListener("stop", function(e) {
					var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
					recorderObject.src = window.URL.createObjectURL(blob);
					useThis.classList.add("visible");
					recorderObject.classList.add("visible");
					canvas.classList.remove("visible");
					toggleRecording.classList.remove("visible");
					deleteRecording.classList.add("visible");
					clearInterval(recordingInterval); // should already be stopped
				}, false);

				// when delete recording is clicked, disable various interface actions
				deleteRecording.addEventListener("click", function() {
					chunks = [];
					canvas.classList.remove("visible");
					useThis.classList.remove("visible");
					recorderObject.pause();
					recorderObject.removeAttribute("src");
					recorderObject.classList.remove("visible");
					toggleRecording.classList.add("visible");
					deleteRecording.classList.remove("visible");
					recDesc.classList.add('visible');
					_recordingTimestamp = 0;
					recordingTimerDisplay.innerHTML = "";
				}, false);

				// as data is recorded, remember the audio data and remember slide change data
				mediaRecorder.addEventListener("dataavailable", function(e) {
					chunks.push(e.data);
				}, false);

				// after a recording, perform audio conversion from ogg to mp3
				useThis.addEventListener("click", function () {

					UI.Converting("audio");
					localforage.setItem('props', props);

					var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
						dragHandler.convertAudio("microphone.oga", "oga", blob);
				}, false);

			}

			// recording is unsupported, likely a hardware/os problem, should prompt user to let them know
			var onError = function(err) {
				console.dir(err);
			}

			// non-hoisted stub for detecting microphone
			var recordingPrompt = function () {
				navigator.mediaDevices.getUserMedia(constraints)
					.then(onSuccess, onError);
			}
			toggleRecording.addEventListener("click", recordingPrompt, false);


					/*
			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {

					return devices.some(function(val) {
						return val.kind === "audioinput" && val.label !== ""
					})
				});
				.then(function(hasAccess) {
					if (hasAccess) { // can set up the recording button right away

						recordingPrompt();

					} else { // we need to let them get prompted for microphone access

						// click record button to check for microphone access (cause user prompt for permission to microphone)
						toggleRecording.addEventListener("click", recordingPrompt, false);

					}
				});
				*/
		})();

	} else {
		$(".audio-urlzone .controls-container").hide();
		$("small.microphone").hide();
	}

	$('a[data-action="pop-help"]').on("click", function(e) {
		e.preventDefault();
		PopupCenter (this.href,"Help & Documentation", 650, ~~(($(window).height() /5) * 4));
	});

});