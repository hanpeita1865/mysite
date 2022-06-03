<?php
    $post_menu = $_POST['post_menu'];

    $post_menu = str_replace("\r\n", '', $post_menu);//空白行削除

    $menuList = preg_replace('/<button(.*)>(.*)<\/button>/', '', $post_menu);

    $menuList = preg_replace('/<span class="link-name">(.*)<\/span>/', '', $menuList);

    $menuList = preg_replace('/<ul class="sub-menu"><\/ul>/', '', $menuList);

    //<ul class="sub-menu"><li class="dummy"></li></ul>
    $menuList = preg_replace('/<ul class="sub-menu"><li class="dummy"><\/li><\/ul>/', '', $menuList);

    $menuList = preg_replace('/<ul class="emp-ul sub-menu"><li class="emp-list">ここにメニューを挿入<\/li><\/ul>/', '', $menuList);

    $menuList = preg_replace('/<ul class="sub-menu"><li class="dummy"><\/li><\/ul>/', '', $menuList);

    $menuList = preg_replace('/<li class="dummy"><\/li>/', '', $menuList);

    $menuList = preg_replace('/ title="ダブルクリックするとメニュー名を変更できます。"/', '', $menuList);

    $menuList = str_replace(' style=""', '', $menuList);

    $menuList = str_replace(' class="emp"', '', $menuList);

    $menuList = str_replace(' class="lock"', '', $menuList);

    $menuList = str_replace(' class=""', '', $menuList);

    file_put_contents("../common/menu_list.php", $menuList);
?>

