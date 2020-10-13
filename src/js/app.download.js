
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
						DOWNLOAD
--------------------------------------------------------------------------------------------------------------------------------------------------------- */

var Downloader = (function () {

	var _convertHtmlForZip = function (name, blob, fold, manifest) {
		return new Promise(function(resolve,reject) {
			var reader = new FileReader();
			reader.onload = function (event) {
				var doc = document.implementation.createHTMLDocument(name);
				doc.documentElement.innerHTML = event.target.result;

				// target all hyperlinks to external window
				var links = doc.documentElement.getElementsByTagName('a');
				for (var i=0; i < links.length; i++) {
					if (links[i].getAttribute('href')) {
						if (links[i].getAttribute('href').indexOf("javascript:")===-1 && !links[i].hasAttribute('target')) {
							links[i].setAttribute("target", "_blank");
						}
					}
				}

				// ensure nothing is left contenteditable
				[].forEach.call(doc.querySelectorAll("[contenteditable]"), function (tag) {
					tag.removeAttribute("contenteditable");
				});

				// externalise all images
				[].forEach.call(doc.querySelectorAll("img[src*='data:image']"), function (img) {
					var src = img.getAttribute("src"),
						extn = src.substring(src.indexOf("/")+1, src.indexOf(";")).toLowerCase(),
						fn = md5(src) + "." + extn;
					if (src === "data:image/png;base64,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") {
						img.parentNode.removeChild(img);
					} else {
						fold.file(fn, src.substring(src.indexOf("base64,")+7), {base64:true});
						img.setAttribute("src", fn);
						if (undefined !== manifest) manifest.files.push({href: "data/" + fn});
					}
				});

				// externalise all embedded javascripts
				[].forEach.call(doc.querySelectorAll("script:not([src])"), function (js) {
					var src = js.innerHTML,
						fn = md5(src) + ".js";
					fold.file(fn, src);
					js.innerHTML = ""; // empty tag
					js.setAttribute("type","text/javascript");
					js.setAttribute("src", fn);
					if (undefined !== manifest) manifest.files.push({href: "data/" + fn});
				});

				// externalise all embedded styles
				[].forEach.call(doc.querySelectorAll("style"), function (sty) {
					var src = sty.innerHTML,
						fn = md5(src) + ".css";
					fold.file(fn, src);
					var node = document.createElement("link");
					node.setAttribute("rel","stylesheet")
					node.setAttribute("type","text/css");
					node.setAttribute("href", fn);
					sty.parentNode.replaceChild(node,sty);
					if (undefined !== manifest) manifest.files.push({href: "data/" + fn});
				});

				// export the modified html document
				fold.file(name, "<!doctype html>" + doc.documentElement.outerHTML);
				if (undefined !== manifest) manifest.files.push({href: "data/" + name});; // imscp passes in resource object

				resolve(name);
			};
			reader.readAsText(blob);

		});
	};

	// entry point - works out which button was clicked
	var _init = function (uiButtonInstance) {
		var destination = uiButtonInstance.el.dataset.destination;
		if (document.querySelector("input[name='option-course-name']").value.trim() == "") {
			performAlert("Hold up there chief!","<p>You need to at least name your course.</p>");
			uiButtonInstance.stop(-1); // < 0 = failure
			return;
		}
		if (!(document.querySelector("#sources .slide-processing").classList.contains("done") && document.querySelector("#sources .audio-processing").classList.contains("done"))) {
			performAlert("Wait a bit longer","<p>Either your Slides or your Audio are not yet ready - please wait or try again before you download.</p>");
			uiButtonInstance.stop(-1); // < 0 = failure
			return;
		}
		switch (destination) {
			case "kloudless":
				// documentation: https://github.com/kloudless/file-explorer
				var inst = window.Kloudless.explorer({
					"app_id": KLOUDLESS_APP_ID,
					"types": ["folders"],
					"flavor": "chooser",
					"retrieve_token": true,
				});
				inst.on("success", function (meta) {
					_createPackage(_kloudlessUpload, uiButtonInstance, meta);
				});
				inst.on("cancel", function() {
					uiButtonInstance.stop(-1);
				});
				inst.choose();
			break;

			case "download":
				_createPackage(_saveAs, uiButtonInstance);
			break;

			case "publish":
				_createPackage(_publishTo, uiButtonInstance);
			break;

			case "preview":
				_createPackage(_openIn, uiButtonInstance);
			break;

		}

	};

	var _createPackage = function(fnResult, uiButtonInstance, metadata) {

		performance.mark('createpackage-begin');

	 	// var api = document.querySelector("input[name='option-course-api']:checked").value,
	 	// 	,
			// description = document.querySelector("textarea[name='option-course-description']").value.trim(),
			// copyright = document.querySelector("input[name='option-course-copyright']").value.trim(),

		if (props.cues.length < props.slides.length) {
			performAlert("", "You need to finish setting your slide markers first!");
			uiButtonInstance.stop(-1);
 			return;
		}
		if (props.slidePageNames.length === 0) {
			for (var i = 0; i < props.slides.length; i++) {
				props.slidePageNames.push("Page "+(i+1));
			}
		}
		var destination = uiButtonInstance.el.getAttribute("data-destination"),
	 		numberOfIncrements = 9, // how many ops more than slides
	 		increment = (1 / numberOfIncrements),
	 		progress = 0,
	 		name = document.querySelector("input[name='option-course-name']").value.trim(),
	 		uuid = name.replace(/\s/g,"_").replace(/[^0-9a-zA-Z_]/g,"").toLowerCase(),
	 		api = document.querySelector("input[name='option-course-api']:checked").value,
	 		zipName = [uuid,api,"zip"].join("."),
			zip = new JSZip(),
			fold = zip.folder("data"),
			manifest = { "creator" : "presninja", "files": [
				{"href":"pres.ninja"},
				{"href":"index.html"},
				{"href":"data/media.mp3"}
			]};

	 	// localforage
	 	//	.getItem("props")

	 	// begin a chain
	 	Promise
	 		.resolve()
		 	.then(function () {
		 		props.completeAfter = parseInt(completionInput.value,10);
				props.score = ~~props.completeAfter / props.slides.length * 100;
		 		if (!props.completeAfter) {
		 			performAlert("Missing score", "No score has been set, or was set to zero (Current value: " + props.completeAfter + "). You can change this on the Download page.</p>");
		 			uiButtonInstance.stop(-1);
		 			return;
		 		}
		 		props["timestamp"] = (new Date().getTime()).toString(36),
		 		props["tier"] = App.Tier;
		 		props["api"] = api;
		 		props["chapterWidths"] = generateChapterWidths();

		 		// now we know how many slides there are, recalculate progress
		 		numberOfIncrements += (props.slides.length - 1);
		 		increment = (1 / numberOfIncrements);

				progress += increment;
				uiButtonInstance.setProgress(progress); // 1
				return Promise.resolve(props);

			}).then(function(props) {
				progress += increment;
				uiButtonInstance.setProgress(progress);
				console.dir(props);
				return Promise.all([
					zip.file("index.html", Handlebars.templates[props["player"]](props))
				]);

			}).then(function(result) {
				var promises = props.slides.map(function(obj) {
					return new Promise(function(resolve,reject) {
						localforage.getItem(obj.fileid)
						.then(function(blob) {
							progress += increment;
							uiButtonInstance.setProgress(progress);
							resolve(_convertHtmlForZip(obj.fileid + ".html", blob, fold, manifest));
						});
					});
				});
				return Promise.all(promises);

			}).then(function(result) {
				var ims = {
					name: props["name"],
					timestamp: props["timestamp"],
					description: props["description"],
					files: []
				};
				Array.from(new Set(manifest.files.map(function(obj) {
					return obj.href;
				}))).forEach(function(value, iteration) {
					ims.files.push({"href":value});
				});
				progress += increment;
				uiButtonInstance.setProgress(progress);
				zip.file("imsmanifest.xml", Handlebars.templates[props.api + "manifest"](ims));

			}).then(function(result) {
				var promises = ["mp3"].map(function(extn) {
					return new Promise(function(resolve,reject) {
						localforage.getItem(extn)
						.then(function(value) {
							progress += increment;
							uiButtonInstance.setProgress(progress);
							fold.file("media."+extn,value);
							resolve();
						});
					})
				})
				return Promise.all(promises);

			}).then(function (result) {
				return fetch("compiled/" + api + ".zip");

			}).then(function (response) {
				return response.arrayBuffer();

			}).then(function (buffer) {
				return zip.loadAsync(buffer);

			}).then(function (loadedZip) {
				progress += increment;
				uiButtonInstance.setProgress(progress);
				zip.file("pres.ninja", JSON.stringify(props));

				// shit! we dunnit arready, ait
				// progress += increment;
				// uiButtonInstance.setProgress(progress);
				// zip.file("imsmanifest.xml", Handlebars.templates[api + "manifest"](props));

				progress += increment;
				uiButtonInstance.setProgress(progress);
				return zip.generateAsync({type: "blob"});

			})
			.then(function (blob) {
				performance.mark('createpackage-end');

				fnResult(blob, zipName, metadata);
				uiButtonInstance.stop(1);
			})
			.catch(function(err) {
				console.log(err);
				uiButtonInstance.stop(-1);
			});

	 };

	// call the Kloudless save process
	var _kloudlessUpload = function (content, name, metadata) {
		$.ajax({
			beforeSend: function(xhr) {
				$("div.progress-button[data-destination='kloudless'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
				xhr.setRequestHeader("X-Kloudless-Metadata", JSON.stringify({"parent_id": metadata[0].id, "name": name}))
			},
			url: "https://api.kloudless.com/v0/accounts/" + metadata[0].account + "/files",
			method: "POST",
			contentType: "application/octet-stream",
			headers: {
				"Authorization": atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg==")//"Bearer " + metadata[0].bearer_token.key
			},
			data: content,
			processData: false,
			success: function(status, xhr) {
				$("div.progress-button[data-destination='kloudless'] > button > span").html("<i class='ninja-upload2'></i> Save to Cloud");
				performAlert("","Your package has been uploaded.");
			}
		});
	};

	// perform a PUT/POST to the destination url
	var _publishTo = function (content, name) {
		var div = document.querySelector("div.progress-button[data-destination='publish']"),
			$span = $(">button>span", div),
			_html = $span.html();
		$span.html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
		var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
			fd = new FormData();
		fd.append("file", content, name);
		xhr.open(App.Method, App.Publish, true);
		xhr.onload = function (result) {
			if (this.status == 200) {
				$span.html("Uploaded");
			} else {
				$span.html("Failed");
			}
			setTimeout(function() {
				$span.html(_html);
				// bindDownloadButtons();
			},3456);
		}
		xhr.onerror = function (result) {
			console.dir(result);
			$span.html("<i class='fa fa-eye'></i> Upload error (too big?)");
			var ui = new UIProgressButton(div); ui.stop(-1);
			if (result.type === "error") {
				setTimeout(function() {
					$span.html(_html)
				},3456);
			}
		}
		xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
		xhr.setRequestHeader("X-Filename", name);
		xhr.send(fd);
	};

	// // perform a PUT/POST to the destination url
	// var _publishTo = function (content, name) {
	// 	$("div.progress-button[data-destination='publish'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
	// 	var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
	// 		fd = new FormData();
	// 	fd.append("file", content, name);
	// 	xhr.open(App.Method, App.Publish, true);
	// 	xhr.onload = function (result) {
	// 		$("div.progress-button[data-destination='preview'] > button > span").html("<i class='ninja-upload'></i> Publish to LMS");
	// 		if (this.status == 200) {
	// 			performAlert("","Your package has been uploaded.");
	// 		}
	// 	}
	// 	xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
	// 	xhr.setRequestHeader("X-Filename", name);
	// 	xhr.send(fd);
	// };

	var _openIn = function (content, name) {
		$("div.progress-button[data-destination='preview'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
		var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
			fd = new FormData();
		fd.append("file", content, name);
		xhr.open("POST", "https://preview.coursesuite.ninja/", true);
		xhr.onload = function (e) {
			$("div.progress-button[data-destination='preview'] > button > span").html("<i class='fa fa-eye'></i> Preview zip");
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				var popup = window.open(obj.href,'previewninja');
				if (popup == null || typeof popup == 'undefined') {
		 			performAlert("Popup blocked!", "<p>We tried to popup up the window, but your browser has blocked it (check your browser location bar). Please allow popups from this site, or copy and open this link:</p><p><a target='_blank' href='" + obj.href + "'>" + obj.href + "</a></p>");
				}
			}
		}
		xhr.setRequestHeader("Authorization", location.search);
		xhr.setRequestHeader("X-Filename", name);
		xhr.send(fd);
	};

	// perform a browser save-as
	var _saveAs = function (content, name, data) {
		//console.log("_saveas", content, name, data);
		saveAs(content, name);
	};

	// expose public methods
	return {
		Begin: _init,
		KloudlessUpload: _kloudlessUpload
	}
})();