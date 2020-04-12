var UI = (function () {

	var __t, __cs;

	function get_audio_object() {

		return document.getElementById("page-audio-obj");

	}

	var _add_audio_source = function (blob, save) {
		return new Promise(function(resolve,reject) {
			var audio = get_audio_object();
			audio.setAttribute("src", URL.createObjectURL(blob));
			_audio_can_play = function(){
				props.duration = audio.duration;
				if(save===true) {
					localforage.setItem('mp3', blob)
					.then(function() {
						toggleLoad('audio', false);
						$(".audio-dropzone").hide();
						UI.Dom.Audio.Ready();
						UI.Dom.Cache.Save();
						audio.removeEventListener('canplaythrough', _audio_can_play);
						resolve();
					})
					.catch(function(err) {
						console.warn(err);
						reject();
					});
				}
				UI.Dom.Cache.Save();
				audio.removeEventListener('canplaythrough', _audio_can_play);
				resolve();
			}
			audio.addEventListener('canplaythrough', _audio_can_play);
		});
	}

	var _add_audio_track = function (save) {
		var audio = get_audio_object();
		var track = audio.querySelector("track");
		if (!track) {
			track = document.createElement("track");
			track.setAttribute("kind", "chapters");
			track.setAttribute("defualt", true);
			audio.appendChild(track);
		}
		if (save===true) {
			UI.Dom.Cache.Save();
		}
	}

	// after a drop / paste / url operation, tell the user what we are doing.
	var _conversion_feedback = function(kind) {
		$("." + kind + "-dropzone p").html("Converting " + kind + " to HTML5 ... please wait");
	}

	// store all settings for the app in local storage (slide index, properties)
	// prevent flooding using debounce
	var _cache_save = debounce(function() {
		props["aspectRatio"] = document.querySelector(".aspect-ratio.active > span").textContent;
		props["player"] = $("input[name=playerType]:checked").val();
		props["volume"] = document.forms["design-options"].volume.value;
		props["name"] = document.forms["settings"].elements["option-course-name"].value;
		props["description"] = document.forms["settings"].elements["option-course-description"].value;
		props["copyright"] = document.forms["settings"].elements["option-course-copyright"].value;
		props["api"] = document.forms["settings"].elements["option-course-api"].value;
		props["duration"] = document.getElementById("page-audio-obj").duration;
		return localforage.setItem("props", props);
	}, 999);

	// load all settings for the app from local storage, return a promise that resolves after sources are added, etc
	var _cache_load = function() {
		return new Promise(function(resolve,reject) {
			localforage.getItem("props").then(function(value) {


				// restore props in a way that triggers any property setters: order is important
				[['split',undefined],['slides',[]],['cues',[]],['duration',0],['score',0],['completeAfter', 0],'colours','name','description','copyright',
					['api','scorm12'],
					['range-colour','rgb(3,145,206)'],
					['bg-colour','rgb(255,255,255)'],
					['text-colour','rgb(0,0,0)'],
					['body-text-colour','rgb(3,145,206)'],
					['body-bg-colour','rgb(0,0,0)'],
					['player', 'basic'],
					['volume','80'],
					['aspectRatio', '16:9']
				].forEach(function(key) {
					if (Array.isArray(key)) {
						props[key[0]] = value && value[key[0]] || key[1];
					} else {
						props[key] = value && value[key] || '';
					}
				});
				UI.Dom.Design.SetAspectRatio(props["aspectRatio"]);
				document.getElementById("fiddle").textContent = props["colours"];
				document.forms["design-options"].playerType.value = props["player"];
				document.forms["design-options"].volume.value = props["volume"];
				document.forms["settings"].elements["option-course-name"].value = props["name"];
				document.forms["settings"].elements["option-course-description"].value = props["description"];
				document.forms["settings"].elements["option-course-copyright"].value = props["copyright"];
				document.forms["settings"].querySelector("[value='" + props["api"] + "']").checked = true;
				// Colours
				var rc = document.getElementById("range-colour");
				rc.setAttribute("data-default", props["range-colour"]);
				rc.setAttribute("value", props["range-colour"].replace('#',''));
				var bgc = document.getElementById("bg-colour");
				bgc.setAttribute("data-default", props["bg-colour"]);
				bgc.setAttribute("value", props["bg-colour"].replace('#',''));
				var tc = document.getElementById("text-colour");
				tc.setAttribute("data-default", props["text-colour"]);
				tc.setAttribute("value", props["text-colour"].replace('#',''));
				var bbc = document.getElementById("body-bg-colour");
				bbc.setAttribute("data-default", props["body-bg-colour"]);
				bbc.setAttribute("value", props["body-bg-colour"].replace('#',''));
				var btc = document.getElementById("body-text-colour");
				btc.setAttribute("data-default", props["body-text-colour"]);
				btc.setAttribute("value", props["body-text-colour"].replace('#',''));

				// re-load any pre-saved audio sources, ensuring they don't re-save!

				localforage.getItem('mp3').then(function(data){
					if (data) {
						UI.Dom.Audio.AddSource(data,false);
						UI.Dom.Audio.Ready();
					}
				});

				// update interface properties
				if (props.slides.length > 0) {
					UI.Dom.Slide.Ready();
				}
				if (props.duration > 0) {
				 	UI.Dom.Audio.Ready();
				}
				resolve();

			});
		});
	}

	// Slide preview for slide tab
	// destroy the current preview or contents, then create an iframe wrapper to preview the file in
	var _slide_preview = function(index) {
		var slide = props.slides[index];
		// slidesPreviewFrame.src = "about:blank";
		previewPageNumber.textContent = Number(index) + 1; // humans read 1-based indexes better ...
		previewPageNumber.classList.add("puff");
		setTimeout(function() {
			previewPageNumber.classList.remove("puff");
		},550); // any time after puff animation
		localforage.getItem(props.slides[index].fileid).then(function(blob) {
			// var blob = new Blob([value], { 'type' : 'text/html' });
			// value = null; // release memory
			slidesPreviewFrame.setAttribute("src", window.URL.createObjectURL(blob));
			// window.URL.revokeObjectURL(blob);
		});


		// localforage.getItem(props.slides[index].fileid).then(function(content) {
			// var frameDoc = slidesPreviewFrame.contentDocument || slidesPreviewFrame.contentWindow.document;
			// frameDoc.open();
			// frameDoc.write(content);
			// frameDoc.close();
		// });
	}

	var _settings_save = function () {
		localforage.setItem("bodyclasses", body.className);
	}

	var _settings_load = function () {
		localforage.getItem("bodyclasses", function (err, value) {
			if (value) body.className = value;
		});
	}

	var _audio_ready = function () {
		document.querySelector("#sources .audio-processing").classList.add("done");

		// If both slides and audio are finished converting swap to slide marker tab
		localforage.getItem("bodyclasses").then(function(val) {
			if (val === null && document.querySelector("#sources .slide-presentation").classList.contains("done")) {
				document.querySelector("a[data-tab='slides']").setAttribute("data-ready","true");
				$("a[data-tab='slides']",nav).trigger("click");
			} else if (document.querySelector("#sources .slide-presentation").classList.contains("done")) {
				document.querySelector("a[data-tab='slides']").setAttribute("data-ready", "true");
			}
			if (props.cues.length < props.slides.length) {
				fillCues();
			}
		}).catch(function(err) {
			console.log(err);
		});

	}

	var _slides_ready = function () {
		document.querySelector("#sources .slide-presentation").classList.add("done");
		document.querySelector("#sources .slide-processing").classList.add("done");
		UI.Nav.Slides.Show();
		UI.Dom.Slide.Preview(0);

		// Setup default slide names
		localforage.getItem('props').then(function(val) {
			if (val.slidePageNames.length === 0 || val.slidePageNames.length !== val.slides.length) {
				var i = (val.slidePageNames.length == 0) ? 0 : val.slidePageNames.length - 1;
				for (i; i < props.slides.length; i++) {
					props.slidePageNames[i] = 'Slide ' + (i+1);
				}
				localforage.setItem('props', props);
			} else {
				props.slidePageNames = val.slidePageNames;
			}
		});

		// If both slides and audio are finished converting swap to slide marker tab
		localforage.getItem("bodyclasses").then(function(val) {
			if (val === null && document.querySelector("#sources .audio-processing").classList.contains("done")) {
				document.querySelector("a[data-tab='slides']").setAttribute("data-ready","true");
				$("a[data-tab='slides']",nav).trigger("click");
			} else if (document.querySelector("#sources .audio-processing").classList.contains("done")) {
				document.querySelector("a[data-tab='slides']").setAttribute("data-ready", "true");
			}
		}).catch(function(err) {
			console.log(err);
		});
	}

	// Set jscolor values from saved colours
	var _colour_from_cache = function() {
		localforage.getItem('props').then(function(val) {
			_colour_pickers.forEach(function(instance) {
				instance.jscolor.fromString(val[instance.id].replace('#',''));
			});
		});
	}

	var _compute_styles = function (init) {
		var style = [];
		_colour_pickers.forEach(function(instance) {
			var pcolor = instance.jscolor.toHEXString();
			props[instance.id] = pcolor;
			switch (instance.id) {
				case "bg-colour":
					style.push(
						".audio-preview > svg > rect { fill: " + pcolor + ";} " + 
						".basic-player-preview > svg > g > rect { fill: " + pcolor + ";} " +
						".mobile-player-preview > svg >g:first-of-type > rect:first-of-type { fill: " + pcolor + ";} "
						);
					break;
				case "range-colour":
					props["progress-color"] = (instance.jscolor.isLight()) ? "#000" : "#FFF";
					style.push(
						".audio-preview > svg > g:last-of-type > rect { fill: " + pcolor + ";} " + 
						".basic-player-preview > svg > g:last-of-type > rect { fill: " + pcolor + ";} " +
						".basic-player-preview > svg > g:last-of-type > rect#svgBasicProgress { fill: " + props["progress-color"] + ";} " +
						".mobile-player-preview > svg > g:first-of-type > rect#svgMobileScrub { fill: " + pcolor + ";} " + 
						".mobile-player-preview > svg > g:first-of-type > rect#svgMobileProgress { fill: " + props["progress-color"] + ";}" +
						".mobile-player-preview > svg > g:last-of-type > rect { fill: " + pcolor + ";}"
						);
					break;
				case "text-colour":
					style.push(
						".audio-preview > svg > g > text > tspan { fill: " + pcolor + ";} " +
						".basic-player-preview > svg > g > text { fill: " + pcolor + ";} " +
						".mobile-player-preview > svg > g > text { fill: " + pcolor + ";}"
						);
					break;
			}
		});
		document.getElementById("fiddle").textContent = style.join("\n");
		if (init !== false) {
			UI.Dom.Cache.Save();
		}
	}

	var _set_aspect_ratio = function (value) {
		props["aspectRatio"] = value;
		[].forEach.call(document.querySelectorAll(".aspect-ratio > span"), function (el) {
			if (el.textContent === value) {
				el.parentNode.classList.add("active");
			} else {
				el.parentNode.classList.remove("active");
			}
		});
	}

	// Slide preview for sources tab
	var _nav_slides_show = function(recalled) {
		var slide = props.slides[CurrentSlide];
		if (slide && slide.fileid) {
			previewInfo.textContent = "Slide " + (CurrentSlide+1) + " of " + props.slides.length;
			previewTitle.textContent = slide.label;
			localforage.getItem(slide.fileid).then(function(blob) {
				if (blob === null && recalled !== true) { // at CurrentSlide==0, blob may still being written, so we can't read it
					setTimeout(_nav_slides_show,199,true);
				} else {
					sourcesPreviewFrame.setAttribute("src", window.URL.createObjectURL(blob));
				}
			});
		}
	}

	var _nav_slides_left = function () {
		if (CurrentSlide > 0) {
			CurrentSlide--;
			UI.Nav.Slides.Show();
		}
	}

	var _nav_slides_right = function () {
		if (CurrentSlide < props.slides.length-1) {
			CurrentSlide++;
			UI.Nav.Slides.Show();
		}
	}

	var _reset_sources_slides = function () {
		$(".slide-processing").removeClass("done");
		$(".slide-presentation").removeClass("done");
		$('.slide-dropzone p').html("Drop your presentation here, or click to browse.<small>We currently support Keynote, PowerPoint, OpenOffice, Google Slides and SlideShare.</small><small>We'll show a preview when it's been converted.</small>");
		$("#slideUploadBrowse").val("");
		$('.slide-urlzone textarea').val('');
	}

	var _reset_sources_audio = function () {
		$(".audio-processing").removeClass("done");
		$('.audio-dropzone p').html("Drop your audio file here, or click to browse<small>.wav, .mp3, .ogg, .weba, .wma, .m4a, .aif formats supported</small>");
		$(".audio-urlzone .controls-container").show();
		$(".audio-dropzone").show();
		$("canvas.visualiser").removeClass("visible");
		$('#audioUploadBrowse').val('');
	}


	// public UI interace
	return {
		Converting: _conversion_feedback,
		Dom: {
			Slide: {
				Preview: _slide_preview,
				Ready: _slides_ready
			},
			Audio: {
				AddSource: _add_audio_source,
				AddTrack: _add_audio_track,
				Ready: _audio_ready
			},
			Cache: {
				Save: _cache_save,
				Load: _cache_load
			},
			Settings: {
				Save: _settings_save,
				Load: _settings_load
			},
			Design: {
				Compute: _compute_styles,
				SetAspectRatio: _set_aspect_ratio,
				LoadColours: _colour_from_cache
			}
		},
		Nav: {
			Slides: {
				Show: _nav_slides_show,
				Left: _nav_slides_left,
				Right: _nav_slides_right,
			}
		},
		Reset: {
			Sources: {
				Slides: _reset_sources_slides,
				Audio: _reset_sources_audio,
			}
		}
		// Listeners: {
		// //	Captions: {
		// //		Start: _caption_listener
		// //	}
		// 	Audio: {
		// 		Seek: _audio_scrubbed,
		// 		Cue: _audio_cue
		// 	}
		// }
	}

})();