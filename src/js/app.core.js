var body = document.body,
	header = document.getElementById("banner"),
	nav = document.getElementById("tabs"),
	splitterContainer = document.querySelector("#slides .cue-ranges > .split"),
	splitterContainerChildren,
	splitterControl,
	sections 				= document.querySelectorAll("body > main > section"),
	slideSection 			= document.querySelector("section#slides"),
	completionInput 		= document.querySelector("#completion"),
	audioCueControl 		= slideSection.querySelector(".audio-player>.cue-control>button"),
	audioScrubControl 		= slideSection.querySelector(".audio-player>.cue-ranges input[type='range']"),
	audioScrubPrecache 		= slideSection.querySelector(".audio-player>.cue-ranges .precache"),
	audioScrubPlayed 		= slideSection.querySelector(".audio-player>.cue-ranges .played"),
	audioVolumeControl 		= slideSection.querySelector(".wave-controls input#waveformVolume"),
	audioTimeCurrent		= slideSection.querySelector(".wave-controls .current-time"),
	audioTimeTotal 			= slideSection.querySelector(".wave-controls .total-time"),
	previewPageNumber 		= slideSection.querySelector(".slides>output"),
	slidesPreviewFrame		= slideSection.querySelector(".slides>iframe"),
	aspectRatios			= document.querySelectorAll("section#design .aspect-ratio"),
	sourcesPreviewFrame			= document.querySelector(".presentation-frame > iframe"),
	previewTitle			= document.querySelector(".presentation-header .slide-info"),
	previewInfo				= document.querySelector(".presentation-header .chapter-info"),
	snd = new Audio("swoosh_quiet.mp3"),
	speed = 128,
	_player = null,
	_playback_metadata = {},
	loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 128, easingIn : mina.easeinout } ),
	baseUrl = window.location.href,
	URL = window.URL || window.webkitURL,
	props = {
		slides: [],
		split: false,
		slidePageNames: [],
		chapterWidths: [],
		cues: [],
	},
	CLOUD_CONVERT_APIKEY = "8pxT0DHRE5lpcVzildrPoEbztL9rc5Es89xG0incUfPNB93LLZueEr7zTK7PTuZmcV1hXkRMITbhjS-U1NnnzQ",
	KLOUDLESS_APP_ID = "UNhGZvmzssuPCnJvnMg_EbQy1Z9kK5z_gQMOFM5qxTSEgJlq", // https://developers.kloudless.com/applications/ninjasuite/details
	MUTED = false,
	AUTOCONVERT = true,
	_colour_pickers = [],
	audioPreviewSvg = document.querySelector("#audio-preview-svg"),
	ArrowKeys = {
	  LEFT:   37,
	  UP:     38,
	  RIGHT:  39,
	  DOWN:   40
	},
	CurrentSlide = 0,
	waveformLoaded = false,
	_recording = false,
	_recordingTimestamp = 0,
	_rootStyles = getComputedStyle(document.querySelector(':root')),
	// Supported file formats
	SupportedAudio = ['ogg','mp3','m4a','wma','wav','weba'],
	SupportedPres = ['ppt','pptx','odp','pdf','key'],
	_audio_can_play; // global so we can remove listener

Object.defineProperty(props,'duration',{
	enumerable:true,
	get: function () {
		return this._duration || 0;
	},
	set: function (value) {
		this._duration = value;
		//if (value>0 && this.split === false) splitAudio();
	}
});


function toggle_class(node, value) {
	node.parentNode.querySelectorAll(':scope>' + node.tagName)
	.forEach(function (obj) {
		return obj.classList[obj === node ? 'add' : 'remove'](value);
	})
}


localforage.config({
	name: 'AudioPresNinja'
});


/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
						FILE DROP & CONVERSION HANDLER

- You can drop files or urls, so handle both
- Internally calls document conversion and splitting and only saves the split/converted results

--------------------------------------------------------------------------------------------------------------------------------------------------------- */
var unsupportedConversion = function(kind, ext) {
	if (kind === 'slide') {
		performAlert('Conversion failed', ext+' files not supported. Support presentation file types are: \n'+SupportedPres.join(', '));
	} else {
		performAlert('Conversion failed', ext+' files not supported. Support audio file types are: \n'+SupportedAudio.join(', '));
	}
}


