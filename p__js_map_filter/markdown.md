*[page-title]:map()、filter()による配列操作

## mapメソッドについて

配列データを便利に操作する「<span class="green bold">map</span>」メソッドについてです。  
配列の全てのデータに対して指定した処理をおこない、新しい配列を作ることができます。


<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	数値データを格納した配列に対して、「map」メソッドを使った例です。
	<script async src="//jsfiddle.net/kLn4gc2s/1/embed/js,result/"></script>
</div>

「for文」や「while文」などを使ってループ処理を書くこともできますが、このように「map()」を使うと非常にシンプルなプログラムになります。

### 複数回ループさせたい時（Spread Operator）

参考サイト
: [【JavaScript】指定した回数分だけループ処理をする方法とは](https://asapoon.com/javascript/3028/%E3%80%90javascript%E3%80%91%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%9F%E5%9B%9E%E6%95%B0%E5%88%86%E3%81%A0%E3%81%91%E3%83%AB%E3%83%BC%E3%83%97%E5%87%A6%E7%90%86%E3%82%92%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/)

for文を使ってでも実装できますが、<span class="green bold">[…Array(n)]</span> の構文を使用した方がコードの見通しが良くなります。

<p class="tmp"><span>書式</span></p>
```
[...Array(回数)].map(() => 処理内容)
```

<div class="exp">
	<p class="tmp"><span>例1-2</span></p>
	5回ループ指定して、コンソールに5個の「Hello World!」を表示させています。
	<script async src="//jsfiddle.net/hirao/e5xt2qf7/1/embed/js,result/"></script>
</div>

<div class="exp">
	<p class="tmp"><span>例1-3</span></p>
	<script async src="//jsfiddle.net/hirao/85mkd1ep/1/embed/js,result/"></script>
</div>

## forEach文との違いについて
同じように配列を操作できる「<span class="bold">forEach文</span>」とよく似ていますが、「forEach」は単純に実行するだけのメソッドなのに対して、「<span class="green bold">map</span>」は、実行後の結果を配列データとして返してくれるという点が違います。

<div class="exp">
	<p class="tmp"><span>例2</span></p>
	「forEach文」と「map」メソッドを使って処理結果を比較した例です。
<iframe width="100%" height="350" src="//jsfiddle.net/w0hqv6dt/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>	
</div>

<span class="bold">forEach文</span>の場合は、実行結果の返り値が***undifind***になるのに対して、「<span class="green bold">map</span>」の場合は実行結果が「返り値」として***配列データ***を取得できています。  
つまり、「forEach」は実行するだけで「返り値」は存在しないのに対して、「map」は「返り値」が存在するのです。


## mapメソッドとfilterメソッドの違い

map()によく似た類似メソッドに、<span class="purple bold">filter() </span>というのがあります。  
map()では、全ての値に「指定した処理」を行った値を格納した新しい配列を作成します。filter()では、全ての値から<span class="red bold">「指定した条件」に合致する値を格納した新しい配列</span>を作成します。filter()を使用した例を見てみます。

<div class="exp">
	<p class="tmp"><span>例3</span>filter()を使った処理</p>
	<script async src="//jsfiddle.net/nhqcdL8w/embed/js,result/"></script>
</div>

この例では、数値が格納された配列データに対して<span class="purple bold">filter()</span>を使い、5よりも小さい数値だけを抽出しています。filterメソッド内の関数にreturnで条件式の結果を返すことで、該当するデータだけを新規の配列に格納していくわけです。


## 読み込んだファイルの行数をmapメソッドで取得

非同期などで読み込んだファイルの行数をmapメソッドを使って、配列を再編成することで取得することが出来ます。
### 方法
1. data に渡される テキストデータを改行コードで分割
2. 行のデータを 半角スペースで分割しつつ結果を得る。

<p class="lang">JS</p>
```
//行番号を調べる(dataは非同期で読み込んだデータ)
let lines = data.split(/\r?\n/);
//let rslt = lines.map( line => line.split(" ") );//アロー関数はIE非対応のため、functionに変更
let rslt = lines.map( function(line){
	line.split(" ");
});
```

## 参考サイト
* [【JavaScript入門】配列処理をするmap()の使い方とMapオブジェクトの解説！](https://www.sejuku.net/blog/21812)
* [JavaScriptのmapメソッドの使い方を現役エンジニアが解説【初心者向け】](https://techacademy.jp/magazine/26939)
* [javascriptでテキストファイルを一行ずつ読み込む方法](https://teratail.com/questions/230987)
* [JavaScript で forEach を使うのは最終手段](https://qiita.com/diescake/items/70d9b0cbd4e3d5cc6fce)