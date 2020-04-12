<?php
define("APP",true);
include("load.php");

$jsApp = new stdClass();
$jsApp->Home = $verifier->home;
$jsApp->Tier =  $verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
$jsApp->Minified = $verifier->code->minified;
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	$jsApp->Publish = $verifier->api->publish;
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST"; // or PUT
}

// api url = coursesuite url / api / dl / apikey / appkey / template.zip
$api_template = isset($verifier->api->template) ? $verifier->api->template : "";

?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Audio Presenter</title>
		<meta name="description" content="Add an audio track to your scorm-enabled slide presentation" />
		<meta name="keywords" content="scorm, scorm wrapper, scorm content, content packaging, ims manifest, coursesuite ninja, scorm ninja" />
		<meta name="author" content="coursesuite pty ltd" />
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link href="https://cdn.jsdelivr.net/combine/npm/purecss@1.0.0/build/base-min.css,npm/purecss@1.0.0/build/buttons-min.css,npm/purecss@1.0.0/build/forms-min.css" rel="stylesheet" type="text/css">
		<link href="css/scormninja/style.css" rel="stylesheet" type="text/css">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

		<script src="js/modernizr.custom.js"></script>
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = new WebSocket("<?php echo $verifier->app->socket; ?>"); <?php echo $verifier->app->layer; ?>;</script>
<?php if ($verifier->code->minified) { ?>
		<link rel="stylesheet" type="text/css" href="<?php echo $minified_css; ?>" />
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-68767047-3', 'auto');
		  ga('send', 'pageview');
		</script>
		<!-- Piwik -->
		<script type="text/javascript">
		  var _paq = _paq || [];
		  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		  _paq.push(['trackPageView']);
		  _paq.push(['enableLinkTracking']);
		  (function() {
		    var u="//stats.coursesuite.ninja/";
		    _paq.push(['setTrackerUrl', u+'piwik.php']);
		    _paq.push(['setSiteId', '2']);
		    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
		  })();
		</script>
		<!-- End Piwik Code -->

<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="css/app.css" />
<?php } ?>
		<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js" async="true"></script>
		<script src="https://code.jquery.com/jquery-3.0.0.js" integrity="sha256-jrPLZ+8vDxt2FnE1zvZXCkCcebI/C8Dt5xyaQBjxQIo=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/0.9.0/purify.min.js"></script>
		<style id="fiddle"></style>
<?php if (isset($verifier->api->header->css) && !empty($verifier->api->header->css)) {
	echo "		<style>" . $verifier->api->header->css . "</style>";
}
?>
</head>

