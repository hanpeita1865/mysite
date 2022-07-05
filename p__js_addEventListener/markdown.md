*[page-title]:addEventListener イベント処理

「addEventListener()」は、JavaScriptからさまざまなイベント処理を実行することができるメソッドになります。

## 基本的な構文と書き方について

一般的には、イベントの「種類」と処理を実行するための「関数」を指定することになります。
<p class="tmp"><span>書式1</span></p>
```
対象要素.addEventListener( 種類, 関数, false )
```
* 第1引数にイベントの種類を指定することで、このイベントがどのようなケースに対応するのかを特定します。
* 第2引数に関数を指定することで、任意のイベントが発生した時に関数内に書かれた処理を実行できるわけです。
* 第3引数は、イベント伝搬の方式を「true / false」で指定するのですが通常はfalseを指定しておきましょう。


## 3種類の関数設定方法について

「addEventListener()」を記述する方法として、3種類の関数を設定する書き方があります。

1つ目は、**外部の関数を設定**する方法です。  
この方法は、「sampleEvent()」という関数をイベント処理の外側で定義しているのがポイントです。関数内の処理が複雑であったり、ファイルが複数に分割されている場合などに使われるのが一般的です。
<p class="tmp"><span>書式2-1</span></p>
```
対象要素.addEventListener(種類, sampleEvent, false);
 
function sampleEvent() {
  
  //ここに処理を記述する
  
}
```

2つ目は、**無名関数を設定**する方法です。
<p class="tmp"><span>書式2-2</span></p>
```
対象要素.addEventListener(種類, function() {
  
  //ここに処理を記述する
  
}, false);
```
この方法が一般的によく使われる書き方になるでしょう。特徴としては、第2引数へそのまま関数を記述しているのがポイントです。単純な処理しか記述しないようなケースでは、関数を別で用意するよりもコードが分かりやすくなります。


3つ目は、**アロー関数を設定**する方法です。

<p class="tmp"><span>書式2-3</span></p>
```
対象要素.addEventListener(種類, () => {
  
  //ここに処理を記述する
  
});
```
こちらは、先ほどの無名関数をES2015の書き方にしたパターンなので、特徴的には同じになります。


### 「click」によるクリックイベント処理の作り方

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	ボタンをクリックしたら、イベント処理が発動して関数が実行されます。
	<iframe width="100%" height="300" src="//jsfiddle.net/m2ansjh1/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


## イベントリスナーの一覧表

「addEventListener()」のイベントの種類はたくさん用意されていますが、一般的には以下の表にあるものがよく使われます。

|イベント種類|内容|
|--|--|
|load	|Webページの読み込みが完了した時に発動（画像などのリソースすべて含む）|
|DOMContentLoaded	|Webページが読み込みが完了した時に発動（画像などのリソースは含まない）|
|click	|マウスボタンをクリックした時に発動|
|mousedown	|マウスボタンを押している時に発動|
|mouseup	|マウスボタンを離したときに発動|
|mousemove	|マウスカーソルが移動した時に発動|
|keydown	|キーボードのキーを押したときに発動|
|keyup	|キーボードのキーを離したときに発動|
|keypress	|キーボードのキーを押している時に発動|
|change	|フォーム部品の状態が変更された時に発動|
|submmit	|フォームのsubmitボタンを押したときに発動|
|scroll	|画面がスクロールした時に発動|
この表にある「イベントの種類」は、addEventListener()の第1引数に設定できるものになります。


### 「change」によるイベント処理
フォーム部品の状態を管理するときによく使われるイベント種類として「change」があります。「change」は、例えばラジオボタンがチェックされた時や文字列が入力されたあとなどにイベントが発動します。

<div class="exp">
	<p class="tmp"><span>例2</span></p>
	テキストボックスに文字を入力すると、イベント処理が発動して関数が実行されます。
	<iframe width="100%" height="300" src="//jsfiddle.net/zb4mkxLj/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

フォーム部品のname属性は「document.forms」から取得できるので、まずは入力ボックスの要素を取得します。そこにaddEventListener()を使って「change」イベントを実行しているのが分かります。

これにより、入力ボックスに何か文字列を入力してフォーカスを外すとコンソールに指定した文字列が出力されます。


### 「keydown / keyup」によるイベント処理

キーボードのキー入力に関するイベントとして「keydown / keyup」がありますす。これはキーボードの「キー」を押したときや離した時に発動するイベントになります。

<div class="exp">
	<p class="tmp"><span>例3</span></p>
キーボードのキーを押すとそのキーに割り当てられている「キーコード」をコンソールに出力します。これは、関数の引数でイベントオブジェクトを使って「keyCode」プロパティから取得できます。
<a href="sample/sample(keydown)/" target="_blank">新規タブ</a>
<iframe width="100%" height="300" src="//jsfiddle.net/jqosr7ay/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

    
### 「DOMContentLoaded」によるイベント処理
    
Webページが読み込まれた瞬間に発動するイベント処理について見ていきましょう！　よく使われるイベント種類としては、「load」「DOMContentLoaded」の2種類があります。「load」はWebページを構成する画像などのリソースがすべて読み込まれた時点で発動します。

しかし、「DOMContentLoaded」はHTMLを構成するDOMが形成された瞬間に発動するので高速なのです。次のサンプル例を見てください！
 
<div class="exp">
	<p class="tmp"><span>例4</span></p>
	Webページが読み込まれてすぐにコンソールへ文字列が出力されます。例えば、JavaScriptから何らかのHTML要素を制御するようなケースで、すぐに実行したい場合などに有効でしょう。<br>
逆に、画像のサイズを取得するなどリソースを必要とする場合には「load」を使うようにしましょう！
<iframe width="100%" height="300" src="//jsfiddle.net/pjyrLvqx/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>
    
    
### イベント処理の上書きについて

これまで「addEventListener()」の使い方について学んできましたが、実は大きな特徴が1つあります。それは、イベント処理が上書きされないということです！

つまり、addEventListener()を使ったイベント処理は、複数のイベントを追加することで同時に実行できるわけです。これを証明するために、2つの簡単な関数を用意しました。

<div class="exp">
	<p class="tmp"><span>例5</span></p>
	「sampleEvent()」をHTML要素に「onclick属性」を設定してますが、JavaScript側で「onclick属性」にnewEvent()を実行するように再設定してみます。そうすると、実行するとイベント処理が上書きされて「newEvent()」だけが実行されます。
	<iframe width="100%" height="300" src="//jsfiddle.net/sdtL8e17/3/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

そこで、まったく同じことを「addEventListener()」で再現してみます。

<div class="exp">
	<p class="tmp"><span>例6</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/sg97erk2/3/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

実行結果を見ると、両方の関数が実行されて文字列が出力されているのが分かりますね！　この場合は、addEventListener()に2つの関数が追加されることになるのでどちらも一緒に実行されるのです。

さらに、「onclick属性」で指定したコードも動作しています。このことから、「onclick属性」と「addEventListener()」は別のものであることもわかりますね。

## まとめ

* addEventListener()は3種類の記述方法がある
* イベントの種類に応じてさまざまな処理を関数で実行できる
* addEventListener()はイベントを上書きせずに複数同時に実行可能



## 参考サイト

* [【JavaScript入門】addEventListener()によるイベント処理の使い方！](https://www.sejuku.net/blog/57625)