<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title> | やることまとめ</title>
	<link rel="stylesheet" href="../../css/bootstrap.min.css">
	<!--<link rel="stylesheet" href="../css/monokai-sublime.css">-->
	<!--ハイライトの背景色 黒-->
	<link rel="stylesheet" href="../../css/highlight-origin.css">
	<!--ハイライトの背景色 白-->
	<!--<link rel="stylesheet" href="../css/default.css">--><!--ハイライトデフォルト-->
	<link rel='stylesheet' href='../../css/simplebar.css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
	<link rel="stylesheet" href="../../css/style.css">
</head>

<body>
	<header>
		<!--案件サイトのヘッダーを記入-->
	</header>
	<main class="preview">
		<div id="content" class="container-fluid">
		<nav id="sidebar">
			<p>プレビュー</p>
			<div id="menu-wrap">
				<ul id="menu" class="side-link">
				</ul>
			</div>
		</nav>
			<div id="body" class="">
				<h1 id="title-p" class="heading1"><span><?= $_REQUEST['pagename-p'] ?></span></h1>
				<!--<fieldset class="page-keyword">
					<input type="hidden" id="page-case" name="case" value="true">
					<input type="text" id="page-word" placeholder="ページ内検索">
					<input type="button" id="search-before" value="前">
					<input type="button" id="search-next" value="次">
				</fieldset>-->
				<div id="text-markdown" class="text-markdown">
				<!-- マークダウンのコードを変換して、ここに挿入 -->
				<?php
					require_once "../php/Parsedown.php";//Parsedownを読み込み
					require_once "../php/ParsedownExtra.php";//Extraを読み込み

					//$md = file_get_contents("markdown.md");//マークダウンの内容を変数に格納
					$report = $_REQUEST['report-p'];//記事原文

					//$report = preg_replace('/<script(.*?)>(.*?)<\/script>/ims', '&lt;script$1&gt;$2&lt;/script&gt;', $report);//scriptタグ文字変換
					//$report = preg_replace('/<body(.*?)>(.*?)<\/body>/ims', '&lt;body$1&gt;$2&lt;/body&gt;', $report);//bodyタグ文字変換
					//$report = preg_replace('/<html(.*?)>(.*?)<\/html>/ims', '&lt;html$1&gt;$2&lt;/html&gt;', $report);//htmlタグ文字変換
					//$report = preg_replace('/<head(.*?)>(.*?)<\/head>/ims', '&lt;head$1&gt;$2&lt;/head&gt;', $report);//headタグ文字変換
					//$report = preg_replace('/<meta(.*?)>(.*?)<\/meta>/ims', '&lt;meta$1&gt;$2&lt;/meta&gt;', $report);//metaタグ文字変換
					//$report = preg_replace('/<link(.*?)>(.*?)<\/link>/ims', '&lt;link$1&gt;$2&lt;/link&gt;', $report);//linkタグ文字変換

                    $html = md2html($report);

					print $html;//HTML表示

					function md2html($md){
						$Extra = new ParsedownExtra();
						$html = $Extra->text($md);
						return $html;
					}
				?>

				</div>
				<!--パーツページ用のトップへ戻るボタンは、必要なければ削除する -->
				<p id="parts-pagetop">
					<a href="#top"><span class="sr-only">このページの先頭へ</span></a>
				</p>
			</div>
		</div>
	</main>
	<footer>
		<!--案件サイトのフッターを記入-->
	</footer>
	<script src="../../js/jquery.min.js"></script>
	<script src="../../js/bootstrap.bundle.min.js"></script>
	<!--<script src="../js/marked.js"></script>-->
	<script src="../../js/highlight.pack.js"></script>
	<script src='../../js/simplebar.min.js'></script>
	<script src="../../js/script.js"></script>
	<script>
		$(function () {
			//コードをハイライト
			$('pre').each(function (i, block) {
				if ($(this).children('code').length) {
					hljs.highlightBlock(block);
				}
			});

			//画像のパス変更
			$('#text-markdown img').each(function() {
				let src = $(this).attr('src');
				$(this).attr('src', '../../pages/<?= $_REQUEST["folder-p"] ?>/' + src);
				//figureWrap($(this));
			});

			$('#text-markdown a').each(function() {
				let href = $(this).attr('href');
				if( /^(?!.*(^http:|^https:)).+$/.test(href)){
					$(this).attr('href', '../../pages/<?= $_REQUEST["folder-p"] ?>/' + href);
				}
			});
			
			//ページトップボタン
			//初期は非表示
			$("#parts-pagetop").hide();

			$(window).scroll(function () {
				//140pxスクロールしたら
				if ($(this).scrollTop() > 140) {
					//フェードインで表示
					$('#parts-pagetop').fadeIn();
				} else {
					//フェードアウトで非表示
					$('#parts-pagetop').fadeOut();
				}
			});

			function figureWrap(e) {
				var clsName = e.closest('div').prop('class');

				if( /^photo/.test(clsName) && e.closest('a').length == 0) {
					if(e.parent()[0].tagName=='P') {
						e.unwrap();
					}
					e.wrap('<figure>');

				} else if(/^photo/.test(clsName) && e.closest('a').length > 0) {
					if(e.parents('a').parent()[0].tagName=='P') {
						e.parents('a').unwrap();
					}
					e.parent('a').wrap('<figure>');

				} else if(e.closest('a').length == 0) {
					if(e.parent()[0].tagName=='P') {
						e.unwrap();
					}
					e.wrap('<figure>');


				} else if(e.closest('a').length > 0) {
					if(e.parents('a').parent()[0].tagName=='P') {
						e.parents('a').unwrap();
					}
					e.wrap('<figure>');

				}
			}
		});
	</script>
</body>

</html>