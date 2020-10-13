<?php
define("APP",true);
include("load.php");

$jsApp = new stdClass();
$jsApp->
Home = $verifier->home;
$jsApp->Tier =	$verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
$jsApp->Minified = $verifier->code->minified;
$jsApp->Params = $_SERVER['QUERY_STRING'];

// if publish url is not https proxy it through publish.php
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST";
	if (strpos($verifier->api->publish,"https:") === false) {
	$jsApp->Publish = "publish.php?dest=" . rawurlencode($verifier->api->publish) . "&sesskey;=" . $_SESSION['sesskey'] . "&bearer;=" . rawurlencode($jsApp->Bearer);
	} else {
	$jsApp->Publish = $verifier->api->publish;
	}
}

$uploaded = ToScormUtilities::getParam('upload', 'boolean', false);
$project = ToScormUtilities::getParam('project', 'project', null);
$action = ToScormUtilities::getParam('action', 'action', null);

$jsApp->project = $project;
$jsApp->action = $action;

?>
<!DOCTYPE doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
		<link href="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/css/uikit.min.css" rel="stylesheet"/>
		<link href="css/index.css" rel="stylesheet" type="text/css">
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>;</script>
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script async="true" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js" type="text/javascript"></script>
		<title>Audio Presenter to Scorm</title>
	</head>
	<body>

	    <div class="uk-navbar-container silver-butt" uk-sticky="media: 960">
	        <div class="uk-container uk-container-expand">
	            <nav class="uk-navbar">

	                <div class="uk-navbar-left">

	                    <a class="uk-navbar-item uk-logo" href="./">
	                        <img class="uk-margin-small-right" width="28" height="34" src="img/graphic.svg"> Audio Presenter
	                    </a>

	                </div>

	                <div class="uk-navbar-right">

	                    <ul class="uk-navbar-nav uk-visible@m">
	                        <li><a href="/">Home</a></li>
	                        <li><a href="/faq">Faq</a></li>
	                        <li><a href="/changelog">Changelog</a></li>
	                        <li><a href="docs/">Documentation</a></li>
	                        <li><a href="#reset" onclick="hardReset()">Reset</a></li>
	                    </ul>

	                </div>

	            </nav>
	        </div>
	    </div>

        <aside>
            <h3>Slides</h3>
			<ul class="uk-thumbnav uk-thumbnav-vertical" uk-margin id="thumbnails"></ul>
        </aside>

        <article>
            <div class="uk-container uk-container-small uk-position-relative uk-margin-auto">

				<div class="uk-clearfix presentation-entry">
					<h2 class="uk-h2">Get started</h2>
					<p>Upload your presentation. We will convert it for the web, then you can choose the audio. We currently support conversion from PDF, Keynote, PowerPoint, OpenOffice, Google Slides and SlideShare. Conversion can take a while, please be patient.</p>
					<div class="uk-margin-medium uk-padding droppable" id="presentation-dropzone">
						<p>Drag and drop your presentation here</p>
						<p class="uk-text-small">or</p>
						<p class="uk-margin">
							<a class="uk-button uk-button-secondary" href="#kloudless" id="slideCloudUpload">Upload from Cloud</a>
							<a class="uk-button uk-button-secondary" href="#upload">Pick file</a>
						</p>
						<p class="uk-text-small">or</p>
						<form class="uk-form-horizontal" enctype="multipart/form-data" method="post">
							<input class="uk-input uk-form-width-large" id="paste-url" placeholder="Paste in a URL (e.g. Google Slides, SlideShare, etc)" type="text">
							<button class="uk-button uk-button-secondary" id="paste-url-action" type="button">Load</button>
						</form>
					</div>
				</div>

				<div class="presentation-slides uk-hidden">
					<div id="current-slide"></div>
					<audio id="current-audio" class="uk-width-1-1 uk-hidden" controls allowfullscreen></audio>
					<p class="uk-hidden uk-text-center" id="audio-reset-button">
						<button class="uk-button uk-button-danger" onclick="pressResetAudio()"><span uk-icon="close"></span> Remove audio</button>
					</p>
					<div class="uk-margin-medium uk-padding-small droppable" id="audio-dropzone">
						<p>Drag and drop your slide audio here. We support most video and audio formats. mp3 is fastest.</p>
						<p class="uk-text-small">or</p>
						<p class="uk-margin">
							<a class="uk-button uk-button-secondary" href="#kloudless" id="audioCloudUpload">Upload from Cloud</a>
							<a class="uk-button uk-button-secondary" href="#upload">Pick file</a>
							<a class="uk-button uk-button-primary" href="#record">Record microphone</a>
						</p>
					</div>
					</div>
				</div>
			</div>
		</div>
		<input id="fileupload" onchange="dragHandler.Drop(this)" style="display:none" type="file">
	</article>

	<footer>
		<div class="uk-flex uk-flex-between controls">
			<div class="uk-grid-small uk-child-width-auto uk-grid">
				<b>Page turn effect:</b>
				<label><input class="uk-radio" type="radio" name="effect" value="slide"> Slide</label>
				<label><input class="uk-radio" type="radio" name="effect" value="fade"> Fade</label>
				<label><input class="uk-radio" type="radio" name="effect" value="scale"> Scale</label>
				<label><input class="uk-radio" type="radio" name="effect" value="pull" checked> Pull</label>
				<label><input class="uk-radio" type="radio" name="effect" value="push"> Push</label>
				<label><input class="uk-radio" type="radio" name="effect" value="none"> None</label>
			</div>
			<div>
				<b>Compatibility:</b>
				<label><input class="uk-radio" type="radio" name="api" value="scorm12" checked> Scorm 1.2</label>
				<label><input class="uk-radio" type="radio" name="api" value="scorm2004"> Scorm 2004</label>
				<label><input class="uk-radio" type="radio" name="api" value="none"> No API</label>
			</div>
		</div>
		<div class="uk-flex uk-flex-between controls">
			<div>
				<b>Slides</b>: <output id="slidecount" class="uk-margin-right">0</output>
				<b>Slides without audio:</b> <output id="noaudiocount">0</output>
			</div>
			<div class="uk-grid-small uk-child-width-auto uk-grid">
				<b>Design:</b>
				<label><input class="uk-checkbox" type="checkbox" name="options" value="visibility" checked> Audio control</label>
				<label><input class="uk-checkbox" type="checkbox" name="options" value="navigation"> Slide controls</label>
				<label><input class="uk-checkbox" type="checkbox" name="options" value="autoplay" checked> Autoplay</label>
				<label><input class="uk-checkbox" type="checkbox" name="options" value="kenburns"> Ken Burns Effect</label>
			</div>
		</div>
		<div class="uk-text-center controls">
			<button class="uk-button uk-button-secondary" id="preview-button">Preview <span uk-icon="image"></span></button>
			<button class="uk-button uk-button-primary" disabled id="download-button">Download <span uk-icon="download"></span></button>
		</div>
	</footer>

	<script crossorigin="anonymous" integrity="sha256-tBpjCmddMBnZurbeRCRxYcQjPJqIqwtfwtZNlRUv++0=" src="https://cdn.jsdelivr.net/npm/localforage@1.9.0/dist/localforage.min.js"></script>
	<script crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/localforage@1.9.0/dist/localforage.min.js" integrity="sha256-tBpjCmddMBnZurbeRCRxYcQjPJqIqwtfwtZNlRUv++0=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit-icons.min.js"></script>
	<script src="https://unpkg.com/mic-recorder-to-mp3@2.2.1"></script>
	<script src="https://unpkg.com/lamejs@1.2.0/lame.all.js"></script>
	<script src="js/index.js" type="text/javascript"></script>
	<script src="js/kloudless.upload.js" type="text/javascript"></script>

</body>
</html>