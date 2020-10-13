<?php

define("APP",true);
include("load.php");

// private api keys not to be exposed to clients
DEFINE('KLOUDLESS_APIKEY', 'Qmr_XVPQd9d45n9peUjuKpH42H7pm2nhZ6erwsmLnaTda_v8');
DEFINE('CLOUDCONVERT_APIKEY', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2EwMWE5YWI1MmJjYmQ1NTVjN2FmZDFlYTMzYThhMzlkYjcxN2RlOTIwY2FkYjAwN2Q4ZWRhN2NkYTg2ZWY2NzFjNGJhYWY4NWY1NzJlYzYiLCJpYXQiOjE1OTgzNDM1NDYsIm5iZiI6MTU5ODM0MzU0NiwiZXhwIjo0NzU0MDE3MTQ2LCJzdWIiOiIxMjYzMjEzIiwic2NvcGVzIjpbInRhc2sucmVhZCIsInRhc2sud3JpdGUiLCJ3ZWJob29rLnJlYWQiLCJ3ZWJob29rLndyaXRlIl19.kPEG80MRfgr97ZnWXlPnKtxeqL_6AJrtLhv2MPVLt2T6b0fqC2dElEyHhshzm5FmoPc3R4OBe4nasn_hCYony-c7r42rnmscG-Yg0JJotkFScMCNDWwJ4_NBU1h7uOUO1IlNs3QnyxtFALPn1NLz6UZfMxtQ5EWCIz8EaoUZLwFLWwYffFGy21Qy8jWDZCRMI7oXz_wmy2cH6ylKYkwLF_YdWn35UQILyCH3PNhOrPa-XO2mMZuhSmlyv2ivqNWv1JG07M2hDcgKEDGKs7AOIf9jkXAkQgd-IiyyGMSWj9V3Q_R2eGHSzAB25EK7iBqS1LSEQP4AoUcp1p0Rt8cB5WLNZaXfctLceRXw9Wzzt5HPKxU1eNh9qqgQRTxuc9LPbQIrWW2KVshGQrWsi5viRiTYsZizIqflaFIwizr0fmIofQzGwzQn7GUrhMyZJHCyYHnfUIkOEXJ_t5pEBYPz1pjgBSfMDo0HHzbH-uIbaDpgSYa6DtXKq7H9Hvs5RXWoGfnVxL2KVxNSFw1YD8t0XWPlZCLd-SGaS2DzteU9DerZ49INmEYuDM-OszcNNOHiVKeKmOIgJYatcP9EvRY7pMjEk2N_us_EenKIwKdmOpmc6fQENPwMJz-UqKze3sFurPo83oE_BGBM71VyK6EtAuCn7i1I1q6HI8nHJuiezdU');


header('content-type: application/json');

use \CloudConvert\CloudConvert;
use \CloudConvert\Models\Job;
use \CloudConvert\Models\Task;

// set up api (this is a different key to the course assembler etc which use the api v1 system)

$cloudconvert = new CloudConvert([
    'api_key' => CLOUDCONVERT_APIKEY,
    'sandbox' => false
]);

// script variables
$result = [];
$output_extension = null;
$additionalParameters = [];
$mp3engine = 'ffmpeg'; // ffmpeg
$pdfengine = 'pdf2htmlex'; // pdf2htmlex, poppler
$pngengine = 'mupdf'; // mupdf, imagemagick, inkscape, poppler, graphicsmagick
$jpgengine = 'poppler'; // poppler, imagemagick, graphicsmagick

// post variables
$input_format = ToScormUtilities::getParam("inputformat");
$output_format = ToScormUtilities::getParam("outputformat");
$upload_name = ToScormUtilities::getParam("name","basename");

$kloud = ToScormUtilities::getParam("kloud", "bool", false);
$account = ToScormUtilities::getParam("account", "raw");
$id = ToScormUtilities::getParam("id", "raw");

if ($kloud) {
  if (empty($account)) die("{error: 'no account'}");
  if (empty($id)) die("{error: 'no id'}");

  // $additionalParameters = [
  //   "APIKey" => KLOUDLESS_APIKEY
  // ];

  // $upload_path = "https://api.kloudless.com/v1/accounts/{$account}/storage/files/{$id}/contents";
  // $job_name = "kloudless_import";

  $job_name = strtolower(preg_replace("/\W|_/", "_", pathinfo($upload_name,PATHINFO_FILENAME)));
  $project_folder = ToScormUtilities::createProjectWorkspace($job_name);
  $upload_path = $project_folder.'/'.$upload_name;

  $fp = fopen($upload_path,'w+');
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://api.kloudless.com/v1/accounts/{$account}/storage/files/{$id}/contents");
  curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: APIKey " . KLOUDLESS_APIKEY));
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 2);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 30);
  curl_setopt($ch, CURLOPT_FILE, $fp); // write stream to file
  curl_exec($ch);
  //$resp = curl_exec($ch);
  //file_put_contents($project_folder.'/curl.log', $resp);
  curl_close($ch);
  fclose($fp);

} else {

  $FILE = $_FILES['file'];
  if ($FILE["error"] > 0) die("{error:".$FILE["error"]."}");
  if (empty($upload_name)) $upload_name = basename($FILE['name']);
  $job_name = strtolower(preg_replace("/\W|_/", "_", pathinfo($upload_name,PATHINFO_FILENAME)));
  $project_folder = ToScormUtilities::createProjectWorkspace($job_name);
  $upload_path = $project_folder.'/'.$upload_name;
  move_uploaded_file($FILE["tmp_name"], $upload_path); // move upload to file

}

