<?php
$base_path = '../';

$database='from_now';
$user='staff';
$password='password';

$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);
?>

<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>管理画面｜</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/fork-awesome.min.css">
	<!--<link rel="stylesheet" href="../css/style.css">-->
    <link rel="stylesheet" href="../css/admin.css">
	<script src="../js/jquery.min.js"></script>
	<script>
	//閲覧不可ページ
	let lockArray = [
	<?php foreach ($pdo->query('select * from locklist') as $row): ?>
		'<?= $row['page'] ?>',
	<?php endforeach; ?>
	];
	</script>
</head>

<body>
	<main>
		<div class="container">
			<h1>管理画面</h1>
			<ol>
				<li>メニューをドラック&amp;ドロップすると、並べ替えができます。</li>
				<li>メニュー名のリンクをダブルクリックすれば、メニュー名を変更できます。</li>
				<li>メニューをダブルクリックをすると空のサブメニュー用ボックスが作成されるので、そこにメニューをドラッグしてください。<br>
				ただしダブルクリックで作成できるサブメニューは、第二階層までです。</li>
				<li>並べ替えの変更を反映するには、右下の「<strong>並べ替え確定</strong>」ボタンを押してください。<br>
			（確定する前にブラウザを更新すると、元に戻るので注意してください。）</li>
			</ol>
			<div class="sub-close-area">
				<button class="btn-sub-close">全サブメニュー開閉</button>
			</div>
			<ul id="menu" class="side-link">
            	<?php require '../common/menu_list.php' ?>
			</ul>
			<div class="sub-close-area">
				<button class="btn-sub-close">全サブメニュー開閉</button>
			</div>
            <div class="d-flex justify-content-between mb-5">
				<input type="button" value="新規フォルダ作成" class="btn-create" id="create">	
                <input type="button" value="設定確定" class="btn-confirm" id="confirm">
            </div>
    </main>
	<script src="../js/admin.js"></script>  
</body>

</html>