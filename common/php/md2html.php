<?php
require_once "Parsedown.php";//Parsedownを読み込み
require_once "ParsedownExtra.php";//Extraを読み込み

$md = file_get_contents("sample.md");//マークダウンの内容を変数に格納
$html = md2html($md);

print $html;

function md2html($md){
  $Extra = new ParsedownExtra();
  $html = $Extra->text($md);
  return $html;
}
?>