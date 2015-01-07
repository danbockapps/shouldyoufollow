<?php
date_default_timezone_set("America/New_York");
require("functions.php");
$ini = parse_ini_file("auth.ini");
$debug = false;

$contents = file_get_contents("php://input");
logtxt($contents);
$post = json_decode($contents, true);


$ch = curl_init();
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json?" . http_build_query(
  array(
    "screen_name" => $_GET["screen_name"],
    "count" => 20,
    "trim_user" => 1,
    "exclude_replies" => 1,
    "include_rts" => "false"
  )
);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  'Authorization: Bearer ' . $ini['bearer_token']
));

if($debug)
  curl_setopt($ch, CURLINFO_HEADER_OUT, true);

$data = curl_exec($ch);

if($debug)
  echon(curl_getinfo($ch, CURLINFO_HEADER_OUT));

curl_close($ch);
exit($data);
?>
