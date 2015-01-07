<?php
date_default_timezone_set("America/New_York");
require("functions.php");
$ini = parse_ini_file("auth.ini");

$consumer_key = rawurlencode($ini['consumer_key']);
$consumer_secret = rawurlencode($ini['consumer_secret']);

//Bearer token credentials
$bsf = base64_encode($consumer_key . ":" . $consumer_secret);


$url = "https://api.twitter.com/oauth2/token";
$data = array("grant_type" => "client_credentials");
$options = array(
  "http" => array(
    "header" => "Authorization: Basic " . $bsf . "\r\n" .
                "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
    "method" => "POST",
    "content" => http_build_query($data)
  )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

logtxt($result);

$bearer_token = json_decode($result, true);
echon($bearer_token['access_token']);
?>
