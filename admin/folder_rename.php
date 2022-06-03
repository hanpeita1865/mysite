<?php
$post_folder = $_POST['post_folder'];
$post_reName = $_POST['post_reName'];

require 'folder_list.php';

if(in_array($post_reName, $folder)) {
    echo $post_reName.'ファルダは既に存在します。別のファルダ名にして下さい。';
}else{
	//フォルダ名変更
    rename( '../pages/'.$post_folder, '../pages/'.$post_reName );
	//メニューのhrefのフォルダ名を変更
	$menu = file_get_contents('../common/menu_list.php');
	$re_Menu = str_replace($post_folder.'/"', $post_reName.'/"', $menu);
	file_put_contents('../common/menu_list.php', $re_Menu);

     echo 'フォルダ名を「'.$post_reName.'」に変更しました。';

}