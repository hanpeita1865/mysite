<?php
    $post_menu = $_POST['post_menu'];
    $post_reMenu = $_POST['post_reName'];
    $post_folder = $_POST['post_folder'];

    echo $post_folder;

    $menu = file_get_contents('../common/menu_list.php');

    //$menuRe = preg_replace('/(.*)'.$post_folder.'(.*)>'.$post_menu.'<(.*)/i',  '$1'.$post_folder.'$2>'.$post_reMenu.'<$3', $menu);

    $post_menu_esc = preg_quote( $post_menu , '/');//エスケープ処理

    $post_folder_esc = preg_quote( $post_folder , '/');//エスケープ処理

    $menuRe = preg_replace('/(.*)'.$post_folder_esc.'(.*)>'.$post_menu_esc.'<\/a>/i',  '$1'.$post_folder.'$2>'.$post_reMenu.'</a>', $menu);

    file_put_contents('../common/menu_list.php', $menuRe);

    //ページ内のタイトルを変更
    $md = file_get_contents('../pages/'.$post_folder.'/markdown.md'); //マークダウンの内容を変数に格納

    preg_match("/^\*\[page-title\]:\s*(.+)/", $md, $ArrayTitle);

    if(!empty($ArrayTitle[1])){
        $md = preg_replace("/^\*\[page-title\]:\s*(.+)/", '*[page-title]:'.$post_reMenu, $md);
        file_put_contents('../pages/'.$post_folder.'/markdown.md', $md);
    }else{
        file_put_contents('../pages/'.$post_folder.'/markdown.md', '*[page-title]:'.$post_reMenu."\n\n".$md);
    }


    echo 'メニュー名を「'.$post_reMenu.'」に変更しました。';

