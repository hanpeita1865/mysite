<?php
$newFolder = $_POST['post_newFolder'];
$empId = $_POST['post_empId'];

require 'folder_list.php';

if(in_array($newFolder, $folder)) {
    echo $newFolder.'ファルダは既に存在します。別のファルダ名にして下さい。';
}else{
    mkdir('../pages/'.$newFolder);
    mkdir('../pages/'.$newFolder.'/upload');
    copy('../template/index.php', '../pages/'.$newFolder.'/index.php');
    copy('../template/markdown.md', '../pages/'.$newFolder.'/markdown.md');

    $newMenu = '<li id="'.$empId.'" draggable="true">'."\n".'<a href="../'.$newFolder.'/" title="ダブルクリックするとメニュー名を変更できます。">メニュー名</a>'."\n".'</li>'."\n";

    file_put_contents('../common/menu_list.php', $newMenu,  FILE_APPEND | LOCK_EX);

    echo 'フォルダを新規作成しました。';
}