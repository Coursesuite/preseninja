/* ------------------------------------------------------------------------
						KLOUDLESS UPLOAD
------------------------------------------------------------------------------*/

var Kloud = (function() {
	var kloudlessSlides;
	var kloudlessAudio;

	var _init = function() {
		if (window.File && window.FileReader) {
			kloudlessSlides = window.Kloudless.explorer({
				"app_id": KLOUDLESS_APP_ID,
				"types": "documents",
				"flavor": "chooser",
				"retrieve_token": true,
			});
			kloudlessAudio = window.Kloudless.explorer({
				"app_id": KLOUDLESS_APP_ID,
				"types": "audio",
				"flavor": "chooser",
				"retrieve_token": true,
			});
			document.getElementById('slideCloudUpload').addEventListener("click", function(e) {
				if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
					console.log('electron');
					kloudlessSlides.choose();
				} else {
					kloudlessSlides.choose();
				}
			});
			document.getElementById('audioCloudUpload').addEventListener("click", function(e) {
				if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
					console.log('electron');
					kloudlessAudio.choose();
				} else {
					kloudlessAudio.choose();
				}
			});
			kloudlessSlides.on("success", function(meta) {
				var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
				if (SupportedPres.includes(ext)) {
					_download(meta[0], "slides");
				} else {
					unsupportedConversion('slide', ext);
				}
			});
			kloudlessAudio.on("success", function(meta) {
				var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
				if (SupportedAudio.includes(ext)) {
					_download(meta[0], "audio");
				} else {
					unsupportedConversion('audio', ext);
				}
			});
		} else {
			console.warn('No File Reader API Available.');
		}
	}

	var _download = function(file, kind) {
		var xhr = new XMLHttpRequest();
		var ext = file.name.substring(file.name.lastIndexOf('.')+1);
		xhr.open('GET', 'https://api.kloudless.com/v1/accounts/'+file.account+'/storage/files/'+file.id+'/contents');
		xhr.setRequestHeader("Authorization",atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg=="));
		xhr.responseType = "arraybuffer";
		xhr.onload = function(e) {
			var fileObj = new File([xhr.response], file.name, {type: file.mime_type});
			dragHandler.Load(fileObj, kind, ext);
		}
		xhr.send();
	}

	return {
		Init: _init,
		Download: _download
	}
})();