if (window.File && window.FileList && window.FileReader) { // if we allow dropping and acccessing the data
	if ((new XMLHttpRequest()).upload) { // not that we upload, this is an opera-incompatibility-check

		var dragHandler = {},
			pasteHandler = {},
			thisObj = undefined;
		dragHandler.IsOver = false;
		dragHandler.DragEnter = function (e) {
			e.preventDefault();
			if (e.dataTransfer.effectAllowed == "move") return;
			dragHandler.IsOver=true;
			setTimeout(function(){dragHandler.IsOver=false},0);
			body.classList['add']("drag-over");
		};
		dragHandler.DragOver = function (e) {
			e.preventDefault();
		};
		dragHandler.DragLeave = function (e) {
			if (e.dataTransfer.effectAllowed == "move") return;
			if (!dragHandler.IsOver) {
				body.classList['remove']("drag-over");
			}
			dragHandler.IsOver = false;
		};
		dragHandler.Load = function (file_obj, kind, extension) {
			var reader = new FileReader();
			reader.onabort = function (e) {
			}
			reader.onprogress = function (e) {
				if (e.lengthComputable) {
					var pc = Math.round((e.loaded / e.total) * 100);
				}
			}
			reader.onloadstart = function (e) {
			}
			reader.onload = function(event) {
				performance.mark('file-reader-begin');
				// var blob = dataURItoBlob(b64);
				// let blobUrl = URL.createObjectURL(blob);
				if (kind === 'slides') {
					var blob = new Blob([new Uint8Array(event.target.result)]);
					UI.Converting("slide");
					dragHandler.convertSlides(file_obj.name, blob);
				} else {
					UI.Converting("audio");
					if (extension !== 'mp3') {
						var blob = new Blob([new Uint8Array(event.target.result)]);
						dragHandler.convertAudio(file_obj.name, extension, blob);
					} else {
						var blob = new Blob([new Uint8Array(event.target.result)], {type: "audio/mpg"});
						UI.Dom.Audio.AddSource(blob,true);
					}
				}
			}
			reader.readAsArrayBuffer(file_obj);
		}
		dragHandler.Drop = function (e) {
			var dt = e.clipboardData ? e.clipboardData : e.dataTransfer;
			// if (e.target === document.querySelector(".slide-urlzone input")) return true;
			if (dt.effectAllowed === "move") return; // came from Sortable
			dragHandler.IsOver = false;
			body.classList['remove']("drag-over");
			if (dt.files.length) {
				for (var i=0;i<dt.files.length;i++) {
					var ext = dt.files[i].name.split(".").pop();
					if (['ogg','mp3','m4a','wma','wav','weba'].indexOf(ext)!==-1) {
						e.preventDefault();
						dragHandler.Load(dt.files[i],"audio", ext);
						$(".audio-urlzone .controls-container").hide(); // don't need that anymore
					} else if (['ppt','pptx','odp','pdf','key'].indexOf(ext)!==-1) {
						e.preventDefault();
						UI.Dom.Design.SetAspectRatio("16:9");
						dragHandler.Load(dt.files[i],"slides", ext);
					} else if ('zip'.indexOf(ext) !== -1) {
						e.preventDefault();
						reImport(dt.files[i]);
					}
				}
			} else {
				if ("TEXTAREA"===e.target.nodeName||"INPUT"===e.target.nodeName) return true;
				var url = dt.getData("text/uri-list") || dt.getData("url") || dt.getData("text/plain") || undefined;
				if (url.indexOf("slideshare")===-1 && url.indexOf(".google.com")===-1) return true;
				if (url) {
					e.preventDefault();
					oEmbed(url);
				} else {
					console.log("Drop yielded no gatherable data");
				}
			}
		}
		dragHandler.DragStart = function (e) {
			e.dataTransfer.effectAllowed = "move"; // don't let internal links self-drop
		}
		dragHandler.conversion = function(params, blob, kind, title) {
			performance.mark('conversion-begin');
			var progress = 0;
 			/*  =============CLOUD CONVERT, THE LONG WAY===========
			var startUrl = `https://api.cloudconvert.com/process?inputformat=${params["inputformat"]}&outputformat=${params["outputformat"]}&apikey=${CLOUD_CONVERT_APIKEY}`;

			var tOut;
			var procUrl;
			var createReq = new XMLHttpRequest();
			var convertReq = new XMLHttpRequest();
			var uploadReq = new XMLHttpRequest();

			createReq.open('POST', startUrl);
			createReq.send();
			createReq.onload = function() { // Create process url for conversion
				procUrl = "https:" + JSON.parse(createReq.responseText).url;
				convertReq.open('POST', `https:${JSON.parse(createReq.responseText).url}?input=${params["input"]}&outputformat=${params["outputformat"]}`);
				convertReq.send();
			};
			convertReq.onload = function() { // Upload file for conversion
				uploadReq.open('PUT', "https:" + JSON.parse(convertReq.responseText).upload.url + "/" + title);
				uploadReq.send(formdata);
			};
			uploadReq.upload.addEventListener("progress", function(e) {
				console.log("UL: ",e.loaded / e.total * 100); // Upload Progess
			});
			uploadReq.onload = function() { // Upload complete
				pollStatus();
			};
			function pollStatus() { // Get conversion status
				var statusReq = new XMLHttpRequest();
				statusReq.open('GET', procUrl);
				statusReq.send();
				statusReq.onload = function () {
					var pLoaded = JSON.parse(statusReq.responseText).percent;
					console.log();
					if (pLoaded >= 100) { // Conversion finished
						clearTimeout(tOut);
						getConverted();
						return;
					}
					if (tOut) {clearTimeout(tOut);}
					tOut = setTimeout(pollStatus(), 1000);
				}
			};
			function getConverted() { // Return converted file
				var convertedReq = new XMLHttpRequest();
				convertedReq.open('GET', procUrl); // create converted file url
				convertedReq.send();
				convertedReq.onload = function() {
					var resp = JSON.parse(convertedReq.responseText).output.url;
					var dlReq = new XMLHttpRequest();
					if (kind !== "slides") dlReq.responseType= 'arraybuffer';
					dlReq.open('GET', resp); // download converted file
					dlReq.send();
					dlReq.onload = function() {
						if (dlReq.status == 200) {
							if (kind === "slides") {
								splitDocument(title, dlReq.responseText).then(function() {
									UI.Dom.Slide.Ready();
									UI.Dom.Slide.Preview(0);
								});
							} else {
								var format = params["outputformat"];
								var blob = new Blob([new Uint8Array(dlReq.response)], {type: "audio/" + format});
								console.log("converted to: ",format);
								UI.Dom.Audio.AddSource(blob, format, true);
							}
						} else {
							throw new Error ("Document conversion error " + dlReq.status);
						}
					};
				};
			};
			*/
			// ===========CLOUD CONVERT, THE EASY WAY==============
			/*
			var posturl = "https://api.cloudconvert.com/convert?" + xhrFields(params);
			var xhr = new XMLHttpRequest(); // ie10+
			if (kind !== "slides") xhr.responseType = 'arraybuffer';
			xhr.open('POST', posturl, true);
			if (kind === "slides") {
				$(".slide.progress-bar").show();
			} else {
				$(".audio.progress-bar").show();
			}

			xhr.upload.addEventListener("progress", function(e) { //upload progess
				console.log("uploading");
				progress = (e.loaded / e.total * 100) / 2;
				if (kind === "slides") { // slide progress
					$(".slide.progress-bar > span").width(progress + "%");
				} else { // audio progress
					if (params["inputformat"] == "mp3" || params["inputformat"] == "ogg") {	// only 1 conversion, simple progress bar
						$(".audio.progress-bar > span").width(progress + "%");
					} else { // other formats convert to both mp3 and ogg, only track mp3 to prevent bar from jumping around
						if (params["outputformat"] == "mp3") {
							$(".audio.progress-bar > span").width(progress + "%");
						}
					}
				}
			});
			xhr.addEventListener("progress", function(e) { // download progress
				console.log("downloading");
				progress = 50 + (e.loaded / e.total * 100)/2;
				if (kind === "slides") { // slide progress
					$(".slide.progress-bar > span").width(progress + "%");
				} else { // audio progress
					if (params["inputformat"] == "mp3" || params["inputformat"] == "ogg") { // only 1 conversion, simple progress bar
						$(".audio.progress-bar > span").width(progress + "%");
					} else {// other formats convert to both mp3 and ogg, only track mp3 to prevent bar from jumping around
						if (params["outputformat"] == "mp3") {
							$(".audio.progress-bar > span").width(progress + "%");
						}
					}
				}
			});

			xhr.onload = function() {
				if (xhr.status == 200) {
					if (kind === "slides") {
						$(".slide.progress-bar").hide();
						splitDocument(title, xhr.responseText).then(function() {
							UI.Dom.Slide.Ready();
							UI.Dom.Slide.Preview(0);
						});
					} else {
						var format = params["outputformat"];
						var blob = new Blob([new Uint8Array(this.response)], {type: "audio/" + format});

						UI.Dom.Audio.AddSource(blob, format, true).then(function(v) {
							_remaining -= 1;
						});

						// response was an arraybuffer; if we btoa it, we might run out of memory (e.g. might be 3meg or 150meg of uint8!)
						// we need to re-read the response using an async buffer
						// var fr = new FileReader();
						// fr.onload = function() {
						// 	_remaining--;
						// 	UI.Dom.Audio.AddSource(fr.result, format, true);
						// }
						// fr.readAsDataURL(new Blob([new Uint8Array(this.response)], {type: "audio/" + format}));
						// localforage.setItem("blob-" + format, new Blob([new Uint8Array(this.response)], {type: "audio/" + format}));
					}
				} else {
					throw new Error ("Document conversion error " + xhr.status);
				}
			};
			xhr.onerror = function(e) {
				console.log("Error with xhr: ",xhr.status, xhr.responseText,e);
			};
			xhr.send(formdata);
			*/
			// =========CLOUD CONVERT, THE SERVER WAY================
			var xhr = new XMLHttpRequest();
			var getConverted = new XMLHttpRequest();
			var trys = 1;

			xhr.open("POST", "convert.php", true);

			if (kind === "slides") {
				toggleLoad('slide', true);
			} else {
				toggleLoad('audio', true);
			}
			var fd = new FormData();
			fd.append("file", blob);
			fd.append("name", title);
			fd.append("inputformat", params["inputformat"]);
			fd.append("outputformat", params["outputformat"]);
			xhr.onload = function(e) {
				if (kind !== "slides") getConverted.responseType = 'arraybuffer';
				try {
					console.log(xhr.responseText);
					getConverted.open('GET', "https:" + xhr.responseText, true);
				} catch (DOMException) {
					if (trys <= 3) {
						// Cloud convert fails occasionally for no real reason, this auto retrys on fail (up to 3 times) usually works on first retry
						console.log("Cloud Convert failed, retrying..");
						xhr.abort();
						xhr.open("POST", "convert.php", true);
						xhr.send(fd);
						trys++;
					} else {
						console.log("Conversion failed.");
						if (kind === "slides") {
							toggleLoad('slide', false);
						} else {
							toggleLoad('audio', false);
						}
					}
				}
				if (getConverted.readyState > 0) getConverted.send();

			};
			// Upload file to server progress
			xhr.upload.addEventListener("progress", function(e) {
				progress = (e.loaded / e.total * 100) / 2;
				if (kind === "slides") { // slide progress
					$(".slide.progress-bar > span").width(progress + "%");
				} else { // audio progress
					if (params["inputformat"] == "mp3" || params["inputformat"] == "ogg") {	// only 1 conversion, simple progress bar
						$(".audio.progress-bar > span").width(progress + "%");
					} else { // other formats convert to both mp3 and ogg, only track mp3 to prevent bar from jumping around
						if (params["outputformat"] == "mp3") {
							$(".audio.progress-bar > span").width(progress + "%");
						}
					}
				}
			});
			xhr.onerror = function(e) {
				console.log("Error, ", xhr.status, e);
			};

			getConverted.onload = function(e) {
				if (getConverted.status == 200) {
					if (kind === "slides") {
						toggleLoad('slide', false);
						splitDocument(title, getConverted.responseText).then(function() {
							UI.Dom.Slide.Ready();
							UI.Dom.Slide.Preview(0);
							if (document.querySelector('#addAnother > span').textContent !== 'Add another presentation') {
								document.querySelector('#addAnother > span').textContent = 'Conversion complete';
								var complete = function(){
									document.querySelector('#addAnother > span').textContent = 'Add another presentation';
								}
								setTimeout(complete, 1500);
								document.getElementById('addAnother').disabled = false;
							}
						});
					} else {
						var blob = new Blob([new Uint8Array(getConverted.response)], {type: "audio/mpg"});
						UI.Dom.Audio.AddSource(blob, true);
					}
				} else {
					throw new Error ("Converted document download error " + getConverted.status);
				}
			};
			// Progress for downloading converted file
			getConverted.addEventListener("progress", function(e) {
				progress = 50 + (e.loaded / e.total * 100)/2;
				if (kind === "slides") { // slide progress
					$(".slide.progress-bar > span").width(progress + "%");
				} else { // audio progress
					if (params["inputformat"] == "mp3" || params["inputformat"] == "ogg") { // only 1 conversion, simple progress bar
						$(".audio.progress-bar > span").width(progress + "%");
					} else {// other formats convert to both mp3 and ogg, only track mp3 to prevent bar from jumping around
						if (params["outputformat"] == "mp3") {
							$(".audio.progress-bar > span").width(progress + "%");
						}
					}
				}
			});
			getConverted.onerror = function(e) {
				console.log("Converted document download error: ",getConverted.status,e);
			};

			xhr.send(fd);
		}
		dragHandler.convertAudio = function(title, inpExtension, blob) {
			var params = {
				"inputformat": inpExtension,
				"outputformat" : "mp3",
			}
			dragHandler.conversion(params, blob, "audio", title);
		}
		dragHandler.convertSlides = function(title, blob) {
			var params = {
				"converteroptions[bg_format]" : "jpg",
				"inputformat": title.split(".").pop().toLowerCase(),
				"outputformat" : "html"
			}
			dragHandler.conversion(params, blob, "slides", title);
		}
		dragHandler.Input = function () {
			var url = document.querySelector(".slide-urlzone textarea").value.trim();
			if (url.length) oEmbed(url);
		}
		body.addEventListener("dragenter", dragHandler.DragEnter, false);
		body.addEventListener("dragover", dragHandler.DragOver, false);
		body.addEventListener("dragleave", dragHandler.DragLeave, false);
		body.addEventListener("drop", dragHandler.Drop, false);
		body.addEventListener("dragstart", dragHandler.DragStart, false);
		body.addEventListener("paste", dragHandler.Drop, false);
		document.querySelector(".slide-urlzone button").addEventListener("click", dragHandler.Input, false);

		//convert selected file
		var browseUpload = function(file) {
			var ext = file.name.substring(file.name.lastIndexOf('.')+1);
			if ('zip'.indexOf(ext) !== -1) {
				reImport(file);
			} else {
				var kind = (SupportedPres.includes(ext)) ? 'slides' : 'audio';
				if (kind === 'slides' && props.slides.length > 0) {
					document.querySelector('#addAnother > span').textContent = "Converting...";
					document.getElementById('addAnother').disabled = true;
				}
				dragHandler.Load(file, kind, ext);
			}
		}
	}
}


