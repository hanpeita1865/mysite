<?php
	// //ajax送信でPOSTされたデータを受け取る
	// $post_data_1 = $_POST['id'];
	// $post_data_2 = $_POST['user_name'];

	// //受け取ったデータを配列に格納
	// $return_array = [$post_data_1, $post_data_2];


	// //「$return_array」をjson_encodeして出力
	// echo json_encode($return_array);

	// POSTされたJSON文字列を取り出し
	$json = file_get_contents("php://input");

	// JSON文字列をobjectに変換
	//   ⇒ 第2引数をtrueにしないとハマるので注意
	$contents = json_decode($json, true);

	// デバッグ用にダンプ
	var_dump($contents);
?>