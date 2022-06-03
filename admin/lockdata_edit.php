<?php

require 'database_pass.php';

$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);

$sql=$pdo->prepare('select * from locklist where page=?');
$sql->execute([$_POST['post_folder']]);

$lockCnt=$sql->rowCount();

if($lockCnt){

    $result = $sql->fetch(PDO::FETCH_ASSOC); 

    $sql=$pdo->prepare('update locklist set page=? where id_lock=?');
    if($sql->execute([$_POST['post_reName'], $result['id_lock']])){
        echo '変更しました。';
    }else{
        echo '修正に失敗しました。';
    }
}

?>