// Reimport presninja zip file using pres.ninja file
function reImport(file) {
	toggleImportLoad(true);
	var zip = new JSZip();
	var content = [];

	zip.loadAsync(file)
	// Get file contents from zip to prepare for internalisation
	.then(function(contents) {
		var pHolder = [];
		Object.entries(contents["files"]).forEach(function(file) {
			if (file[0].indexOf('data/page-') !== -1 ||
				file[0].indexOf('.css') !== -1 || 
				file[0].indexOf('.js') !== -1) {
				pHolder.push(
					zip.file(file[0]).async("text").then(function(val) {
						content.push({name: file[0].replace('data/',''), value: val});
					})
				);
			} else if (file[0].indexOf('data/media.mp3') !== -1) {
				pHolder.push(
					zip.file(file[0]).async("uint8array").then(function(mp3) {
						var mp3Blob = new Blob([mp3], {type: "audio/mpg"});
						localforage.setItem("mp3", mp3Blob);
					})
				);
			} else if (file[0].indexOf('.png') !== -1) {
				pHolder.push(
					zip.file(file[0]).async("base64").then(function(val) {
						content.push({name: file[0].replace('data/',''), value: val});
					})
				);
			} else if (file[0].indexOf('pres.ninja') !== -1) {
				pHolder.push(
					zip.file(file[0]).async("text").then(function(val) {
						props = JSON.parse(val);
						localforage.setItem('props', props);
					})
				);
			}
		});
		return Promise.all(pHolder);
	})
	.then(function() {
		return internaliseContent(content);
	})
	.then(function() {
		UI.Dom.Cache.Load().then(function() {
			UI.Dom.Design.LoadColours();
			toggleImportLoad(false);
			return;
		});
	})
	.catch(function(e) {
		console.warn(e);
		toggleImportLoad(false);
	});
}

