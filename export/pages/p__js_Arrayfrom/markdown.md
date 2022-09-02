*[page-title]:Array.from() オブジェクトなどから新しい Array インスタンスを生成

参考サイト
: [mdn web docs Array.from()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

<span class="green bold">Array.from() メソッド</span>は、配列のようなオブジェクトや反復可能オブジェクトから、浅くコピーされた新しい Array インスタンスを生成します。

<p class="tmp"><span>書式</span></p>
```
Array.from(arrayLike[, mapFn[, thisArg]])
```
##### 引数
arrayLike
: 配列に変換する配列のようなオブジェクトまたは反復可能オブジェクト

mapFn 省略可
: 配列のすべての要素に対して呼び出される Map 関数。

thisArg 省略可
: mapFn を実行する時に this として使用する値。

<div class="exp">
	<p class="tmp"><span>例</span></p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/kw9z03mu/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例</span>String からの配列の生成</p>
	<iframe width="100%" height="200" src="//jsfiddle.net/hirao/ray9L2xz/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


<div markdown="1" class="memo-box">
Set
: Set オブジェクトは、プリミティブ値やオブジェクト参照を問わず、あらゆる型で多数の一意の値を格納することができます。<br>
一見すると配列と同じようなものに見えますが、setオブジェクトには配列には存在しない2つの特徴があります。<br>
1つ目は、***重複する値を保持できない***ことです。<br>
2つ目は、***添字の概念が存在しない***ことです。

解説
: Set オブジェクトは値のコレクションです。挿入順に要素を反復することができます。 Set に重複する値は格納出来ません。 Set 内の値はコレクション内で一意になります。

参考サイト
: [mdn web desc Set](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set)
: [【JavaScript】setオブジェクトの便利な使い方をご紹介します！](https://hataworakuni.net/set-in-javascript)
</div>

<div class="exp">
	<p class="tmp"><span>例</span>Map からの配列の生成</p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/2p39udj1/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

<div class="exp">
	<p class="tmp"><span>例</span>アロー関数と Array.from の使用</p>
	<iframe width="100%" height="300" src="//jsfiddle.net/hirao/480dtw37/3/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>