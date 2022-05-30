<?php

$database='from_now';
$user='staff';
$password='password';

$pdo=new PDO('mysql:host=localhost;dbname='.$database.';charset=utf8',$user, $password);

$sql=$pdo->prepare('select * from locklist where page=?');
$sql->execute([$_REQUEST['post_folder']]);

$lockCnt=$sql->rowCount();

if($lockCnt){
    //リストに有り（削除）
    $sql=$pdo->prepare('delete from locklist where page=?');
    if ($sql->execute([$_REQUEST['post_folder']])) {
        echo '削除に成功しました。';
    } else {
        echo '削除に失敗しました。';
    }

}else{
    //リストになし（追加）
    $sql=$pdo->prepare('insert into locklist values(null, ?)');
    if ($sql->execute([$_REQUEST['post_folder']])) {
        echo '追加に成功しました。';
    } else {
        echo '追加に失敗しました。';
    }
}

?>