// Re-inline all scripts/styles/images from zip and store html pages in localstorage
function internaliseContent(content) {
	var pHolder = [];
	content.forEach(function(page) {
		if (page.name.indexOf('page-') !== -1) {
			var dom = document.implementation.createHTMLDocument('foo');
			dom.documentElement.innerHTML = page.value;
			// Inline all styles
			var styles = dom.querySelectorAll('link[rel="stylesheet"]');
			styles.forEach(function(el) {
				var inline = document.createElement('style');
				var inner = content.find(function(i) {
					return i.name === el.attributes.href.value;
				});
				inline.innerHTML = inner.value;
				el.parentNode.replaceChild(inline,el);
			});
			// Inline all scripts
			var scripts = dom.querySelectorAll('script[src]');
			scripts.forEach(function(el) {
				var inner = content.find(function(i) {
					return i.name === el.attributes.src.value;
				});
				el.removeAttribute('src');
				el.innerHTML = inner.value;
			});
			// Inline all images
			var images = dom.querySelectorAll('img[src]');
			images.forEach(function(el) {
				var inner = content.find(function(i) {
					return i.name === el.attributes.src.value;
				});
				el.setAttribute('src','data:image/png;base64, ' + inner.value);
			});
			// Store the final page
			var html = "<!doctype html>" + dom.documentElement.outerHTML;
			pHolder.push(
				localforage.setItem(page.name.replace('.html',''), new Blob([html], {'type':'text/html'}))
			);
		}
	});
	return Promise.all(pHolder);
}

