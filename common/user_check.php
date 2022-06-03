<?php
if(empty($_SERVER['HTTP_REFERER'])){
    //echo '未定義';
    $motourl = '../p__base/';
}else{
    $motourl = $_SERVER['HTTP_REFERER'];//遷移元のURL
}

$ipAddress = $_SERVER["REMOTE_ADDR"];//取得したIPアドレス

$ipAddress = '10.203.1.68'; //取得したIPアドレス（仮）

$folderName = basename($_SERVER['REQUEST_URI']);//フォルダ名

//$folderName = 'p__morning';//取得したファルダ名（仮）

require '../../admin/database_pass.php';
$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);
//$pdo = new PDO('sqlite:../../db/database.sqlite3');

$sql_page=$pdo->prepare('select * from locklist where page=?');
$sql_page->execute([$folderName]);

$countPage=$sql_page->rowCount();

$sql_ip=$pdo->prepare('select * from admin_ip where ip_address=?');
$sql_ip->execute([$ipAddress]);

$countIp=$sql_ip->rowCount();

if($countPage!=0 && $countIp==0 ) {
    header('Location:'. $motourl);
    exit;
}
?>