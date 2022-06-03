<?php
    //$file = file_get_contents('../../pages/p__slim12-1/markdown.md');
    //var_dump($file);

    $dir = '../../pages/';
    $folder = glob('../../pages/*', GLOB_ONLYDIR);

    echo '<ul>';
    
    foreach ($folder as $dir) {

        $md = file_get_contents($dir.'/markdown.md'); //マークダウンの内容を変数に格納

        //ページタイトル記載試作
        preg_match("/^\*\[page-title\]:\s*(.+)/", $md, $ArrayTitle);

        var_dump($ArrayTitle);

        if(!empty($ArrayTitle[1])){
            $title = $ArrayTitle[1];//ページタイトル
        }else{
            $title = '';
        }
        
        echo '<li>'.$title.'</li>';
        echo '<li><span class="filename">'.$dir.'</span></li>';
    }

    echo '</ul>'
?>