/*
 * takes the html of a pdf that cloud convert gave us and turns it into multiple pages
 * saving each one into localstorage as it goes
 * update the local pagecache (props.slides) so other processes can use it
 */
function splitDocument(title, responseText) {
	performance.mark('split-document-begin');

	return new Promise(function(splitResolve, splitReject) {

		var doc = document.implementation.createHTMLDocument("foo");
		doc.documentElement.innerHTML = responseText;
		// lets clean up the junk
		[].forEach.call(doc.querySelectorAll("head > script"), function (node) {
			node.parentNode.removeChild(node);
		});
		[].forEach.call(doc.querySelectorAll("div.pi"), function (node) {
			node.parentNode.removeChild(node);
		});
		[].forEach.call(doc.querySelectorAll("style"), function (node) {
			if (node.textContent.indexOf("Fancy styles for pdf2htmlEX")!==-1) {
				node.parentNode.removeChild(node);
			}
		});
		[].forEach.call(doc.querySelectorAll("a:not([target])"), function(node) {
			node.setAttribute("target","_blank");
		}); 
		var node = doc.querySelector("body > #sidebar");
		node.parentNode.removeChild(node);
		node = doc.querySelector("body > div.loading-indicator");
		node.parentNode.removeChild(node);
		node = doc.querySelector("head > meta[name='generator']");
		node.parentNode.removeChild(node);

		doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-scale"]({}));
		doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale"]({}));

		// and now start splitting the document
		var container = doc.getElementById("page-container");

		var pageLength = container.querySelectorAll("div[data-page-no]").length;
		var clone = container.cloneNode(true); // now we have twice as much in ram!
		container.style.overflow = "hidden"; // Begone scrollbars!
		
		var pHolder = [];

		for (var i=0,pageNo=1;i<pageLength;i++) {

			// will happen pageLength times for iteration 1, but only once from then on
			while (container.firstChild) { container.removeChild(container.firstChild); }

			// update the page title
			doc.querySelector("head > title").textContent = title + " - Page " + pageNo;

			// move the original page back in (from the clone dom)
			var c = clone.querySelector("#pf"+dec2hex(pageNo)); // faster, marginally than div[data-page-no]
			if (c===null) continue;
			container.appendChild(c);

			// store the final document
			var html = "<!doctype html>" + doc.documentElement.outerHTML;
			var fileid = "page-" + (new Date().getTime()).toString(36) + "-" + pageNo;

			// store promises so we can wait until the whole slideshow has been saved
			pHolder.push(Promise.resolve(
				localforage.setItem(fileid, new Blob([html],{type:"text/html"}))
			));

			html = null; // gc for last iteration
			props.slides.push({
				fileid: fileid,
				label: title + " - Page " + pageNo
			});
			// UI.Dom.Slide.Add(fileid);

			// our page counter, in case the looper index encountered other nodes we don't care about
			pageNo += 1;
		}
		// mark objects for garbage collection asap
		clone = null; doc = null;

		// ensure props gets saved
		UI.Dom.Cache.Save();

		// resolve this functions promise
		performance.mark('split-document-end');

		// Resolve when whole slideshow is in localstorage
		Promise.all(pHolder).then(function() {
			splitResolve();
		});

	});
}
//kloudless updload

