*[page-title]:getElementsByClassName クラスのある要素を取得

「getElementsByClassName()」は、対象となるクラス名が設定されているHTML要素をすべて取得できるメソッドになります。


## 「getElementsByClassName()」の使い方

抽出したいクラス名を文字列で指定します。  
対象範囲はdocumentにすることでHTML要素全体を指定することができます。  
もちろん、任意の範囲を設定することも可能です。（詳細は後述します）  
また、戻り値は配列によく似たHTMLコレクションであるという点に注意しましょう。
<p class="tmp"><span>書式1</span></p>
```
document.getElementsByClassName( クラス名 );
```

<div class="exp">
	<p class="tmp"><span>例1-1</span>任意のクラス名を持つ要素をすべて取得する方法</p>
	取得されるのは、HTMLコレクションという配列によく似たものになります。
<iframe width="100%" height="400" src="//jsfiddle.net/hirao/b348enru/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例1-2</span>複数のクラスを指定する方法</p>
	「sample test」と複数のクラス名を記述することで実行結果のように対象のHTML要素を取得できます。
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/oha68cyf/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例1-3</span>要素の範囲を指定してクラスを検索する方法</p>
	id属性値「wrap」内にあるHTML要素だけを対象に取得しています。
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/bvzco2hr/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## イベントを使う

参考サイト
: [【JavaScript】class取得をしてaddEventListenerでイベント処理をする際にハマった二つの落とし穴](https://logical-studio.com/develop/web/20191213-js-class-addeventlistener/)


<div class="exp">
	<p class="tmp"><span>例2</span>イベント発動</p>
	「document.getElementsByClassName」で取ってくる時の戻り値の正体が「HTMLCollection」の為、これを無理やり配列にしてから、forEachとaddEventListenerでイベントを発動させてます。  
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/1bm3j6xw/7/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

上記でclassの取得をする際に「わざわざ配列にする」という作業を行いましたが、実は、そのようなことをしなくても「<span class="green bold">querySelectorAll</span>」というメソッドがあります。  
今度は、これを使ってみます。

<div class="exp">
	<p class="tmp"><span>例2-2</span>「querySelectorAll」を使った方法</p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/8mqswvyu/9/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

### ポイントまとめ

* 全てのclassにaddEventListenerでイベント処理をかけたい時は繰り返し処理を使う
* 「document.getElementsByClassName」の戻り値は「HTMLCollection」
* querySelectorAllを使えば、配列に変換しなくても済む。

## 参考サイト

* [getElementsByClassName()でクラス名からHTML要素を複数取得する方法](https://www.sejuku.net/blog/68588)