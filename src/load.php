<?php
defined('APP')?assert(true):die();

error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("AUTHAPI_URL=https://coursesuite.ninja.test/api/validate/presninja/{hash}/");
putenv("AUTHAPI_USER=tokenuser");
putenv("AUTHAPI_PASSWORD=GEv6mJ7wJgWR");
putenv("HOME_URL=http://apresninja.coursesuite.ninja.test/");

require_once('../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->valid = true;
$verifier->code->minified = false;