// if (window.File && window.FileReader) {
// 	var kloudlessSlides = window.Kloudless.explorer({
// 		"app_id": KLOUDLESS_APP_ID,
// 		"types": "documents",
// 		"flavor": "chooser",
// 		"retrieve_token": true,
// 	});
// 	var kloudlessAudio = window.Kloudless.explorer({
// 		"app_id": KLOUDLESS_APP_ID,
// 		"types": "audio",
// 		"flavor": "chooser",
// 		"retrieve_token": true,
// 	});

// 	var kloudlessDownload = function(file, kind) {
// 		var xhr = new XMLHttpRequest();
// 		var ext = file.name.substring(file.name.lastIndexOf('.')+1);
// 		xhr.open('GET', 'https://api.kloudless.com/v1/accounts/'+file.account+'/storage/files/'+file.id+'/contents');
// 		xhr.setRequestHeader("Authorization",atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg=="));
// 		xhr.responseType = "arraybuffer";
// 		xhr.onload = function(e) {
// 			var fileObj = new File([xhr.response], file.name, {type: file.mime_type});
// 			dragHandler.Load(fileObj, kind, ext);
// 		}
// 		xhr.send();
// 	}

// 	kloudlessSlides.on("success", function(meta) {
// 		var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
// 		if (SupportedPres.includes(ext)) {
// 			kloudlessDownload(meta[0], "slides");
// 		} else {
// 			unsupportedConversion('slide', ext);
// 		}
// 	});
// 	kloudlessAudio.on("success", function(meta) {
// 		var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
// 		if (SupportedAudio.includes(ext)) {
// 			kloudlessDownload(meta[0], "audio");
// 		} else {
// 			unsupportedConversion('audio', ext);
// 		}
// 	});

