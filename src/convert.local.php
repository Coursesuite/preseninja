<?php
error_reporting(32767); // gotta catch em all
require '../../vendor/autoload.php';

use \CloudConvert\Api;
$api = new Api("8pxT0DHRE5lpcVzildrPoEbztL9rc5Es89xG0incUfPNB93LLZueEr7zTK7PTuZmcV1hXkRMITbhjS-U1NnnzQ");

$content = file_get_contents($_FILES["file"]["tmp_name"]);
$fileUrl = 'data:' . $_FILES["file"]["type"] . ';base64,' . base64_encode($content);

//https://github.com/cloudconvert/cloudconvert-php

try {
    $process = $api->createProcess([
        'inputformat' => $_POST["inputformat"],
        'outputformat' => $_POST["outputformat"],
    ]);
    $process->start([
        'outputformat' => $_POST["outputformat"],
        'input' => 'base64',
        'download' => 'inline',
        'save' => true,
        'file' => $fileUrl,
        'filename' => $_POST["name"],
    ])->wait();
    $process->refresh();
    echo($process->output->url);

} catch (\CloudConvert\Exceptions\ApiBadRequestException $e) {
    echo "Something with your request is wrong: " . $e->getMessage();
} catch (\CloudConvert\Exceptions\ApiConversionFailedException $e) {
    echo "Conversion failed, maybe because of a broken input file: " . $e->getMessage();
}  catch (\CloudConvert\Exceptions\ApiTemporaryUnavailableException $e) {
    echo "API temporary unavailable: " . $e->getMessage() ."\n";
    echo "We should retry the conversion in " . $e->retryAfter . " seconds";
} catch (Exception $e) {
    // network problems, etc..
    echo "Something else went wrong: " . $e->getMessage() . "\n";
}

