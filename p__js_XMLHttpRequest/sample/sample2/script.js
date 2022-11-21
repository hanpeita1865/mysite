let ajax = new XMLHttpRequest();
 
ajax.open("get", "files/test.txt");
ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // JSONとしてヘッダーを指定。
ajax.setRequestHeader("Cache-Control", "no-cache"); //キャッシュの無効化
ajax.send(JSON.stringify('[0, 1, 2]')); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	console.log(this.response); // 通信結果を出力します。
}, false);