// 	document.getElementById('slideCloudUpload').addEventListener("click", function(e) {
// 		if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
// 			console.log('electron');
// 			kloudlessSlides.choose();
// 		} else {
// 			kloudlessSlides.choose();
// 		}
// 	});
// 	document.getElementById('audioCloudUpload').addEventListener("click", function(e) {
// 		if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
// 			console.log('electron');
// 			kloudlessAudio.choose();
// 		} else {
// 			kloudlessAudio.choose();
// 		}
// 	});
// }

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
						GOOGLE & SLIDESHARE loading
--------------------------------------------------------------------------------------------------------------------------------------------------------- */

function oEmbed(url) {
	performance.mark('oembed-begin');

	if (url.indexOf("slideshare") !== -1) {
		toggleLoad('slide', true);
		UI.Converting("slide");

		$.ajax({
			type: "GET",
			url: "https://www.slideshare.net/api/oembed/2?url=" + encodeURIComponent(url) + "&maxwidth=1280&maxheight=1024&format=jsonp",
			dataType: "jsonp"
		}).done(function(obj) {
			var styleTransform = Handlebars.templates["slideshare-transform-style"]({});
			if (obj && obj.total_slides) {
				var stub = (obj.conversion_version === 2) ? "" : "-slide-";
				var pHolder = [];
				var loadingBar = $(".slide.progress-bar > span");
				var progress = 0;
				for (var i=1; i<obj.total_slides;i++) {
					var slide = "https:" + obj.slide_image_baseurl + stub + i + obj.slide_image_baseurl_suffix;
					// can't use xhr or fetch (cross domain, blocked at slideshre's end without a cors header)
					// can't use canvas drawn from local image (The canvas has been tainted by cross-origin data)
					// so .. reference the original image as an image ... or proxy it, which SlideShare won't like
					var content = "<img src='" + slide + "'>";
					var html = Handlebars.templates["boilerplate"]({
						"title": obj.title + " - Page " + i,
						"content": content,
						"description": obj.author_name,
						"index": i,
						"author": obj.author_url,
						"styleTransform":  styleTransform,
					});
					var fileid = "page-" + (new Date().getTime()).toString(36) + "-" + i;
					props.slides.push({
						fileid: fileid,
						label: obj.title + " - Page " + i
					});
					pHolder.push(Promise.resolve(
						localforage.setItem(fileid, new Blob([html],{type:"text/html"}))
					).then(function(step) {
						progress += 100 / obj.total_slides;
						loadingBar.width(progress + "%");
					}));
				}
				// Resolve when all slides in storage
				Promise.all(pHolder).then(function(){
					UI.Dom.Cache.Save();
					UI.Dom.Slide.Ready();
					performance.mark('oembed-slideshare-end');
				});
			} else {
				performAlert("Embed Failed","Unable to embed this SlideShare (was it private?)");
			}
		});

	} else if ( url.indexOf(".google.com") !== -1 && url.indexOf("presentation") !== -1) {
		UI.Dom.Design.SetAspectRatio("16:9");
		toggleLoad('slide', true);
		UI.Converting("slide");

		var doc = url.split("://")[1].split("/")[3];
		var payload = {
			pdf: "https://docs.google.com/presentation/d/" + doc + "/export/pdf?id=" + doc, // why the two id's, google?
			source: "https://docs.google.com/presentation/d/" + doc + "/edit?usp=sharing", // must be sharable
			title: ""
		};

		var slideRequest = new XMLHttpRequest();
		var progress = 0;
		var progressBar = $(".slide.progress-bar > span");
		slideRequest.onload = function(e){
			Promise.resolve().then(function(){
				var doc = document.implementation.createHTMLDocument("foo");
				doc.documentElement.innerHTML = slideRequest.responseText;
				var title = doc.querySelector("meta[property='og:title']").getAttribute("content") || doc.querySelector("meta[property='og:description']").getAttribute("content") || "Untitled";
				return Promise.resolve(title);
			}).then(function(title) {
				payload.title = title;
				var qs = xhrFields({
					    "apikey" : CLOUD_CONVERT_APIKEY,
					    "input" : "download",
					    "file" : payload.pdf,
					    "delete" : "true",
					    "download" : "",
					    "inputformat" : "pdf",
					    "filename" : title + ".pdf",
					    "outputformat" : "html",
					    "converteroptions[bg_format]" : "jpg",
					    "wait" : true
					});
				var posturl = "https://api.cloudconvert.com/convert?" + qs
				var xhr = new XMLHttpRequest(); // ie10+
				xhr.open('POST', posturl, true);
				xhr.onload = function() {
					if (xhr.status == 200) {
						performance.mark('oembed-googledoc-end');
						splitDocument(title, xhr.responseText).then(function() {
							toggleLoad('slide', false);
							UI.Dom.Slide.Ready();
						});
					} else {
						throw new Error ("Document conversion error " + xhr.status);
					}
				}
				xhr.addEventListener("progress", function(e) {
					progress = 50 + (e.loaded / e.total * 100)/2;
					progressBar.width(progress + "%");
				});
				xhr.send();
			}).catch(function(message) {
				console.log(message);
				performAlert("<p>Conversion Failed","Couldn't load or convert these slides (Is your presentation public?)</p><br /> <a href='https://guide.coursesuite.ninja/presentationninja/usage'>Help</a>");
				toggleLoad('slide', false);
				UI.Reset.Sources.Slides();
			});
		};
		// Bullshit loading bar for some fake feedback
		slideRequest.onreadystatechange = function(e) {
			if (progress < 50) {
				progress += 10;
				progressBar.width(progress + "%");
			}
		}
		slideRequest.onerror = function(e) {
			console.warn("Error retrieving slideshow (Is it public?)");
		}
		slideRequest.open('GET', payload.source, true);
		slideRequest.send();
	} else {
		throw new Error (xhr.status + ": oEmbed called with unsupported url " + url);
	}

}



