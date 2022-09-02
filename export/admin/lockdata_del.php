<?php
require 'database_pass.php';

$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);

$sql=$pdo->prepare('select * from locklist where page=?');
$sql->execute([$_POST['post_delFolder']]);

$lockCnt=$sql->rowCount();

if($lockCnt){
    //リストに有り（削除）
    $sql=$pdo->prepare('delete from locklist where page=?');
    if ($sql->execute([$_POST['post_delFolder']])) {
        echo '削除に成功しました。';
    } else {
        echo '削除に失敗しました。';
    }

}
?>