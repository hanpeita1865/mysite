<?php
    $post_menu = $_POST['post_menu'];
    $post_reMenu = $_POST['post_reName'];
    $post_folder = $_POST['post_folder'];

    $menu = file_get_contents('../common/menu_list.php');

    $menuRe = preg_replace('/(.*)'.$post_folder.'(.*)>'.$post_menu.'<(.*)/i',  '$1'.$post_folder.'$2>'.$post_reMenu.'<$3', $menu);

    file_put_contents('../common/menu_list.php', $menuRe);

    echo 'メニュー名を「'.$post_reMenu.'」に変更しました。';

