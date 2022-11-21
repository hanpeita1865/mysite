let ajax = new XMLHttpRequest();
 
ajax.open("get", "files/test.txt");
ajax.send(); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	console.log(this.response); // 通信結果を出力します。
}, false);