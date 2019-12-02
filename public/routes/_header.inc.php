<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
 		<meta name="description" content="Combine presentations with audio and video to create rich multimedia SCORM-enabled courses" />
		<meta name="keywords" content="Video to Scorm, scorm modules, scorm content, scorm wrapper, scorm authoring tool, scorm packages ppt to scorm, pptx to scorm, powerpoint to scorm, docx to scorm, pdf to scorm, video to scorm, google slides to scorm, google docs to scorm" />
		<meta name="author" content="www.coursesuite.com" />
        <title><?php echo $page_title; ?> - Audio Presentation Ninja</title>
        <meta property="og:locale" content="en_AU">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?php echo $page_title; ?> - Audio Presentation Ninja">
        <meta property="og:description" content="Combine presentations with audio and video to create rich multimedia SCORM-enabled courses">
        <meta property="og:url" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/">
        <meta property="og:site_name" content="Audio Presentation Ninja">
        <meta property="og:image" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/assets/meta_card.png">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />
        <link href="assets/style.css" rel="stylesheet" type="text/css"/>
		<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"></script>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		<?php include "_cookie.inc.php"; ?>
		<?php include "_analytics.inc.php"; ?>
    </head>
    <body class="<?php echo str_replace('.inc.php','',$fn); ?> uk-position-relative">
    	<header class="uk-position-top-right uk-position-small uk-position-fixed">
			<ul class="uk-navbar-nav">
				<li><a href="/">Home</a></li>
				<li><a href="/faq">Faq</a></li>
				<li><a href="https://guide.coursesuite.ninja/presentationninja/usage">Documentation</a></li>
				<li><?php include "_launch.inc.php"; ?></li>
			</ul>
		</header>
		<img src="assets/logo.svg" class="uk-position-top-left uk-position-small ap-logo" width="500">