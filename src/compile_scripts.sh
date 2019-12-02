#!/bin/bash
timestamp() {
  date +"%Y%m%d%H%M%S"
}

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
handlebars handlebars/ -f js/templates.js

echo "Minifying CSS"

rm -f css/app.min*.css
php ./importcss.php -icss/app.css -ocss/app.min.$TS.css

echo "Minifying Scripts"

rm -f js/app.min*.js
rm -f js/app.min*.js.map
rm -f js/head.min*.js

cd js

uglifyjs snap.svg-min.js modernizr.custom.js lib.js --keep-fnames --output head.min.$TS.js
uglifyjs jscolor.js jszip.min.js localforage-1.5/localforage.min.js peaks.js/peaks.js webvtt_parser.js jquery.textarea.linenumbers.js templates.js svgLoader.js uiProgressButton.js app.js --keep-fnames --output app.min.$TS.js --source-map

cd ..

echo "Creating app loader"
echo "<?php" > load.php
echo "require_once('../../vendor/autoload.php');" >> load.php
echo "session_start();" >> load.php
echo "if (!isset(\$_SESSION['sesskey'])) \$_SESSION['sesskey'] = md5(time());" >> load.php
echo "\$verifier = (new CoursesuiteValidator())->Validate(\$_GET);" >> load.php
echo "\$verifier->code->minified = true;" >> load.php
echo "\$timestamp = '$TS';" >> load.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> load.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> load.php
echo "\$minified_head = 'js/head.min.$TS.js';" >> load.php
echo "?>" >> load.php

echo "Creating deployment package"
rm -rf ../public/app
mkdir ../public/app
cp -R ../src/* ../public/app

echo "Fixing src loader"
cat load.dev.php > load.php

# ok now we need to go into app and start messing with it
cd ../public/app

echo "Cleaning css"
rm css/inline.py
rm css/app.css
rm css/normalise.css
rm css/CircularProgressButton.css
rm css/reset.css
rm css/layout.css
rm css/font.css
rm css/sources-tab.css
rm css/slides-tab.css
rm css/design-tab.css
rm css/download-tab.css
rm css/cog.css
rm css/colours.css
rm css/header.css
rm css/tabs.css
rm css/alert.css
rm css/range.css
rm css/audio-player.css
rm css/audio-splitter.css
rm css/marker.css
rm css/controlPanel.css
rm css/rangeSliders.css

echo "Cleaning javascript"
rm js/app.js
rm js/snap.svg-min.js
rm js/modernizr.custom.js
rm js/lib.js
rm js/jscolor.js
rm js/jszip.min.js
rm js/localforage-1.5/localforage.min.js
rm js/peaks.js/peaks.js
rm js/webvtt_parser.js
rm js/jquery.textarea.linenumbers.js
rm js/templates.js
rm js/svgLoader.js
rm js/uiProgressButton.js

echo "Cleaning handlebars"
rm -rf ./handlebars

echo "Cleaning root"
rm importcss.php
rm *.sh
rm convert.local.php
rm load.dev.php
rm -rf ./doc

cd ../../src
echo "Done"