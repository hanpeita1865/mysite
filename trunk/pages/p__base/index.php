<?php
	require_once "../../common/php/Parsedown.php"; //Parsedownを読み込み
	require_once "../../common/php/ParsedownExtra.php"; //Extraを読み込み

	
	require '../../common/user_check.php';//ユーザー閲覧権限チェック


	$md = file_get_contents("markdown.md"); //マークダウンの内容を変数に格納

	//ページタイトル取得
	preg_match("/^\*\[page-title\]:\s*(.+)/", $md, $ArrayTitle);
	$title = $ArrayTitle[1];//ページタイトル

	//$md = preg_replace('/<script(.*?)>(.*?)<\/script>/ims', '&lt;script$1&gt;$2&lt;/script&gt;', $md);//scriptタグ文字変換

	$html = md2html($md);
	//$h2Num = substr_count($html, "<h2>");
	$h2Num = preg_match('/<h2(.*)>(.*)<\/h2>/',$html);

	function md2html($md)
	{
		$Extra = new ParsedownExtra();
		$html = $Extra->text($md);

		return $html;
	}

	$base_path = '../';

	//スクロールトップの値
	if(!isset($_REQUEST['scroll'])){
		$_REQUEST['scroll'] = 0;
	};
?>
<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?= $title ?></title>
	<link rel="stylesheet" href="../../css/bootstrap.min.css">
	<!--<link rel="stylesheet" href="../../css/highlight-origin.css">-->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css">
	<link rel='stylesheet' href='../../css/simplebar.css'>
	<link rel="stylesheet" href="../../css/fork-awesome.min.css">
	<link rel="stylesheet" href="../../css/modaal.css">
	<link rel="stylesheet" href="../../css/style.min.css">
</head>

<body>
	<header>
		<!--案件サイトのヘッダーを記入-->
	</header>
	<main>
		<div id="content" class="container-fluid">
			<?php require '../../common/side_menu.php'; //サイドメニュー ?>	
			<div id="body">
				<div class="menu-trigger" href="">
					<span></span>
					<span></span>
					<span></span>
				</div>

				<form action="../../common/update/index.php" method="post" id="edit-form">
					<input type="hidden" name="edit" id="edit" value="">
					<input type="hidden" name="folder" id="folder" value="">
					<input type="hidden" name="scroll" id="scroll" value="<?= $_REQUEST['scroll'] ?>">
					<input type="button" class="btn-edit" value="編集" title="PHP環境でのみ使用できます">
				</form>

				<h1 class="heading1"><span><?= $title ?></span></h1>
					<?php if(!$h2Num==0): ?>
						<div id="mokuji">
						</div>
					<?php endif; ?>

				<div id="text-markdown" class="text-markdown">
					<?=  $html //HTML表示?>
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
	<!--<script src="../../js/highlight.pack.js"></script>-->
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
	<script src='../../js/simplebar.min.js'></script>
	<script src='../../js/modaal.js'></script>
	<script src="../../js/script.js"></script>
	<script>
		hljs.initHighlightingOnLoad();
	</script>
</body>

</html>