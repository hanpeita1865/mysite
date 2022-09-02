<?php
if(empty($_SERVER['HTTP_REFERER'])){
    //echo '未定義';
    $motourl = '../p__base/';
}else{
    $motourl = $_SERVER['HTTP_REFERER'];//遷移元のURL
}

$ipAddress = $_SERVER["REMOTE_ADDR"];//取得したIPアドレス

//$ipAddress = '10.203.1.68'; //取得したIPアドレス（仮）

require '../../admin/database_pass.php';
$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);
//$pdo = new PDO('sqlite:../../db/database.sqlite3');

$sql_ip=$pdo->prepare('select * from admin_ip where ip_address=?');
$sql_ip->execute([$ipAddress]);

$countIp=$sql_ip->rowCount();

/*if($countIp!=0 ) {
	require 'edit_template.php';
}else{
	//echo '編集不可';
	header('Location:'. $motourl);
    exit;
}*/

try{
	//例外判定
	if( $countIp==0 ){
		throw new Exception('管理者以外は編集できません');
	}else{
		require 'edit_template.php';
	}

}catch(Exception $ex){
	echo $ex->getMessage();
	header('Location:'. $motourl);
    exit;
}

?>