<?php
$delPath = '../pages/'.$_POST['post_delFolder'];

//フォルダが存在するか確認
if(file_exists($delPath)){

	unlink($delPath.'/markdown.md');
	unlink($delPath.'/index.php');

	if(file_exists($delPath.'/upload')){//uploadフォルダがあるか確認

		$fileList = glob($delPath.'/upload/*');//grob関数を使って、uploadフォルダのファイルのパスを配列変数に格納

		$num = count($fileList);//ファイルの数

		for($i = 0; $i < $num; $i++) {//upload内のファイルを削除
			unlink($fileList[$i]);
		}

		rmdir($delPath.'/upload');//uploadフォルダを削除

	}

	rmdir($delPath);//フォルダを削除

}else{
	echo '削除するフォルダがありません';
}