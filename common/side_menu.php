<?php

if (isset($_REQUEST['case'])) {
	//大文字・小文字の両方　パラメータにcaseあり　チェック有り
	//echo('区別なし');
	$case='i';
	$check = 'checked';
}else{
	//大文字・小文字の片方のみ　パラメータcaseなし　チェックなし
	//echo('区別ある');
	$case='';
	$check = '';
}

$database='from_now';
$user='staff';
$password='password';

$ipAddress = $_SERVER["REMOTE_ADDR"];//取得したIPアドレス
$ipAddress = '10.203.1.68'; //取得したIPアドレス（仮）

$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);

$sql_ip=$pdo->prepare('select * from admin_ip where ip_address=?');
$sql_ip->execute([$ipAddress]);
$countIp=$sql_ip->rowCount();

?>

<script>
//閲覧不可ページ
let lockArray = [
<?php foreach ($pdo->query('select * from locklist') as $row): ?>
	'<?= $row['page'] ?>',
<?php endforeach; ?>
];
let unlock = <?= $countIp ?>;
</script>

<nav id="sidebar" class="">
	<div id="header-wrapper">
		<form action="../../common/search/index.php" method="get" id="search">
		<!--<form id="search">-->
			<div class="keyword">
				<input type="text" name="word" placeholder="全ページ検索">
				<input class="btn-search" type="submit" value="検索">
			</div>
			<fieldset class="type-check">
				<input type="checkbox" id="word-case" name="case" <?= $check ?>>
				<label for="word-case">英大文字・小文字の区別なし</label>
			</fieldset>
		</form>
	</div>
	<div id="menu-wrap">
		<ul id="menu" class="side-link">
			<?php require 'menu_list.php' ?>
		</ul>
	</div>
</nav>