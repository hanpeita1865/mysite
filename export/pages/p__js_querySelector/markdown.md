*[page-title]:任意の要素を取得　querySelector()、querySelectorAll()

参考サイト
: [【JavaScript入門】querySelector()によるHTML要素の取得方法まとめ！](https://www.sejuku.net/blog/70581)

## 「querySelector()」とは？

「querySelector()」は、JavaScriptから任意のHTML要素を検出・取得することができるメソッドになります。  
JavaScriptには以前から「getElementById()」とか「getElemetnsByClassName()」などHTML要素を取得できるメソッドはありました。  
しかし、「querySelector()」を使うとid属性値・class属性値などを意識せずにjQuery感覚でHTML要素をセレクタ指定することができます。

つまり、簡単に言うと「querySelector()」だけであらゆるHTML要素を取得することができるわけです。


## 「querySelector()」の使い方

<p class="tmp"><span>書式</span></p>
```
document.querySelector( CSSセレクタ )
```
document全体に対してquerySelector()を実行することになります。引数にはjQueryで使うようなCSSセレクタを指定することで、任意のHTML要素を取得することができるようになります。

注意点としては、<span class="red bold">最初に合致したHTML要素を取得した時点でプログラムは終了</span>するという点です。  
つまり、複数の要素を取得するには自作のループ処理を作成するか、後述する「querySelectorAll()」を使う必要があります。

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	querySelector()の引数に、それぞれCSSセレクタを指定しており、これにより、同じquerySelector()でも引数の指定方法によって任意のHTML要素を取得できます。ここでは、クラス名とID名で指定しています。
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/fxLvn94g/5/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 「querySelectorAll()」の基本

<p class="tmp"><span>書式</span></p>
```
document.querySelectorAll( CSSセレクタ )
```
このように、引数の指定方法や対象の範囲などquerySelector()と手法は同じです。
大きく違うところは合致するHTML要素を<span class="green bold">すべて取得</span>することができるという点です！
queryselector()は最初に合致した要素だけしか取得できないので、用途に応じて使い分けられるようにしましょう。

<div class="exp">
	<p class="tmp"><span>例2</span></p>
<iframe width="100%" height="300" src="//jsfiddle.net/hirao/o7vf3yq6/3/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

この例では、querySelectorAll()の引数にclass属性値「list」を指定しています。  
これによりリスト要素をすべて指定することになり、結果的に全リスト項目を取得できるわけです。  
もちろん指定方法は「li」要素をそのまま設定しても構いませんが、他のリスト要素との兼ね合いに注意しましょう。

## forEach文で要素のテキストを取得する方法

さて、取得したすべてのリスト要素をそれぞれ1つずつ処理したい場合について見ていきましょう。  
querySelectorAll()で取得した要素はNodeListと言って、配列によく似たデータ構造が格納されています。  
そこで、配列を効率よく繰り返し処理できる「forEach」を使って各要素を1つずつ処理してみましょう。  
先ほどの結果を元に、次のサンプル例を見てください！

<div class="exp">
	<p class="tmp"><span>例3</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/56y9f87h/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

この例では、querySelectorAll()を使って取得した結果をforEach文で繰り返し処理しています。
引数「value」を指定することで、それぞれのHTML要素を実行結果のように取得することができるわけです。  
これにより、querySelectorAll()を使って取得したHTML要素に対して、任意の処理を実行することができるので覚えておきましょう！  