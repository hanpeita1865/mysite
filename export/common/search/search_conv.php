<?php
    $word = htmlspecialchars($_REQUEST['word']);
    $cate = $_REQUEST['cate'];//検索対象カテゴリー
?>

<p id="search-number">「<?= $word ?>」の検索結果：<span id="word-num"></span>ページ</p>

<?php
    require_once "../../common/php/Parsedown.php"; //Parsedownを読み込み
    require_once "../../common/php/ParsedownExtra.php"; //Extraを読み込み

    if($cate=='all'){
        $cate = '*';
    }else{
        $cate = $cate.'_*';
    }

    $folder = glob('../../pages/p__'.$cate, GLOB_ONLYDIR);
    $pattern = '/'.$word.'/'.$case;


    foreach ($folder as $dir):

        $md = file_get_contents($dir.'/markdown.md'); //マークダウンの内容を変数に格納
        $md = preg_replace('/<script(.*?)>(.*?)<\/script>/ims', '&lt;script$1&gt;$2&lt;/script&gt;', $md);//scriptタグ文字変換
        $html = md2html($md);
        $text = strip_tags($html,"<pre><code>");//<pre><code>は残す

        $folderName = str_replace('../../pages/', '', $dir);//フォルダ名だけ取得

        //ページタイトル（試作）markdown.mdの先頭にあるpage-titleの値を、$ArrayTitleに格納。
        preg_match("/^\*\[page-title\]:\s*(.+)/", $md, $ArrayTitle);

        if(!empty($ArrayTitle[1])){
            $title = $ArrayTitle[1];//ページタイトル
        }else{
            $title = '';
        }

        $getWord = null;
        
        if(preg_match_all($pattern, $text, $getWord)):

            $sumWord = array_unique($getWord[0]);

            foreach ($sumWord as $value) {
                $patternDiff = '/'.$value.'/';
                $text = preg_replace($patternDiff, '<mark class="hilight">'.$value.'</mark>', $text);//検索文字にマークを付ける
            }              
            ?>

            <section>
                <h3><a href="<?= $dir ?>" ><?= $title ?><span>（<?= $folderName ?>）</span></a></h3>
                <div class="search-text">
                    <?= $text ?>
                </div>
            </section>
        <?php endif;

    endforeach;

    //マークダウン変換
    function md2html($md)
    {
        $Extra = new ParsedownExtra();
        $html = $Extra->text($md);

        return $html;
    }
?>