<?php

define("APP",true);
include("load.php");

// private api key not to be exposed to clients
DEFINE('APIKEY', 'Qmr_XVPQd9d45n9peUjuKpH42H7pm2nhZ6erwsmLnaTda_v8');

$account = ToScormUtilities::getParam("account", "raw");
$id = ToScormUtilities::getParam("id", "raw");

if (empty($account)) die("no account");
if (empty($id)) die("no id");

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.kloudless.com/v1/accounts/{$account}/storage/files/{$id}/contents");
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: APIKey " . APIKEY));
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 2);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$resp = curl_exec($ch);

$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($status_code != 200) {
    throw new Exception("Response with Status Code [" . $status_code . "].", $status_code);
}

echo $resp;