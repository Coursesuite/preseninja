<?php

define("APP",true);
include("load.php");

header('content-type: application/json');
ToScormUtilities::deleteWorkspace();
die('{"result":true}');