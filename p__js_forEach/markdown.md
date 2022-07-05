*[page-title]:forEach() 配列繰り返し処理

参考サイト
: [JavaScript で forEach を使うのは最終手段](https://qiita.com/diescake/items/70d9b0cbd4e3d5cc6fce)

配列に対して何らかの操作を行う際は、filter, find, map, reduce などのメソッドを利用できないか検討し、  
いずれのメソッドでも実現ができない場合の最終手段として forEach を選択しましょう。

下記に、いくつかのサンプルコードを例に説明していきます。

<div class="exp">
	<p class="tmp"><span>例1</span>forEach使用</p>
	このコードでは、配列array のうち「date」の値が「2020-02-20」に合致したデータを要素をdayListに格納して、それをコンソールに表示しています。
	<script async src="//jsfiddle.net/hirao/r5fmean8/20/embed/js,result/"></script>
</div>

上記の方法でも、勿論正常に動作しますが、  
このケースでは下記のように<span class="purple bold"> filter</span> を利用することでより簡潔に記述できます。


<div class="exp">
	<p class="tmp"><span>例2</span>filter()使用</p>
	<script async src="//jsfiddle.net/hirao/v2Lyqpwh/9/embed/js,result/"></script>
</div>

さらに、実際には arrow function の shorthand を利用することでさらにコンパクトになります。  
(これ以降の例では shorthand によるコードのみを紹介します)

<div class="exp">
	<p class="tmp"><span>例3</span></p>
	<script async src="//jsfiddle.net/hirao/3gbr2ckx/6/embed/js,result/"></script>
</div>

さて、forEach から filter に書き換えたことによって、コードが短く簡潔になったことはわかると思いますが、それよりも重要なメリットは、  <span class="red">配列のループ処理に filter が利用されている</span>ことで、このコードを見た人に、このループが array の subset を抽出している、という意図が瞬間的に伝わる ということです。

forEach は配列をループするという目的と意味しか持たないため、
何のためにループを行っているのか把握するためには、実装の詳細を追う必要がありますが、
filter が利用されている場合、コードの詳細を読まずとも、処理全体として特定条件の要素を抜き出す処理を行っているだろうことが伝わります。  

コードリーディングにおいて、ループの処理を読み解くのは脳に対する負荷は高くなりがちですが、前もって処理全体の目的が分かれば、詳細を理解するにあたって大きくコストを削減できます。

ここでは filter の例で説明しましたが、それ以外の find, map, reduce についても同様のメリットがあり、適切なメソッドを選択することで、リーダビリティに優れたコードとなるため重要です。

## find

続いて Array.prototype.find です。
<div class="exp">
	<p class="tmp"><span>例4</span>find</p>
	<script async src="//jsfiddle.net/hirao/15jbqt9h/5/embed/js,result/"></script>
</div>

これも、forEachやfilterでも実装できます。  
forEachは先ほど説明した通りで、filterに関しては、合致したデータを全て取得するので、１つだけ一致するデータがあるとわかる時は、findを使うと良いです。  
読み取り手にも、find を使うことで、配列から特定の要素1つを検索して抜き出すという意図が明確になるため、
filter より find を利用するのが良いでしょう。

～途中～
