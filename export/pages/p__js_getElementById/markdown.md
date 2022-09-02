*[page-title]:idの要素取得　getElementById

## getElementById

参考サイト
: [【JavaScript入門】getElementByIdを完全理解する3つのコツ！](https://www.sejuku.net/blog/27019)

### getElementByIdとは

getElementByIdは、任意のHTMLタグで指定したIDにマッチするドキュメント要素を取得するメソッドです。  
引数としてIDであるStringオブジェクトを要し、戻り値は取得した要素です。任意の要素を抽出し、その内容を変更したい場合など、様々なシチュエーションで活躍する関数です。

基本的にIDはドキュメント内で重複してはならないので、getElementByIdによって取得される要素は一つです。重複してる場合は、最初の要素だけを取得します。

### 基本的な書き方について

<div class="exp">
	<p class="tmp"><span>例</span></p>
	pタグをIDで抽出してJavaScriptコンソールに表示させてみました。<br>
pタグのID名がmyidなので、getElementByIdの引数として設定されています。
	<iframe width="100%" height="200" src="//jsfiddle.net/hirao/6rw7av0f/3/embedded/html,js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例</span></p>
	pタグを取得してその中身である文字列をtextContentプロパティを使用し、JavaScriptコンソールに表示させています。
	<iframe width="100%" height="200" src="//jsfiddle.net/hirao/nzum2rjb/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

### getElementByIdの注意点！

getElementByIdを使用するにあたって、よくトラブルになりがちなケースを二つご紹介したいと思います。  
ここでは、戻り値がnullになるケースと、同じIDがドキュメント内に重複しているケースについての注意点を解説したいと思います。

#### 戻り値の「null」について
指定したID名がHTMLドキュメント内で見つからない場合、getElementByIdの戻り値としてnullが返ります。

<div class="exp">
	<p class="tmp"><span>例</span></p>
	<iframe width="100%" height="200" src="//jsfiddle.net/hirao/q4ep5h0z/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

上記のサンプルコードは、pタグのIDがmyIdであるのにも関わらず、getElementByIdの引数にはhelloと設定してしまった例です。  
getElementByIdは、helloというIDを持つ要素がドキュメント内に見当たらないため、戻り値として<span class="red bold">null</span>を返すわけです。


#### IDが複数ある場合について
反対に、同じIDが同じドキュメント内に重複してしまった場合は、初回に合致した要素しか取得されません。

<div class="exp">
	<p class="tmp"><span>例</span></p>
	<iframe width="100%" height="200" src="//jsfiddle.net/hirao/vu2owfL6/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


