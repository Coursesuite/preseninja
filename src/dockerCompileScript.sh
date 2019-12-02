#!/bin/bash
hb=/usr/lib/node_modules/handlebars/bin/handlebars
miniJs=/usr/lib/node_modules/uglify-es/bin/uglifyjs
miniCss=/usr/lib/node_modules/uglifycss/uglifycss

cd /presentation-ninja/public/app/

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
$hb handlebars/ -f js/templates.js

cd css
python inline.py app.css
rm app.min*.css
$miniCss --output app.min.$TS.css app.inlined.css 
rm app.inlined.css

cd ..
cd js

rm head.min*.js
$miniJs snap.svg-min.js modernizr.custom.js lib.js --keep-fnames --output head.min.$TS.js

rm app.min*.js
$miniJs jscolor.js jszip.min.js localforage-1.5/localforage.min.js peaks.js/peaks.js webvtt_parser.js jquery.textarea.linenumbers.js templates.js svgLoader.js uiProgressButton.js app.js --keep-fnames --output app.min.$TS.js

cd ..

echo "Updating index file references"
echo "<?php" > variables.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> variables.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> variables.php
echo "\$minified_head = 'js/head.min.$TS.js';" >> variables.php
echo "?>" >> variables.php

echo "Creating deployment package"
rm -r -f ../../deploy
cp -R ../ ../../deploy
rm -r ../../deploy/app/handlebars

rm ../../deploy/app/css/app.css

rm ../../deploy/app/css/reset.css
rm ../../deploy/app/css/layout.css
rm ../../deploy/app/css/font.css
rm ../../deploy/app/css/sources-tab.css
rm ../../deploy/app/css/slides-tab.css
rm ../../deploy/app/css/design-tab.css
rm ../../deploy/app/css/download-tab.css
rm ../../deploy/app/css/cog.css
rm ../../deploy/app/css/colours.css
rm ../../deploy/app/css/header.css
rm ../../deploy/app/css/tabs.css
rm ../../deploy/app/css/alert.css
rm ../../deploy/app/css/range.css
rm ../../deploy/app/css/audio-player.css
rm ../../deploy/app/css/audio-splitter.css
rm ../../deploy/app/css/tinycolorpicker.css

rm ../../deploy/app/css/CircularProgressButton.css
rm ../../deploy/app/css/normalise.css
rm ../../deploy/app/css/waves.png

rm ../../deploy/app/js/snap.svg-min.js
rm ../../deploy/app/js/modernizr.custom.js

rm ../../deploy/app/js/jszip.min.js
rm -rf ../../deploy/app/js/localforage-1.5
rm ../../deploy/app/js/lib.js
rm ../../deploy/app/js/templates.js
rm ../../deploy/app/js/svgLoader.js
rm ../../deploy/app/js/uiProgressButton.js
rm ../../deploy/app/js/jquery.textarea.linenumbers.js
rm ../../deploy/app/js/app.js

rm ../../deploy/app/dockerCompileScript.sh

cd ../../deploy/app
rm proxy.php

cd ../../