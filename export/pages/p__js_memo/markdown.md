*[page-title]:JSメモ（よく利用するもの）


## HTMLコレクションやNodeListを配列に変換

<p class="tmp"><span>書式</span></p>
HTMLコレクションやNodeListは、このままではmapやforEachを使えないので、変換してやる必要があります。
```
Array.prototype.slice.call(HTMLコレクション);
```

```
Array.prototype.slice.call(HTMLコレクションやNodeList).forEach(function( value ) {
		value.処理～;
});
```

## data属性の値を指定して要素を取得する

参考サイト
: [【JavaScript】data属性の値を指定して要素を取得する](https://into-the-program.com/javascript-get-element-custom-data-value/)

```
//data属性をして取得
const data = document.querySelectorAll('[data-user-id]');
//値を指定して取得
const elements = document.querySelectorAll('[data-user-id="100"]');
//変数ので取得
const data = document.querySelectorAll('[data-user-id="'+userId+'"]');
```
		
## e.targetとthisの違いについて

参考サイト
: [e.targetの扱いには注意しよう](https://qiita.com/sasurai_usagi3/items/45d61fd08cdf7cff57fa)
: [【JavaScript】無名関数とアロー関数とイベントリスナーのthis](https://laboradian.com/js-anon-func-arrow-func/)

e.targetは文字通りクリックされた要素を指します。  thisは、クリックイベントを指定した要素を指します。

アロー関数野場合、thisはイベントの起こった要素を指さないので、こんなときには、「<span class="red bold">currentTarget</span>」を使います。

<div class="exp">
	<p class="tmp"><span>例</span></p>
	「click here」のイベントは、通常の書き方です。「アロー関数 click here」は、アロー関数を使ったイベントになります。
	<a href="sample/sample1(target_this)/" target="_blank">新規タブ</a>
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/L7fs94uv/2/embedded/result,js,html/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


## 特定のクラスがあるかを判定

参考サイト
: [JavaScriptで特定のクラス名があるかどうかを判別して条件分岐する方法](https://www.imamura.biz/blog/27372)



## ネイティブなJavaScriptへの書き換え方まとめ

参考サイト
: [【脱jQuery！】ネイティブなJavaScript（Vanilla JS）への書き換え方まとめ](https://wemo.tech/2101)





