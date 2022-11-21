<?php
	// POSTされたJSON文字列を取り出し
	$json = file_get_contents("php://input");

	// JSON文字列をobjectに変換
	//   ⇒ 第2引数をtrueにしないとハマるので注意
	$contents = json_decode($json, true);

	//受け取ったデータを配列に格納
	$return_array = [$contents['name'], $contents['login']];

	//「$return_array」をjson_encodeして出力
	echo json_encode($return_array);
?>