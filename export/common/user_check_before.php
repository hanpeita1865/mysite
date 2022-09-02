<?php
//$url = htmlspecialchars($_SERVER['REQUEST_URI'], ENT_QUOTES, 'UTF-8');
$folderName = basename($_POST['href']);
$ipAddress = $_SERVER["REMOTE_ADDR"];//取得したIPアドレス

require '../admin/database_pass.php';
$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);
//$pdo = new PDO('sqlite:../../db/database.sqlite3');

$sql_page=$pdo->prepare('select * from locklist where page=?');
$sql_page->execute([$folderName]);

$countPage=$sql_page->rowCount();

$sql_ip=$pdo->prepare('select * from admin_ip where ip_address=?');
$sql_ip->execute([$ipAddress]);

$countIp=$sql_ip->rowCount();

if($countPage!=0 && $countIp==0 ) {
    echo '遷移不可';
}else{
    echo '遷移OK';
    header('Location:'. $_POST['href']);
}
?>