<?php if ($verifier->valid) { ?>

<body class="sources">

	<section class="page-fixed-top">

		<header id="banner"><div class='cs-banner'><h1><img src='img/microphone.svg' width='40' height='40' title='another CourseSuite app'> Audio <span>Presenter</span></h1></div></header>

		<nav id="tabs">
			<a href="javascript:;" data-tab="sources"><i class="pn-upload"></i> Add sources</a>
			<a href="javascript:;" data-tab="slides"><i class="pn-fiddle"></i> Slide markers</a>
			<a href="javascript:;" data-tab="design"><i class="pn-design"></i> Design</a>
			<a href="javascript:;" data-tab="download"><i class="pn-save"></i> Download your package</a>
			<span class="btn toolbar"><a href="https://guide.coursesuite.ninja/presentationninja/usage" data-action="pop-help" target="app_help">
				<i class="ninja-help"></i> Help</a>
			</span>
			<span class='btn'>
				<a href="javascript:;" id="clearStorage" title="Clear all files and settings and start over">
					<span class="reset"><i class="ninja-reset"></i> <span id="reset-hint-text">Reset</span></span>
				</a>
				<span id="confirm"><a class="ok" href="javascript:;" id="confirmReset" title="This wipes all files and settings (no undo)!">Yes!</a><a href="javascript:" id="cancelReset" title="Don't reset anything">No!</a></span>
			</span>
		</nav>

	</section>

	<audio id="page-audio-obj" preload="metadata" data-slide="-1"></audio>
	<main>
		<!-- <section id="grey"></section> -->
		<section id="sources">
		<div class="sources-grid">
			<div class="slides-heading">Presentation</div>
			<div class="slides-section">
				<div class="slide-processing">
					<div class="slide-dropzone" onclick="document.getElementById('slideUploadBrowse').click();">
						<p>Drop your presentation here, or click to browse.<small>We currently support Keynote, PowerPoint, OpenOffice, Google Slides and SlideShare.</small></p>
						<div class="slide progress-bar blue">
							<span style="width: 0%;"></span>
						</div>
						<input id='slideUploadBrowse' type='file' style='display: none;' onchange="browseUpload(this.files[0]);">
					</div>
					<p class="or">
						<span class="dot-border"></span>
						<i>or</i>
						<span class="dot-border"></span>
					</p>
					<div class="slide-urlzone">
						<textarea class="url-box" placeholder="Insert/paste sharable file URL"></textarea><button class="button-secondary pure-button"><i class="fa fa-upload"></i> Load</button>
					</div>
					<p class="or">
						<span class="dot-border"></span>
						<i>or</i>
						<span class="dot-border"></span>
					</p>
					<div class="slide-cloudzone">
						<p>Upload from the cloud.</p>
						<button id="slideCloudUpload" class="button-secondary pure-button"><i class="pn-cloud"></i>Choose...</button>
					</div>
				</div>

				<div class="slide-presentation">
					<div class="presentation-header">
						<div class="slide-info">Slide title</div>
						<div class="chapter-info">Slide 1 of 10</div>
					</div>
					<div class="presentation-frame">
						<iframe src="about:blank"></iframe>
					</div>
					<div class="presentation-footer">
						<div class="nav-info">Use the left and right arrow keys to change slides.</div>
						<div class="footer-buttons">
							<span class="button-slide-delete">
								<a href="javascript:;" id="deleteSlideshow">
									<span class="delete-ask">
										<span id="slide-delete-text">Delete Slides</span>
									</span>
								</a>
								<span class="slide-delete-confirm">
									<a href="javascript:;" id="confirmSlideDelete">Yes!</a>
									<a href="javascript:;" id="cancelSlideDelete">No!</a>
								</span>
							</span>
							<button id="addAnother" class="button-secondary pure-button" onclick="document.getElementById('slideUploadBrowse').click();">
								<span>Add another presentation</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="audio-heading">Audio</div>
			<div class="audio-processing">
				<div class="audio-dropzone" onclick="document.getElementById('audioUploadBrowse').click();">
					<p>Drop your audio file here, or click to browse<small>.wav, .mp3, .ogg, .weba, .wma, .m4a, .aif formats supported</small></p>
					<div class="audio progress-bar green">
						<span style="width: 0%;"></span>
					</div>
					<input id='audioUploadBrowse' type='file' style='display: none;' onchange="browseUpload(this.files[0]);">
				</div>
				<p class="or">
					<span class="dot-border"></span>
					<i>or</i>
					<span class="dot-border"></span>
				</p>
				<div class="audio-urlzone">
					<p class='rec-desc visible'>Record<small>Record a lecture in app with your computer microphone</small></p>
					<p class='rec-help'><small>If your presentation is uploaded, you can press the right arrow to set cue points</small></p>
					<div class="controls-container">
						<button data-action="record" class="button-secondary pure-button"><span><i class='pn-mic'></i>Record</span></button>
						<button data-action="delete" class="button-warning pure-button"><span>Delete</span></button>
						<button data-action="use" class="button-success pure-button"><span>Use this</span></button>
					</div>
					<div class="canvas-container">
						<div id="recorder-timestamp"></div>
						<canvas class="visualiser" width="calc(100%)" height="35px"></canvas>
						<audio id="recorder-audio" controls></audio>
					</div>
				</div>
				<p class="or">
					<span class="dot-border"></span>
					<i>or</i>
					<span class="dot-border"></span>
				</p>
				<div class="audio-cloudzone">
					<p>Upload from the cloud.</p>
					<button id="audioCloudUpload" class="button-secondary pure-button"><i class="pn-cloud"></i>Choose...</button>
				</div>
				<div class="audio-ready">
					<p>Your audio is ready.</p>
					<div class="audio-ready-footer">
						<span class="button-audio-delete">
							<a href="javascript:;" id="deleteAudio">
								<span class="delete-ask">
									<span id="audio-delete-text">Delete Audio</span>
								</span>
							</a>
							<span class="audio-delete-confirm">
								<a href="javascript:;" id="confirmAudioDelete">Yes!</a>
								<a href="javascript:;" id="cancelAudioDelete">No!</a>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		</section>

		<section id="slides">
			<p><i class="fa fa-hand-pointer-o"></i> Align slide markers with your audio track.</p>
			<div class="slide-panel">
				<div class="slide-split-wrapper">
					<div class="slides">
						<iframe src="about:blank"></iframe>
						<output>1</output>
					</div>
				</div>
				</div>
				<div id="controlPanel" class="control-panel">
					<div id="topBar">
						<div id="pointControl">
						<a id="manualCue" href="javascript:;">
							<span class="material-icons" ws-tooltip="Enter manual cue mode, deleting all slide markers. Press Enter to add slide marker.">tune</span>
						</a>
						<a id="chapReset" href="javascript:;">
						<span class="material-icons" ws-tooltip="Reset editor to its default state">restore</span>
					</a>
					</div>
						<div id="zoom" ws-tooltip="Adjust to zoom in and out of waveform">
						<span class="material-icons">zoom_out</span>
				 				<input id="waveformZoom" type="range" min="0" max="3" value="3"/>
							<span class="material-icons">zoom_in</span>
					</div>
					<div id="waveTimestamp" class="wave-timestamp">00:00</div>
					<div id="playPause">
						<a id="playPauseButton" href="javascript:;" >
						<span class="material-icons" ws-tooltip="Press spacebar to toggle playback">play_arrow</span>
						</a>
					</div>
					<div id="vol" class="sliders" ws-tooltip="Adjust the volume of the audio (this will not affect the output package)">
			 				<span class="material-icons">volume_down</span>
							<input id="waveformVolume" type="range" min="0" max="100" value="80"/>
						<span class="material-icons">volume_up</span>
					</div>
					<a id="wsHelp" href="javascript:;">
						<span class="material-icons" ws-tooltip="Click to show/hide help popups">help</span>
					</a>
					</div>
					<div id="chapterTitles" ws-tooltip="Double click slide titles to edit. Enter to save. Escape to cancel.">
					<div id="titlesContainer"></div>
				</div>
				<div id="waveformLoading" class="wave-loading-container visible">
						<img src="img/coursesuite.svg" class="wave-loading" width="50" height="50"></img>
						<p>Waveform loading...</p>
					</div>
					<div id="waveContainer">

					</div>
					<!--
				<div id="waveSurfer" class="wave-surfer" ws-tooltip="Click on chapter names to rename them. Click away or press enter to save. Press escape to cancel.">

				</div>
				<div id="waveTimeline" class="wave-timeline" ws-tooltip="The timeline shows how far along the track you are. Useful for lining up chapters!"></div>
				<div id="scrubTrack" class="scrub-track" ws-tooltip="Click on the scrub track or waveform to navigate the audio">
					<div id="trackStart">0</div>
					<div id="scrubTrackPlayed" class="scrub-track-played"></div>
					<div id="scrubThumb" class="scrub-thumb"><div id="playHead"></div></div>
					<div id="trackEnd">100</div>
				</div>
				-->
				</div>
				<!--
				<div style="display: none;">
				<p class="slide-webvtt-text"><a href="#webvtt-editor"><i class="fa fa-expand"></i> Show advanced WebVTT editor</a></p>
				<div class="slide-webvtt-wrapper" id="webvtt-editor">
					<div id="webvtt-errors"></div>
					<textarea placeholder="Chapter information will appear here after slides have been added."></textarea>
				</div>
			</div>
			-->
		</section>

		<section id="design">
			<form id="design-options" class="wrapper">
				<div class="design-section">
				<h3>Colours</h3>
				<p>You can change the colours of the audio player control</p>
				<table class="colours">
					<tr><th>fill</th><th>controls</th><th>text</th></tr>
					<tr>
					<td><input id="bg-colour" class="picker jscolor {position:'top'}" value="ffffff"></td>
					<td><input id="range-colour" class="picker jscolor {position:'top'}" value="333333"></td>
					<td><input id="text-colour" class="picker jscolor {position:'top'}" value="000000"></td>
					</tr>
				</table>
				<div class="previews">
				<input type="radio" name="playerType" value="basicPlayer" checked>
				<h3 title="basicPlayer">Basic Player</h3>
				<div class="basic-player-preview">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 35">
					<g>
						<rect
						x="0"
						y="16"
						width="310"
						height="20"
						style="stroke-width:0.22427045"
						/>
					</g>
					<g
						 inkscape:label="Layer 1"
						 inkscape:groupmode="layer"
						 id="layer1"
						 transform="translate(0,-247)">
						 <text
							 xml:space="preserve"
					 		 x="0"
							 y="282"
							 id="play_icon"><tspan
						 		id="tspan88467"
						 		x="0"
						 		y="282"
						 		class="material-icons">play_arrow</tspan>
						 </text>
						 <text
							 xml:space="preserve"
					 		 x="20"
							 y="282"
							 id="skip_previous_icon"><tspan
						 		id="tspan667"
						 		x="20"
						 		y="282"
						 		class="material-icons">skip_previous</tspan>
						 </text>
						 <text
							 xml:space="preserve"
					 		 x="40"
							 y="282"
							 id="skip_next_icon"><tspan
						 		id="tspan8437"
						 		x="38"
						 		y="282"
						 		class="material-icons">skip_next</tspan>
						 </text>
						<rect
							 style="stroke-width:0.22427045"
							 id="rect3765"
							 width="85"
							 height="10"
							 x="60"
							 y="268" />
						<rect
							id="svgBasicProgress"
							style="opacity:0.2;"
							width="10"
							height="10"
							x="60"
							y="268"
							/>
						<text
							 xml:space="preserve"
							 style="font-style:normal;font-weight:normal;font-size:8px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill-opacity:1;stroke:none;stroke-width:0.26458332"
							 x="150"
							 y="300"
							 id="text3769"><tspan
								 class="svgtxt"
								 sodipodi:role="line"
								 id="tspan3767"
								 x="150"
								 y="275"
								 style="stroke-width:0.26458332">01:32 / 05:17</tspan></text>
						<text
							 xml:space="preserve"
					 		 x="200"
							 y="282"
							 id="volume_down_icon"><tspan
						 		id="tspan843977"
						 		x="200"
						 		y="282"
						 		class="material-icons">volume_down</tspan>
						 </text>
						<rect
							 style="stroke-width:0.26458332"
							 id="rect3771"
							 width="47.625"
							 height="5.2916665"
							 x="217"
							 y="270" />
						<text
							 xml:space="preserve"
					 		 x="270"
							 y="282"
							 id="volume_up_icon"><tspan
						 		id="tspan843977"
						 		x="267"
						 		y="282"
						 		class="material-icons">volume_up</tspan>
						 </text>
						 <text
							 xml:space="preserve"
					 		 x="290"
							 y="282"
							 id="fullscreen_icon"><tspan
						 		id="tspan8437"
						 		x="290"
						 		y="282"
						 		class="material-icons">fullscreen</tspan>
						 </text>
					</g>
				</svg>
				</div>
				<input type="radio" name="playerType" value="splitPlayer">
				<h3 title="splitPlayer">Slide Selector</h3>
				<div class="audio-preview">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 63" id="audio-preview-svg">
					<title>Untitled-1</title>
					<rect width="750" height="63" rx="12" ry="12" fill="#fff"/>
					<g>
						<text
						x="0"
						y="0"
						text-anchor="middle">
						<tspan
							style="font-size: 15px;"
							x="530"
							y="37"
							>01:30 / 09:44</tspan>
					</text>
						<text>
							<tspan
							x="10"
							y="60"
							style="font-size:56px;"
							class="material-icons"
							>play_arrow</tspan>
						</text>
					</g>
					<g>
						<rect x="68" y="33" width="414" height="10" rx="5" ry="5" />
						<text><tspan x="580" y="40" class="material-icons">volume_down</tspan></text>
						<rect x="600" y="27" width="74" height="10" rx="5" ry="5" />
						<text><tspan x="675" y="40" class="material-icons">volume_up</tspan></text>
						<rect x="68" y="19" width="74" height="10" rx="5" ry="5"  fill-opacity='0.5'/>
						<rect x="153" y="19" width="74" height="10" rx="5" ry="5" fill-opacity='0.5'/>
						<rect x="238" y="19" width="74" height="10" rx="5" ry="5" fill-opacity='0.5'/>
						<rect x="323" y="19" width="74" height="10" rx="5" ry="5" fill-opacity='0.5'/>
						<rect x="408" y="19" width="74" height="10" rx="5" ry="5" fill-opacity='0.5'/>
						<text>
						<tspan
						x="690"
						y="60"
						class="material-icons"
						style="font-size: 56px;"
						>fullscreen</tspan></text>
					</g>
				</svg>
				</div>
				<!--
				<input type="radio" name="playerType" value="mobilePlayer">
				<h3 title="mobilePlayer">Mobile Player</h3>
				<div class="mobile-player-preview">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
					<g>
						<rect id="playerbg"
							x="0"
							y="0"
							width="300"
							height="150"
							/>
							<rect id="svgMobileScrub"
							x="0"
							y="0"
							width="300"
							height="10"
							/>
							<rect
							style="opacity: 0.2;"
							id="svgMobileProgress"
							x="0"
							y="0"
							width="70"
							height="10"
							/>
					</g>
					<g>
						<text
							x="0"
							y="0"
							text-anchor="middle">
							<tspan
								x="150"
								y="20"
								class="svgtxt"
								>Slide 1</tspan>
						</text>
						<text
							x="0"
							y="0"
							text-anchor="middle">
							<tspan
								x="150"
								y="35"
								class="svgtxt"
								>03:30 / 12:31</tspan>
						</text>
						<text
							x="0"
							y="0"
							text-anchor="middle">
							<tspan
								x="150"
								y="60"
								class="material-icons"
								>skip_previous play_arrow skip_next</tspan>
						</text>
						<text
							x="0"
							y="0"
							text-anchor="middle">
							<tspan
								x="210"
								y="60"
								class="material-icons"
								>fullscreen</tspan>
						</text>
						<text
							x="0"
							y="0">
							<tspan
								x="30"
								y="80"
								class="material-icons"
								>volume_down</tspan>
						</text>
						<rect
							x="50"
							y="69"
							width="200"
							height="5"
						/>
						<text
							x="0"
							y="0">
							<tspan
								x="255"
								y="80"
								class="material-icons"
								>volume_up</tspan>
						</text>
					</g>
				</svg>
				</div>-->
				</div>
				</div>
				<div class="design-section">
				<h3>Layout</h3>
				<p>Content will scale to the available screen size. You can choose the aspect ratio (16:9 is the most common).</p>
				<table class="aspect-ratios">
					<tr>
						<td><div class="h">Title</div><div class="aspect-ratio ratio-16-9 active"><span>16:9</span></div><div class="f">Controls</div></td>
						<!-- <td><div class="h">Title</div><div class="aspect-ratio ratio-16-10"><span>16:10</span></div><div class="f">Controls</div></td> -->
						<td><div class="h">Title</div><div class="aspect-ratio ratio-4-3"><span>4:3</span></div><div class="f">Controls</div></td>
						<!-- <td><div class="h">Title</div><div class="aspect-ratio ratio-1-1"><span>1:1</span></div><div class="f">Controls</div></td> -->
					</tr>
				</table>
				<!--
				<h3>Player style</h3>
				<p>https://codepen.io/frumbert/pen/MOGrKm?editors=1010</p>
				-->
				<h3>Other settings</h3>
				<p><label>Default volume: <select name="volume">
					<option value="0">0%</option>
					<option value="10">10%</option>
					<option value="20">20%</option>
					<option value="30">30%</option>
					<option value="40">40%</option>
					<option value="50">50%</option>
					<option value="60">60%</option>
					<option value="70">70%</option>
					<option value="80" selected>80%</option>
					<option value="90">90%</option>
					<option value="100">100%</option>
				</select></label></p>
				<table class="inline-table"><tr><th>Page background:</th>
					<td><input id="body-bg-colour" class="picker jscolor {position:'top'}" value="ffffff"></td>
					<th>Title text:</th>
					<td><input id="body-text-colour" class="picker jscolor {position:'top'}" value="000000"></td></tr>
				</table>
				</div>
			</form>
			</section>
		</section>

		<section id="download">
			<form id="settings" class="pure-form">

				<section id="basic-options" class="settings-panel standard-width">
					<div class="content">
						<div class="field-row">
							<label for="ocn">Package Name (required)</label>
							<div class="input">
								<input type="text" class="text-input" size="30" placeholder="Course name" name="option-course-name" id="ocn">
							</div>
						</div>
						<div class="field-row">
							<label for="ocd">Description (short, optional)</label>
							<div class="input">
								<textarea  rows="2" class="text-multiline" cols="30" placeholder="Description (optional)" name="option-course-description" id="ocd"></textarea>
							</div>
						</div>
						<div class="field-row">
							<label for="occ">Copyright (optional)</label>
							<div class="input">
								<input type="text" class="text-input" size="30" placeholder="Copyright statement" name="option-course-copyright" id="occ">
							</div>
						</div>
						<div class="field-row">
							<label for="completion">Complete after slide</label>
							<div class="input">
								<input type="number" min="1" max="1" value="1" name="slide-completion" id="completion"/>
							</div>
						</div>
						<div class="field-row v-row">
							<label>Packaging</label>
							<div class="rows">
								<div class="row"><label><input type="radio" name="option-course-api" value="scorm12" checked> Scorm 1.2 (most common format)</label></div>
								<div class="row"><label><input type="radio" name="option-course-api" value="scorm2004"> Scorm 2004</label></div>
								<div class="row"><label><input type="radio" name="option-course-api" value="none"> No wrapper</label></div>
							</div>
						</div>
					</div>
				</section>
			</form>

			<div id="download-button-container" class="standard-width">
			<div class="button-row">

				<div class="progress-button elastic" data-destination="download">
					<button><span><i class="dl pn-download"></i> Download zip</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
				</div>

				<div class="progress-button elastic" data-destination="kloudless">
					<button><span><i class="dl pn-upload2"></i> Save to Cloud</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="preview">
					<button><span><i class="fa fa-eye"></i> Preview zip</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
				</div>

<?php if (isset($verifier->api->publish) && !empty($verifier->api->publish)) { ?>
				<div class="progress-button elastic" data-destination="publish">
					<button><span><i class="ninja-upload"></i> Publish to LMS</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>
<?php } ?>

			</div>

			<div class="did-you-know">
				<h3>Did you know?</h3>
				<p>You can go back and fiddle some more at any time.<br/>Your files will stay loaded until you press reset.</p>
				<div id="onsell"></div>
			</div>

			<div style="display: block;margin: 0 auto;" class="survey-button">
				<button id="surveyButton" onclick="toggleSurvey();"><span>Feedback Survey</span></button>
			</div>
			<div class="survey-modal">
				<div class="survey-bar"><i class="pn-close" onclick="toggleSurvey();"></i></div>
				<iframe id="surveyFrame" src="https://docs.google.com/forms/d/e/1FAIpQLScJX6nmy-T4nySdrlRDzNTnesx2wXk4_en09Y_IWhmLGgZ_4Q/viewform?embedded=true" width="640" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
			</div>

		</section>

	</main>

	<div id="alert">
		<section class="message-body">
			<div><i class="ninja-warning"></i></div>
			<div id="alert-text"><h3>alert title</h3><p>Insert the alert text in this space.</p></div>
		</section>
		<section class="message-action">
			<button>Okay</button>
		</section>
	</div>

	<div id="loader" class="pageload-overlay" data-opening="M 40,-65 145,80 -65,80 40,-65" data-closing="m 40,-65 0,0 L -65,80 40,-65">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
			<path d="M 40,-65 145,80 40,-65"/>
		</svg>
	</div>

	<div id="cog">
		<a data-action='toggle-settings' href="javascript:;" title="App defaults"><i class="fa fa-fw fa-cog"></i></a>
		<div>
			<p data-action='toggle-mute'><a href="javascript:;"><i class="fa fa-fw fa-volume-up"></i> Swoosh sound</a></p>
			<p data-action='toggle-no-autoconvert'><a href="javascript:;"><i class="fa fa-fw fa-file-audio-o"></i> Auto-convert audio</a></p>
		</div>
	</div>

<?php if ($verifier->code->minified) { ?>
	<script src="<?php echo $minified_app; ?>"></script>
<?php } else { ?>
	<script type="text/javascript" src="js/peaks.js/peaks.js"></script>
	<script type="text/javascript" src="js/chapter.editor.js"></script>

	<script type="text/javascript" src="js/jscolor.js"></script>
	<script type="text/javascript" src="js/jszip.min.js"></script>
	<script type="text/javascript" src="js/localforage-1.5/localforage.min.js"></script>
	<script type="text/javascript" src="js/webvtt_parser.js"></script>
	<script type="text/javascript" src="js/jquery.textarea.linenumbers.js"></script>
	<script type="text/javascript" src="js/lib.js"></script>
	<script type="text/javascript" src="js/templates.js"></script>
	<script type="text/javascript" src="js/svgLoader.js"></script>
	<script type="text/javascript" src="js/uiProgressButton.js"></script>
	<script type="text/javascript" src="js/fit.js"></script>

	<script type="text/javascript" src="js/ui.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/download.js"></script>

	<script type="text/javascript" src="js/init.js"></script>
<?php } ?>

	<?php } else { ?>

<body class="licence-sad">

	<header>
		whatever this app is called
	</header>

	<main>
		<h1>licence key problem</h1>
		<h2><?php
		switch ($verifier->licence->error) {
			case "bad-token":
				echo "Your licence or subscription key is missing or invalid.";
				break;
			case "licence-key-expired":
				echo "Your licence key has expired.";
				break;

			default:
				echo "Something went horribly wrong. ", $verifier->licence->error;
				break;
		}
		?></h2>
		<p><a href="<?php echo getenv("HOME_URL"); ?>">Home</a></p>
	</main>

<?php } ?>
	</body>
</html>
