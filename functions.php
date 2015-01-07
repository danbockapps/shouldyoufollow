<?php
function logtxt($string) {
  file_put_contents(
    "log.txt",
    date("Y-m-d G:i:s") . " " . $string . "\n",
    FILE_APPEND
  );
}

function echon($s) {
  echo $s . "\n";
}
?>
