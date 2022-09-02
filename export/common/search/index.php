<?php
$base_path = '../../pages/';
?>

<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>検索結果 | やることまとめ</title>
	<link rel="stylesheet" href="../../css/bootstrap.min.css">
	<link rel="stylesheet" href="../../css/monokai-sublime.css">
	<link rel='stylesheet' href='../../css/simplebar.css'>
	<link rel="stylesheet" href="../../css/fork-awesome.min.css">
	<link rel="stylesheet" href="../../css/style.css">
</head>

<body class="search">
	<header>
		<!--案件サイトのヘッダーを記入-->
	</header>
	<main>
		<div class="container-fluid">
			<?php require '../side_menu.php';//サイドメニュー ?>
			<div id="body" class="">
				<div id="text-markdown" class="search-result">
					<!-- マークダウンのコードを変換して、ここに挿入 -->
					<?php 
					if(!empty($_REQUEST['word'])){
						require 'search_conv.php'; 
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
	<script src="../../js/marked.js"></script>
	<script src="../../js/highlight.pack.js"></script>
	<script src='../../js/simplebar.min.js'></script>
	<script src='../../js/modaal.js'></script>
	<script src="../../js/script.js"></script>
	<script src="../../js/search.js"></script>
</body>

</html>