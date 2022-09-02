*[page-title]:要素の順番を取得 indexOf()

## 要素の順番をJSで取得

参考サイト
: [【JavaScript】要素の順序を取得する方法｜](https://blog-and-destroy.com/24250)

HTML内の指定した要素の順序を取得する方法として、jQueryの場合、index()メソッドを使えば簡単に取得できます。  
JSで順序を取得しようとすると、少しコードが増えます。  
次の例のようにします。

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	「menu」クラスのあるdiv要素の中から、idの「target」が設置されている要素の順序を取得して、コンソールに表示しています。「arrayMenus」は配列なので、0からの順序にになります。
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/4g5jomd6/8/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>