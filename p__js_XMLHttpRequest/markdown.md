*[page-title]:XMLHttpRequest

『非同期通信』をするには最初に『<span class="green bold">XMLHttpRequest</span>』を元とするオブジェクトを新たに作る必要がありますので『<span class="green bold">new</span>』を使ってオブジェクトを生成します。以下のように記述します。

<p class="lang">-1-</p>
```
let ajax = new XMLHttpRequest();
```

これで上記の『非同期通信』に必要な処理の詰め込みが完了します。そしたらその中に『<span class="green bold">.open()</span>』ってメソッドが居るので、それを使って以下のように記述します。
<p class="lang">-2-</p>
```
let ajax = new XMLHttpRequest();
ajax.open("get", "./test.txt");
```

第1引数には「リクエスト(通信)する際のメソッド」を指定します。『GET』とか『POST』とかになります。上記はただテキストデータを読み取るだけなので『GET』になります。  
第2引数には通信先のパスを記述します。  
そして、この通信処理を走らせるには『<span class="green bold">.send()</span>』を記述します。
<p class="lang">-3-</p>
```
let ajax = new XMLHttpRequest();
 
ajax.open("get", "./test.txt");
ajax.send(); // 通信させます。
```

これで通信処理が走りましたが、通信しただけだとあんま意味がありません。その通信結果を受け取る処理を記述しないといけません。  
通信結果を受け取るにはどうするかというと『<span class="green bold">.addEventListener()</span>』を使います。以下のような感じになります。
<p class="lang">-4-</p>
```
let ajax = new XMLHttpRequest();
 
ajax.open("get", "./test.txt");
ajax.send(); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	// ここに処理書きます。
}, false);
```
これで肝心の通信結果はどうやって受け取るかというと『<span class="green bold">.addEventListener()</span>』の第2引数の関数内部で『<span class="green bold">this</span>』を使えばOKです。以下のような感じです。
<p class="lang">-5-</p>
```
let ajax = new XMLHttpRequest();
 
ajax.open("get", "./test.txt");
ajax.send(); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	console.log(this); // 通信結果を出力します。
}, false);
```

それで受け取った通信結果な『this』には色々と詰まっているわけなんですがその中で『<span class="green bold">this.response</span>』を使います。これを出力させるとこうなります。
<p class="lang">-6-</p>
```
let ajax = new XMLHttpRequest();
 
ajax.open("get", "./test.txt");
ajax.send(); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	console.log(this.response); // 通信結果を出力します。
}, false);
```

<a href="sample/sample1/" target="_blank">完成サンプル</a>

text.txtを読み込んで、ファイルの文字「テキストファイルです。」がコンソールにと表示されます。

### POSTで送信

```
var ajax = new XMLHttpRequest();
 
ajax.open("post", "./test.txt");
ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // JSONとしてヘッダーを指定。
ajax.setRequestHeader("Cache-Control", "no-cache"); //キャッシュの無効化
ajax.send(JSON.stringify('[0, 1, 2]')); // 通信させます。
ajax.addEventListener("load", function(){ // loadイベントを登録します。
	console.log(this.response); // 通信結果を出力します。
}, false);
```

XMLHttpRequestで送信するデータの文字コードはUTF-8で行われるようですが、送信先のColdFusion側では送信元を限定して処理しているわけではないため、送信元からエンコードの指定がない場合には「Javaのデフォルトエンコーディング」を使用して文字を取り扱います。日本語版Windows環境では、「Javaのデフォルトエンコーディング」は MS932(Shift_JIS）となりますので、UTF-8 で送信されたデータを MS932(Shift_JIS)で受け取るために文字化けを起こします。

この状況に遭遇した際は、送信元の XMLHttpRequest の setRequestHeaderで「Content-Type」を指定している値に charsetを付加することで、送信先のColdFusionで文字コードを認識でき、文字化けを解消することができます。

#### キャッシュの無効化
setRequestHeader()で、キャッシュ制御のためのヘッダを送信する。  
ヘッダーに下記を記述する。
```
〇〇.setRequestHeader('Cache-Control', 'no-cache'); 
```