$result["workspace"] = substr($project_folder, strpos($project_folder, '/content/')+1);
$result["format"] = $output_format;


// create conversion tasks

$convertToPdf = (new Task('convert', 'convert-to-pdf'))
                 ->set('input_format', $input_format)
                 ->set('output_format', 'pdf')
                 ->set('engine', 'office')
                 ->set('input', ["import-file"])
                 ->set('optimize_print', false)
                 ->set('pdf_a', false)
                 ->set('hidden_slides', false)
                 ->set('output_type', 'slides')
                 ->set('slides_per_handout_page', 6);

$convertToMp3 = (new Task('convert', 'convert-to-mp3'))
                 ->set('input_format', $input_format)
                 ->set('input', ["import-file"])
                 ->set('output_format', 'mp3')
                 ->set('engine', $mp3engine)
                 ->set('audio_codec', 'mp3')
                 ->set('audio_qscale', 1)
                 ->set('engine_version', '4.1.4');

switch ($output_format) {
    case "mp3":
        $output_extension = "mp3";
        $job = (new Job())
           ->setTag('AP.MP3.'.$job_name)
           ->addTask(
               (new Task('import/upload', 'import-file'))
             )
           ->addTask($convertToMp3)
           ->addTask(
               (new Task('export/url', 'download-mp3'))
                 ->set('input', ["convert-to-mp3"])
                 ->set('inline', false)
                 ->set('archive_multiple_files', false)
             );

        break;

    case "html":
        // $output_extension = "zip";
        $src = "import-file";
        $job = (new Job())
           ->setTag('AP.HTML.'.$job_name)
           ->addTask(
               (new Task('import/upload', 'import-file'))
             );
        if ($input_format !== "pdf") {
          $job->addTask($convertToPdf);
          $src = "convert-to-pdf";
        }
        $job->addTask(
               (new Task('convert', 'convert-to-html'))
                 ->set('input_format', 'pdf')
                 ->set('output_format', 'html')
                 ->set('engine', $pdfengine)
                 ->set('input', [$src])
                 ->set('images', true)
                 ->set('filename', $job_name)
                 ->set('outline', false)
                 ->set('zoom', 1)
                 ->set('embed_css', false)
                 ->set('embed_javascript', false)
                 ->set('embed_images', false)
                 ->set('embed_fonts', false)
                 ->set('bg_format', 'jpg')
             )
           ->addTask(
               (new Task('export/url', 'download-html'))
                 ->set('input', ["convert-to-html"])
                 ->set('inline', false)
                 ->set('archive_multiple_files', false)
             );

        break;

    case "png":
        $src = "import-file";
        $job = (new Job())
           ->setTag('AP.PNG.'.$job_name)
           ->addTask(
               (new Task('import/upload', 'import-file'))
             );
        if ($input_format !== "pdf") {
          $job->addTask($convertToPdf);
          $src = "convert-to-pdf";
        }
        $job->addTask(
               (new Task('convert', 'pdf-to-png'))
                 ->set('input_format', 'pdf')
                 ->set('output_format', 'png')
                 ->set('engine', $pngengine)
                 ->set('input', [$src])
                 ->set('height', 1080)
                 ->set('alpha', false)
             )
           ->addTask(
               (new Task('export/url', 'download-png'))
                 ->set('input', ["pdf-to-png"])
                 ->set('inline', false)
                 ->set('archive_multiple_files', false)
             );

    case "jpg":
        $src = "import-file";
        $job = (new Job())
           ->setTag('AP.JPG.'.$job_name)
           ->addTask(
               (new Task('import/upload', 'import-file'))
             );
        if ($input_format !== "pdf") {
          $job->addTask($convertToPdf);
          $src = "convert-to-pdf";
        }
        $job->addTask(
               (new Task('convert', 'pdf-to-jpg'))
                 ->set('input_format', 'pdf')
                 ->set('output_format', 'jpg')
                 ->set('engine', $jpgengine)
                 ->set('input', [$src])
                 ->set('height', 1080)
                 ->set('quality', 90)
             )
           ->addTask(
               (new Task('export/url', 'download-jpg'))
                 ->set('input', ["pdf-to-jpg"])
                 ->set('inline', false)
                 ->set('archive_multiple_files', false)
             );

}

$cloudconvert->jobs()->create($job);

// upload source
$uploadTask = $job->getTasks()->name('import-file')[0];

// if ($kloud) {
//   // $uploadTask = $job->getTasks()->name('import-file')[0];
//   // $uploadTask->set('headers', $additionalParameters);
//   // $uploadTask->set('url', $upload_path);
//   // $uploadTask->set('filename',$input_file);
//   $opts = array(
//     'http'=>array(
//       'method'=>"GET",
//       'header'=>"APIKey: " . KLOUDLESS_APIKEY . "\r\n"
//     )
//   );
//   $context = stream_context_create($opts);
//   $cloudconvert->tasks()->upload($uploadTask, fopen($upload_path, 'r', false, $context));
// } else {
  $cloudconvert->tasks()->upload($uploadTask, fopen($upload_path, 'r'));
// }

// wait for conversion

$cloudconvert->jobs()->wait($job);

// download result

foreach ($job->getExportUrls() as $file) {
    $filename = is_null($output_extension) ? $file->filename : $job_name . '.' . $output_extension;
    $source = $cloudconvert->getHttpTransport()->download($file->url)->detach();
    $dest = fopen($project_folder . '/' . $filename, 'w'); // $file->filename
    stream_copy_to_stream($source, $dest);
    $result["files"][] = $filename;
}

// notify the calling process
echo json_encode($result,JSON_NUMERIC_CHECK);
