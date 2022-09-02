<?php
$delPath = '../pages/'.$_POST['post_delFolder'];

//フォルダが存在するか確認
if(file_exists($delPath)){
	// ディレクトリを削除
	remove_directory($delPath);

}else{
	echo '削除するフォルダがありません';
}

// 再帰的にディレクトリを削除する関数
function remove_directory($dir) {
    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
        // ファイルかディレクトリによって処理を分ける
        if (is_dir("$dir/$file")) {
            // ディレクトリなら再度同じ関数を呼び出す
            remove_directory("$dir/$file");
        } else {
            // ファイルなら削除
            unlink("$dir/$file");
        }
    }
    // 指定したディレクトリを削除
    return rmdir($dir);
}