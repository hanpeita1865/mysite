*[page-title]:Promise、Promise.all

参考サイト
: [【JavaScript】初心者にもわかるPromiseの使い方](https://techplay.jp/column/581)

## Promiseとは

PromiseとはJavaScriptにおいて、非同期処理の操作が完了したときに結果を返すものです。 非同期処理とは、ある処理が実行されてから終わるまで待たずに、次に控えている別の処理を行うことです。

なぜこのような仕組みがあるのでしょうか？

JavaScriptはシングルスレッドでしか動かない性質があるため、複数の処理を並列で走らせることができません。 そのため効率的に処理をするために考えられた仕組みが非同期処理と呼ばれるものです。

Promiseは処理が実行中の処理を監視し、処理が問題なく完了すれば<span class="green bold">resolve</span>、反対に問題があれば<span class="green bold">reject</span>を呼び出してメッセージを表示します。

### コールバックとは
コールバックとは、ある関数へ別の関数を渡すことです。

以下のようなイメージの場合、関数Bがコールバック関数になります。
```
関数A(関数B、引数) {
    //実行内容
}
```

コールバックは使い勝手がいい反面、使いすぎるとコードが非常に読みにくくなる欠点があります。また関数から関数を呼ぶ処理を繰り返しすぎると、あとで問題が発生したときに調べることが手間になりがちです。これをコールバック関数地獄と言います。
```
非同期処理のコールバック例

sampleFunction1(function(data1) {
    sampleFunction2(function(data2) {
        sampleFunction3(function(data3) {
            sampleFunction4(function(data4) {
                //処理
            });
        });
    });
});
```

JavaScriptにおける非同期処理のコールバック関数地獄はネストが深くなる上に、エラー処理が相まって、可読性を著しく下げる傾向があります。このコールバック地獄を避けるために考えられたの仕組みが、<span class="green bold">Promise</span>です。


## Promiseの使い方

### 基本的な書き方
Promiseの基本的な書き方は、以下のようになります。
<p class="tmp"><span>書式</span></p>
```
new Promise(function(resolve, reject) {
    resolve('成功');
});

new Promise(function(resolve, reject) {
    reject('失敗');
});
```
Promiseはresolveとreject、ふたつの関数を引数に取ります。

<span class="bold">resolve</span>：処理が成功したときのメッセージを表示する関数  
<span class="bold">reject</span>：処理が失敗したときのメッセージを表示する関数

といった形で使われます。  
try catchを思い浮かべてもらえれば、イメージが湧きやすいかもしれません。

#### thenを使ってコールバック処理を実行する
では次にPromiseのthenを使って、コールバック処理を実行してみましょう。

次のように書きます。
<div class="exp">
	<p class="tmp"><span>例1</span></p>
<iframe width="100%" height="300" src="//jsfiddle.net/hirao/290r6yxs/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

thenを使ってコールバック関数を実行する書き方は、すこし複雑です。

promise.thenを実行すると、処理した結果の"Promise成功！"という文字列がresultに引き渡されます。そのためconsole.logでresultを表示すると、"Promise成功！"という文字がコンソール上に表示されます。

そしてサンプルコードの実行結果に注目してください。console.log(result)のあとにconsole.log(“先に出力”)を実行しているにも関わらず、”先に出力”というメッセージが”Promise成功！”よりも先に出力されています。

これが非同期処理と呼ばれるもので、時間がかかる処理が完了する前に次に控えている別の処理が実行されている様子がわかります。

## チェインを使った処理のやり方

次はチェインの使い方を説明します。  
チェインを使うことで、複数の処理を連結させることができるようになります。  
最初の処理が成功した場合は次の処理に自動的に移る･･･を繰り返すことで、より複雑で高度な処理をコーディングできるようになります。

### Promiseの処理を連結させる方法
チェインを使って処理を連結させた例が以下コードになります。  
コードの中身は、getNumber関数は渡された数字numを受け取り、numに対して3を2回加算するというものです。

.thenを3回連続で使用している箇所がありますが、これがチェインと呼ばれるものです。このように、Promiseでは複数の処理を連続で処理させることが可能です。

<div class="exp">
	<p class="tmp"><span>例2</span></p>
	<iframe width="100%" height="650" src="//jsfiddle.net/hirao/djmetroa/2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

### allを使って複数の非同期処理を同時に行う
allを使うことで、複数の非同期処理を同時に実行することができます。

書き方は以下の通りです。
<p class="tmp"><span>書式</span>Promise.all</p>
```
Promise.all(iterable).then(function(message) {
    // 結果を表示する処理
}
```

<div class="exp">
	<p class="tmp"><span>例3</span>複数の非同期処理を同時に実行</p>
	<iframe width="100%" height="650" src="//jsfiddle.net/hirao/xjs7u8ft/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

allはすべての非同期処理がresolveされたタイミングで結果を返します。

上のサンプルの例ですと、promise1は300ms後, promise3は500ms後に処理されることになっていますが、1000ms後にresolveされるpromise2が完了したタイミングで結果を返します。

ですので上のサンプルコードは
```
console.log("First");
console.log("Second");
setTimeout(function(){console.log("Third")}, 600);
Promise.all([promise1, promise2, promise3])~
```
の順番で結果を返していることがわかります。


## catchを使ったエラーハンドリングのやり方

エラーハンドリングを行うために必要である、catchの使い方を説明します。
catchを使うことで、チェインを実行している最中にエラーが発生してもエラーを捕まえることができます。  
下のコードでは2つ目のチェインに入った段階でエラーを発生させているので、3を加算した結果である「6」を返す前にエラーメッセージを表示させます。
<div class="exp">
	<p class="tmp"><span>例4</span></p>
	<a href="sample/sample4(error)" target="_blank">新規タブ</a>
	<iframe width="100%" height="600" src="//jsfiddle.net/hirao/xjs7u8ft/3/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## まとめ
Promiseをおさらいすると、以下のようになります。

* Promiseは処理が成功すればresolveを返し、失敗ならrejectを返す
* Promiseを使うと、ネストを深くせずに非同期処理のコールバック関数が書ける
* チェインを使うことで、複数の処理を連続して処理できるようになる
* allはすべての非同期処理が完了した時点で、resolveを返す
* catchを使い、エラーが発生した時点でエラーを返すようにできる

これらの特性から、非同期処理時はPromiseを使うようにすると、コード記述時にミスやエラーが発生する可能性を減らすことができます。
