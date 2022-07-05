*[page-title]:insertAdjacentHTML HTMLを追加

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/um2r98yj/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


<div class="exp">
	<p class="tmp"><span>例2</span>textContent</p>
	<iframe width="100%" height="300" src="//jsfiddle.net/3jes2L68/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


innerHTMLやdocument.write()は内部の構造を上書きする変更で、これを破壊的な変更といいます。  
既存の構造に追加したい、という状況の場合には、.insertAdjacentHTML()などのメソッドを使います。

<span class="green bold">.insertAdjacentHTML()</span>は、特定のポジションにテキストを挿入するメソッドです。

<p class="tmp"><span>書式</span>insertAdjacentHTML()</p>
```
.insertAdjacentHTML(ポジション , テキスト);
```

テキストには文字列が入り、ポジションには次の4つの文字列のいずれかを記入します。

* "beforebegin"：要素の直前に挿入
* "afterbegin"：要素内部の、最初の子要素の前に挿入
* "beforeend"：要素内部の、最後の子要素の後に挿入
* "afterend"：要素の直後に挿入

<div class="exp">
	<p class="tmp"><span>例3</span>insertAdjacentHTML</p>
	<a href="sample/sample3/" target="_blank">新規タブ</a>
	<iframe width="100%" height="300" src="//jsfiddle.net/t0jua251/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


## セキュリティ上の注意点

今回紹介した仕組みを使えば、簡単に外部からのテキストコメントを受け付ける、いわゆるコメント機能が実装できます。ですが、その際に次のようなコメントが投稿されたらどうなるでしょうか？
```
<a href="https://悪意あるリンク.com">適当なコメント</a>
```
このようなコメントを.innerHTMLなどでHTMLに渡してしまうと、悪意あるリンクの付いたコメントがそのままHTMLに反映されてしまいます。

今回はごく簡単な例で確認しましたが、たとえばリンクではなくて、スクリプトが投稿された場合、悪意あるスクリプトがそのままHTMLに反映されてしまうわけです。これをDOM Based XSSと呼びます。


### .innerHTML ,insertAdjacentHTML()を使わない

まず手っ取り早いのが、必要以外の場所で上記のメソッド、プロパティを使わない方法です。外部から入力可能な部分でテキストがHTMLに解釈されてしまうのが問題なので、テキストはテキストとして出力するものを使ったほうが安全です。

具体的には

.innerHTMLの代わりに.textContent
.insertAdjacentHTML()の代わりに.insertAdjacentText()
これらを使うことでテキストがHTMLに解釈される問題を回避できます。


## エスケープ処理を実装する方法
ただ、どうしても外部からの入力に対してHTML解釈が必要な場面もあるかもしれません。そういった場合の対策はエスケープ処理です。

エスケープ処理とは、特定の文字を別の文字に置き換える処理のこと。今回で言えばタグを構成する<,>,",',&の要素を置き換えてしまえば、攻撃者はHTMLに問題のあるリンクやスクリプトを仕込めなくなります。

具体的には入力された文字列に対して、エスケープ処理を最初にかけて、それ以降の処理を行う、という流れです。

サンプルは次のようになります。
```
<p>ボタンをクリック！</p>
<input type="text" id="text_box">
<div id="edit_area"></div>

<input type="button" value="Check" onclick="myfunc('text_box')">

<script>
  var myfunc = function (id) {
    var str = document.getElementById(id).value;
    var edit_area = document.getElementById("edit_area");

    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
    str = str.replace(/&/g, "&amp;"<div class="img-caption">);

    edit_area.insertAdjacentHTML("beforebegin",str);
    }
</script>
  ```
  
  str = から始まる5行がエスケープ処理です。
  
  
  ## 参考サイト
  
  * [HTMLにJavaScriptの変数を渡す方法を解説！セキュリティにも要注意](https://www.sejuku.net/blog/88958)