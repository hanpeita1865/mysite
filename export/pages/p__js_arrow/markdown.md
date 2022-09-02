*[page-title]:アロー関数について

アロー関数の説明のまえに、その前提である関数リテラルについて説明します。

## 関数リテラルとは
リテラルとはソースコードに直接べた書きした文字や数字のことです。

```
var name = "taro";
var age = 18;
//"taro"　18　がリテラル
```

つまり関数リテラルとはソースコードに直接べた書きされた関数のこと。  
JavaScriptでは関数はデータ型のひとつなので、変数に代入したり、関数の引数として渡したり、戻り値として関数を返すことが可能です。

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	<script async src="//jsfiddle.net/fs508agx/1/embed/js,result/"></script>
</div>


関数リテラルは宣言した時点では名前を持たないことから　匿名関数　<span class="green bold">無名関数</span>　と呼ばれます。  
上記の例ではfunction(base,height){...};と名前のない関数を定義した上で変数getTriangleに格納しています。

以上が関数リテラルの説明になります。  
ここでなぜ関数リテラルの説明をしたかというと、アロー関数は関数リテラルをシンプルに記述する方法だからです。


## アロー関数とは
アロー関数とは　その名の通り、　=>(矢)を使って関数リテラルを記述します。

<div class="exp">
	<p class="tmp"><span>例2</span></p>
	<script async src="//jsfiddle.net/krt2pd81/embed/js,result/"></script>
</div>

上記の例ではfunctionの代わりに「<span class="red bold">=></span>」が使われています。  
アロー関数は基本的に以下の様に書きます。

<p class="tmp"><span>書式1</span>アロー関数の基本構文</p>
```
(引数,...)=>{...関数の本体...}
```

## よりシンプルにアロー関数を記述する
アロー関数は条件によってさらに簡素化できます。

### 1,本体が一文である場合
本体が一文である場合、ブロックを表す{...}を省略できます。  
また、文の戻り値がそのまま戻り値とみなされるので、return命令も省略できます。

<div class="exp">
	<p class="tmp"><span>例3</span></p>
	<script async src="//jsfiddle.net/ps03gzcx/1/embed/js,result/"></script>
</div>


### 2,引数がひとつの場合
引数がひとつの場合、引数をくくるカッコも省略できます。

<div class="exp">
	<p class="tmp"><span>例4</span></p>
	<script async src="//jsfiddle.net/wspb2f9o/embed/js,result/"></script>
</div>

### 3,引数がない場合
引数がない場合はカッコを省略せずに記述します。

<div class="exp">
	<p class="tmp"><span>例5</span></p>
	<script async src="//jsfiddle.net/t67k1wn4/embed/js,result/"></script>
</div>


## thisの固定
アロー関数では、thisはアロー関数が宣言された場所によって決まります。  
つまり定義したコンテキストでthisを固定します。  
これによって let self = this; などを書かなくてよくなったりします。


## 参考サイト

* [JavaScript アロー関数を説明するよ](https://qiita.com/may88seiji/items/4a49c7c78b55d75d693b)
* [アロー関数式を学ぶついでにthisも復習する話](https://qiita.com/mejileben/items/69e5facdb60781927929)
* <https://typescript-jp.gitbook.io/deep-dive/future-javascript/arrow-functions#ararrow-functions>
* [JavaScript: 通常の関数とアロー関数の違いは「書き方だけ」ではない。異なる性質が10個ほどある。](https://qiita.com/suin/items/a44825d253d023e31e4d#:~:text=%E9%80%9A%E5%B8%B8%E9%96%A2%E6%95%B0%E3%81%AF%E3%80%81%20arguments%20%E3%81%A7,%E3%82%92%E5%8F%82%E7%85%A7%E3%81%99%E3%82%8B%E3%81%A0%E3%81%91%E3%81%A7%E3%81%99%E3%80%82)
