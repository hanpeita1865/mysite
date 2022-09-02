*[page-title]:文字列操作(split,slice,trim,join)

## split()～文字列を分割 ##{#p1}

引数に文字や正規表現を入れ、文字列を分割します。

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/teuw4L5z/14/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例1-2</span></p>
	一文字ずつ分割します。<br>
    1文字ずつに区切る場合は、第一引数に"空文字"を指定してください。
		<iframe width="100%" height="200" src="//jsfiddle.net/9xmrwe5z/1/embedded/js,result" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

### 複数の区切り文字を指定して分割する

正規表現で区切り文字を複数指定する場合は、「|」で区切ることで指定可能です。

<div class="exp">
	<p class="tmp"><span>例1-3</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/rL2t9gxf/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

※サンプルでは区切り文字を2つにしていますが、指定できる区切り文字の数に制限はありません。

## slice()、substr()～先頭・末尾から任意の文字数を取得・削除する方法

<div class="exp">
	<p class="tmp"><span>例2-1</span>先頭・末尾から5文字を取得</p>
<iframe width="100%" height="350" src="//jsfiddle.net/he1mdoju/3/embedded/js,result" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


<div class="exp">
	<p class="tmp"><span>例2-2</span></p>
	先頭・末尾から3文字を削除
<iframe width="100%" height="350" src="//jsfiddle.net/he1mdoju/4/embedded/js,result" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>



## trim()～文字列の空白スペースを削除

### trimとは

そもそもtrimとは、JavaScriptのメソッド（関数）の一つで、削除したい対象文字列の前後の空白を削除する機能を持っています。また"空白"とは、スペースやタブ、改行などが対象となります。基本的な構文は以下の通りです。

***※trim()はブラウザによっては効かないので、正規表現を使う。***

<p class="tmp"><span>書式</span></p>
```
"空白を除去したい文字列".trim()
```

<div class="exp">
	<p class="tmp"><span>例3-1</span></p>
	文字列の前後と間の空白を削除
	<iframe width="100%" height="300" src="//jsfiddle.net/73hkn9jz/2/embedded/js,result" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

</div>


## join()～配列を連結する

「join」メソッドは「Arrayオブジェクト」の組み込みメソッドとして標準で用意されており、配列の要素を繋げて文字列に変換することができる便利なメソッドです。
これにより、配列データから特定の文字列を生成したり、置換メソッドと同等の機能を実現できたりします。

<p class="tmp"><span>書式</span>join()の基本的な構文</p>
```
var array = 配列; 
array.join( separator );
 ```
「join」メソッドの引数に指定できる「separator」というのは、配列の各要素を繋げるときに任意の文字列を挿入できる仕組みになります。

<div class="exp">
	<p class="tmp"><span>例4-1</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/6jcpw4xt/3/embedded/js,result" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


## その他サンプル

<div class="exp">
	<p class="tmp"><span>サンプル1</span></p>
	一文字ずつバウンドさせる。<br>
    CSSは、SCSSで記述してます。
		<iframe width="100%" height="300" src="//jsfiddle.net/xof52jt3/5/embedded/html,result,css,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>サンプル2</span></p>
	一回だけバウンドさせる。
<iframe width="100%" height="300" src="//jsfiddle.net/vs1moz9x/4/embedded/result,html,css,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


<div class="exp">
	<p class="tmp"><span>サンプル3</span></p>
	上からふわっと現れながら、下りてくる。
	<iframe width="100%" height="300" src="//jsfiddle.net/62zv7dja/embedded/result,html,css,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>



## 参考サイト

* [【JavaScript入門】trimで前後の空白スペースを削除する方法](https://www.sejuku.net/blog/24562)
* [【JavaScript入門】joinで配列を連結する方法(改行/置換)](https://www.sejuku.net/blog/23137)
* [JavaScript | split()で文字列を区切り文字で分割して配列に代入する方法](https://1-notes.com/javascript-split/)


