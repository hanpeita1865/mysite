*[page-title]:変数の有効範囲（スコープ）

参考サイト
: [中級者になるために押さえておくべきJavaScriptの言語特性の1つ、「スコープ」とは？](https://codezine.jp/article/detail/15431)
: [  第1回 スコープの種類とその基本](https://www.codegrid.net/articles/2017-js-scope-1/)

## JSのスコープについて

スコープ
: スコープは多くの他の言語にも存在する「変数の有効範囲」のことです。JavaScriptは細かくスコープを扱える一方、少しの記述の抜け漏れでスコープの種類が変わる落とし穴的な挙動もあります。

JavaScriptには以下のようなスコープが存在します。
* グローバルスコープ
* ローカルスコープ
* 関数スコープ
* ブロックスコープ

また、クラスに関係する変数もスコープに関連します。一般的には次のようなものがあります。
* インスタンス変数
* クラス変数（static変数）

簡単なプログラムを書いているうちは、スコープをそれほど意識しなくても思ったようなコードが書けることも多いです。複雑なコードを書くようになると、スコープを小さくすることでバグの原因を減らしたり、見通しを良くすることを意識する必要が出てきます。下に記した順にスコープが小さくなるので、特別な意図がない場合にはなるべく右側のスコープを心掛けると良いでしょう。

<div markdown="1" class="gray-box">
<span class="green bold">グローバルスコープ > クラス変数 > インスタンス変数 > 関数スコープ > ブロックスコープ</span>
</div>

スコープの大きさと役割
: スコープが大きいならば「その変数を変更できる場所」がよりたくさんあります。「コードを書いた人の意図に反し、変数の値が予想外の場所で変更されない」ことを判断する際に、スコープは重要な働きをしています。小さいスコープなら判断の間違いが少なくなります。


## ブロックスコープ
ブロックとは、<span class="red bold">{}</span> で囲まれたコード群を指します。ifやforと一緒に使っているやつです。constやletで宣言された定数や変数はこのブロックスコープで扱われます（この後の説明ではまとめて「変数」と示しますがconstは正確には定数です）。

具体的には、例1-1のような動作になります。他のスコープに比べてチェックが厳密に行われることと、「ブロックの範囲」というコードを見た時にわかりやすいスコープであることが特徴です

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	<iframe width="100%" height="250" src="//jsfiddle.net/hirao/05jopk8w/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

上記のコードのようにif-else文の二つのブロック内にmyBlockVar1という変数をそれぞれ宣言して利用することができます。コード中に二回myBlockVar1が出ていますが、それぞれ別の変数として扱われます（ifの条件がtrueのためロジックとして意味はありませんが、ブロックの性質の理解のためのサンプルです）。

また、ブロックは特にifやforなどと一緒に利用せずとも、次のように、プログラマが自由にロジック中に追加できます。（ブロックがスコープの範囲なので、その外で変数を利用しようとするとエラーになります。）

<p class="tmp list"><span>リスト1-1</span></p>
```
// ブロックは意図的に書くこともできます
{
  const myBlockVar2 = 'myBlockVar2'; // これがブロックスコープの変数です
  console.log(myBlockVar2);
}

// console.log(myBlockVar2); // エラー：ブロックの外なので利用できません
```
ブロックスコープはES6で導入された新しいスコープの概念です。なるべくこのスコープの変数を活用すると堅牢なプログラムを書くことができます。

## 関数スコープ
関数の中が有効範囲になるスコープです。関数の中で、let、const、varで宣言される変数のみがこれに該当します（リスト2-1）。

<p class="tmp list"><span>リスト2-1</span></p>
```
function funcScope() {
  let myFuncVar1 = 'myFuncVar1'; // これが関数スコープの変数です
  console.log(myFuncVar1);
}

funcScope();
// console.log(myFuncVar1); // エラー：関数の外なのでmyFuncVar1は利用できません
```

古くはvarを利用するしかありませんでしたが、今後は新規でコードを書く際にはほとんど使われないでしょう。後に説明する「変数の巻き上げ」のような問題もあり、気をつけることが多いものでした。


## グローバルスコープ
最も広いスコープで、プログラムのどこからでも参照できます。

関数に全く囲まれていない最上位の領域で変数を宣言したり、関数内でも変数を宣言する際にvarやconst、letなどを付けずに使うとグローバルスコープになります（例3-1）。


<div class="exp">
	<p class="tmp"><span>例3-1</span></p>
	<a href="sample/sample3-1(scope).html" target="_blank">新規タブ</a>
	<iframe width="100%" height="450" src="//jsfiddle.net/hirao/dznoh45b/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 変数の巻き上げとブロックスコープ
関数スコープで特に覚えておきたい性質として「変数の巻き上げ」という動作があります。「同じ関数内で同名の変数を複数回宣言した場合に、同一の変数として扱われる」というものです。

varで変数宣言した場合のコードで巻き上げについて確認します（例4-1）。
<div class="exp">
	<p class="tmp"><span>例4-1</span></p>
	<iframe width="100%" height="350" src="//jsfiddle.net/hirao/47wj9svo/5/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

①と②でmyHoistingVar1という変数が宣言されていますが、どちらもfuncHoisting全体がスコープとなるので、同一の変数として扱われます。  
そのため、③では①の値が②の値に変更されたものが表示されています。

同様のコードでletを利用するとリスト4-2ような動作になり、より厳密にチェックがなされます。

<div class="exp">
	<p class="tmp"><span>例4-2</span></p>
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/o3p9y0ba/6/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

①と②の変数はそれぞれ別のものとして扱われます。③での結果は①で宣言した時の変数の内容のままです。さらに④のように、同じスコープ内に同名の変数を宣言しようとするとエラーになります。今回の場合、変数の変更がされなかったのでconstを利用しても同様の結果が得られるでしょう。

constやletを利用すると「変数の巻き上げへの気配り」をしなくて済むようになります。利用できる場所ではできる限りこちらを活用しましょう（厳密に言うと巻き上げはあるのですが、気をつけて対応する必要がなくなるのです）。

コードの堅牢性を考えれば、以下の指針に従うとよりバグの少ない記述ができます。基本は<span class="green bold">const</span>を用いて、変数の指す内容が変更される場合には<span class="blue bold">let</span>を選ぶと、<span class="purple bold">var</span>を使う機会はほとんどなくなるはずです。

<div markdown="1" class="fz-14">
<span class="green bold">const</span> → <span class="blue bold">let </span>→ <span class="purple bold">var</span>
</div>


<div markdown="1" class="gray-box">
var と変数の巻き上げ
: varは古くからある変数宣言の方法ですが、巻き上げについては「気をつけなければいけないポイント」として以前から扱われてきました（特に例示したような「ブロックに囲まれあたかもスコープが違うように見える」場合に勘違いしやすいです）。後発のconstやletによる変数は、より厳密なチェックをされるなど、バグが起きにくい仕組みで実現されています。
</div>

## まとめ

* スコープは変数の有効範囲のことです。
* JavaScriptは変数の宣言の方法により、ブロックスコープ（const/let）、関数スコープ（var）などスコープの範囲が変化します。
* varでは変数の巻き上げがバグの原因になることもありましたが、const/letを活用するとよりバグが発生しにくいプログラムを書けます。
* 宣言文（var、let、const）を付けずに変数宣言すると、どのスコープ内で宣言しても、自動的にグローバルスコープとなってしまい、意図せぬバグを生む可能性があります。変数宣言では必ず宣言文を付ける*ようにしましょう。





