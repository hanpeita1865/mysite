<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?= $_POST['edit'] ?> ～編集画面～｜</title>
	<link rel="stylesheet" href="../../css/bootstrap.min.css">
	<link rel="stylesheet" href="../../css/fork-awesome.min.css">
	<link rel="stylesheet" href="../../css/style.css">
	<script src="../../js/jquery.min.js"></script>
</head>

<body>
	<main>
		<div class="container" id="update">
			<h1><?= $_POST['edit'] ?> ～編集画面～</h1>

			<!--プレビュー用フォーム-->
			<form id="form-preview" class="extlink1" target="newtab" action="preview.php" method="POST">
				<!--ページ名-->
				<input type="hidden" name="pagename-p" id="pagename-p" value="<?= $_REQUEST['edit'] ?>">
				<!--記事-->
				<input type="hidden" name="report-p" id="report-p" value=""> 
				<!--フォルダ名-->
				<input type="hidden" name="folder-p" id="folder-p" value="<?= $_REQUEST['folder'] ?>">
			</form>

			<!--プレビューボタン-->
			<div class="btn-tag-box">
				<input type="button" id="btn-preview" class="btn-preview" value="プレビュー">
			</div>


			<textarea name="markdown" id="report-markdown"></textarea>
			<link rel="stylesheet" href="../../css/simplemde.min.css">
			<script src="../../js/simplemde.min.js"></script>
			<script>
				var markPath = '../../pages/<?= $_POST['folder'] ?>/markdown.md';
				//ファイルの読み込み
				$.ajax({
					url: markPath,
					type: 'GET',
					dataType: 'html',
					cache: false
				}).done(function(data) {
					$('#report-markdown').val(data); //テキストエリアに記事を挿入
					<?php
						$mark_script = file_get_contents('../../js/simplemde-option.js');
						echo $mark_script;
					?>
					
					let startReport = $('#report-markdown').val();//テキストエリアの編集前のデータ
					let howUpdate;

					//ページに戻る前の編集したかチェック
					$('.btn-return').on('click',function(){
						let report = $('#report-markdown').val();
						howUpdate = 'return';
						
						if(startReport!=report){
							if(window.confirm('編集内容は保存しますか?')){
								file_submit(howUpdate);
								startReport = $('#report-markdown').val();
							}
						}
					});
					
					$('#upload').on('click', function(){
						howUpdate = 'click';
						file_submit(howUpdate);
						startReport = $('#report-markdown').val();
					});

					$(window).keydown(function (e) {
						howUpdate = 'key';

						if (e.ctrlKey) {
							//編集保存（Ctrl+S）
							if (e.keyCode === 83) {
								file_submit(howUpdate);
								startReport = $('#report-markdown').val();
								return false;
							}
						}
					});
				});

			</script>
			<div class="d-flex justify-content-between">
				<!--プレビューボタン-->
				<div class="btn-tag-box">
					<input type="button" id="btn-preview" class="btn-preview" value="プレビュー">
				</div>
				<!--編集更新ボタン-->
				<input type="button" value="編集更新" class="btn-upload mb-5 mt-2" id="upload">
			</div>

			<form action="../../pages/<?= $_REQUEST['folder'] ?>/" method="post" id="return-form">
				<input type="hidden" name="scroll" id="scroll" value="<?= $_REQUEST['scroll'] ?>">
				<input type="submit" class="btn-return" value="ページに戻る">
			</form>

			<!-- ファイル登録用ボックス -->
			<div id="file-area">
				<h2>ファイルの登録</h2>
				<p class="mt-1">フォルダに格納したいファイルがあれば、ボックスをクリックするかドラッグ&amp;ドロップしてください。<br>
					（1枚の容量<strong>1.99MB以下</strong> 、登録は1ファイルずつでしかできません。）<br>
					挿入ボタンを押すと、記事のカーソルの位置にコードが記入されます。</p>
				<div>
					
					<p>保存ファイル一覧</p>
					<ul id="waitingList">
					<!-- 保存ファイルのリストを表示 -->
					<?php
	
					//更新日付順表示
					$sort_by_lastmod = function($a, $b) {
						return  filemtime($a) - filemtime($b);
					};

					$files = glob( '../../pages/'.$_POST['folder'].'/upload/*' );
					usort( $files, $sort_by_lastmod );

					foreach ($files as $item) {
						$file_name = basename($item);//ファイル名だけを抜き出す
						$fileClass ='';
						$photo = false;

						  switch (1) {
							//エクセル
							case preg_match('/.xlsx$|.xls$|.xlsm$|.xlsb$|.xltx$|.xltm$|.xlt$|.xls$|.xml$|.xml$|.xlam$|.xla$|.xlw$|.xlr$/',$file_name):
							  $fileClass = 'file_icon excel-icon';
							  break;
							//テキスト
							case preg_match('/.txt$/',$file_name):
							  $fileClass = 'file_icon text-icon';
							  break;
							//ワード
							case preg_match('/.doc$|.docm$|.docx$|.dot$|.dotx$/',$file_name):
							  $fileClass = 'file_icon word-icon';
							  break;
							//パワーポイント
							case preg_match('/.pptx$/',$file_name):
							  $fileClass = 'file_icon pptx-icon';
							  break;
							//zipファイル
							case preg_match('/.zip$/',$file_name):
							  $fileClass = 'file_icon zip-icon';
							  break;
							//PDFファイル
							case preg_match('/.pdf$/',$file_name):
							  $fileClass = 'file_icon pdf-icon';
							  break;
							//画像
							case preg_match('/.png$|.PNG$|.jpg$|.jpeg$|.JPG$|.JPEG$|..svg$|.svgz$|.gif$/',$file_name):
							  $fileClass = 'file_icon pdf-icon';
							  $photo = true;
							  break;
						  }
						
						if(!$photo == true){
							echo '<li class="file-list"><span class="filename '.$fileClass.'">'.$file_name.'</span><button class="fileDelete">削除</button><button class="fileInsert">挿入</button></li>';
						}else{
							echo '<li class="photo-list"><span class="filename">'.$file_name.'</span><img src="../../pages/'.$_POST["folder"].'/upload/'.$file_name.'" alt=""><button class="fileDelete">削除</button><button class="fileInsert">挿入</button></li>';
						}
					}
					?>
					</ul>
					
					<input type="file" name="clickFile" id="file" class="d-none">
					<label id="DnDBox" for="file">
						クリックするか<br>ここに1ファイルずつファイルをドラッグ&amp;ドロップしてください<br>
					</label>
				</div>
			</div>
		</div>
	</main>
	<script src="form-markdown.js"></script>
	<!--<script src="../../js/drop-drag.js"></script>-->
</body>

</html>
