/* ------------------------------------------------------------------------
						KLOUDLESS UPLOAD
------------------------------------------------------------------------------*/

var Kloud = (function() {
	var kloudlessSlides;
	var kloudlessAudio;
	var KLOUDLESS_APP_ID = atob("Tk1ockFuMXl6enZIeDNWUEgwYThsNmxtS05kSndvOXZnYXhJU3BrN284U0tTZ200Cg==");

	var _init = function() {
		if (window.File && window.FileReader) {
			if (document.getElementById('audioCloudUpload')) {
				kloudlessAudio = window.Kloudless.explorer({
					"app_id": KLOUDLESS_APP_ID,
					"types": ["audio","videos"],
					"flavor": "chooser",
					"retrieve_token": true,
				});
				document.getElementById('audioCloudUpload').addEventListener("click", kloudAClick = function() { kloudlessAudio.choose() });
				kloudlessAudio.on("success", function(meta) {
					var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
					if (ext === "mp3") {
						_download_mp3_directly(meta[0]);
					} else {
						dragHandler.conversion({
							"inputformat":ext,
							"outputformat":"mp3",
							"account":meta[0].account,
							"id":meta[0].id,
							"kloud":true
						}, null, 'audio', meta[0].name);
					}
					// if (SupportedAudio.includes(ext)) {
					// 	_download(meta[0], "audio", ext);
					// } else {
					// 	unsupportedConversion('audio', ext);
					// }
					document.getElementById('audioCloudUpload').removeEventListener("click", kloudAClick);
					document.getElementById('audioCloudUpload').addEventListener("click", kloudAClick = function() { kloudlessAudio.choose() });
				});
			}
			if (document.getElementById('slideCloudUpload')) {
				kloudlessSlides = window.Kloudless.explorer({
					"app_id": KLOUDLESS_APP_ID,
					"types": "documents",
					"flavor": "chooser",
					"retrieve_token": true,
				});
				document.getElementById('slideCloudUpload').addEventListener("click", kloudPClick = function() { kloudlessSlides.choose() });
				kloudlessSlides.on("success", function(meta) {
					var ext = meta[0].name.substring(meta[0].name.lastIndexOf('.')+1);
					if (SupportedPres.includes(ext)) {
						dragHandler.conversion({
							"inputformat":ext,
							"outputformat":"jpg",
							"account":meta[0].account,
							"id":meta[0].id,
							"kloud":true
						}, null, 'audio', meta[0].name);
						// _download(meta[0], "slides", ext);
					} else {
						unsupportedConversion('slide', ext);
					}
					document.getElementById('slideCloudUpload').removeEventListener("click", kloudPClick);
					document.getElementById('slideCloudUpload').addEventListener("click", kloudPClick = function() { kloudlessSlides.choose() });
				});
			}
		} else {
			console.warn('No File Reader API Available.');
		}
	}

	var _download_mp3_directly = function(file) {
		let params = queryStringToJSON();
		params['account'] = file.account;
		params['id'] = file.id;
		fetch("kloud.php?" + new URLSearchParams(params))
		.then(function(response) {
			return response.blob();
		})
		.then(function(blob) {
			var fileObj = new File([blob], file.name, {type: file.mime_type});
			importMp3(fileObj);
		});
	}

	return {
		Init: _init
	}
})();