// download 

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
						User Interface
--------------------------------------------------------------------------------------------------------------------------------------------------------- */
// toggle loading bar
// kind = 'slide' or 'audio'
function toggleLoad(kind, on) {
	if (on) {
		document.querySelector('.'+kind+'.progress-bar').classList.add('active');
		document.querySelector('.'+kind+'-processing').classList.add('loading');
	} else {
		document.querySelector('.'+kind+'.progress-bar').classList.remove('active');
		document.querySelector('.'+kind+'-processing').classList.remove('loading');
	}
}

function toggleImportLoad(on) {
	if (on) {
		document.querySelector('.slide-processing').classList.add('importing');
		document.querySelector('.audio-processing').classList.add('importing');
	} else {
		document.querySelector('.slide-processing').classList.remove('importing');
		document.querySelector('.audio-processing').classList.remove('importing');
	}
}

//ui 


// Sets a cue at the current time while recording
// Called from pressing the right arrow key
function setCue() {
	if (CurrentSlide === 0) {
		props.cues[0] = 0;
	}
	if (CurrentSlide+1 < props.slides.length) {
		props.cues[CurrentSlide+1] = _recordingTimestamp/1000;
	}
}

// Fill any missing cues with equal sizes
function fillCues() {
	var remaining = props.slides.length - props.cues.length;
	if (remaining > 0) {
		if (props.cues.length === 0) {
			props.cues[0] = 0;
			remaining--;
		}
		var fill = (props.duration - props.cues[props.cues.length -1]) / (remaining + 1);
		for (var i=0; i < remaining; i++) {
			var newCue = props.cues[props.cues.length -1] + fill;
			props.cues.push(newCue);
		}
	}
	localforage.setItem('props', props);
}

// Calculate percentage widths of chapters (for slide split player)
// Returns array of widths
function generateChapterWidths() {
	var widths = [];
	for (var i = 0; i < props.cues.length; i++) {
		if (i != props.cues.length - 1) {
			widths[i] = (props.cues[i+1] - props.cues[i]) / props.duration * 100;
		} else {
			widths[i] = (props.duration - props.cues[i]) / props.duration * 100;
		}
	}
	return widths;
}


// init.js

function performAlert(title, message) {
	$("#alert-text").html("<h3>" + title + "</h3>" + "<p class='dont-break-out'>" + message + "</p>");
	$("#alert").addClass("pop");
}

function toggleSurvey() {
	$('.survey-modal').toggle();
	var _exitModal = function() {
		$('.survey-modal').toggle();
		modalBg.removeEventListener('click', _exitModal);
	};
	var modalBg = document.querySelector('.survey-modal');
	modalBg.addEventListener('click', _exitModal);
}

