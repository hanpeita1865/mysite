*[page-title]:現在日時取得 new Date()

参考サイト
: [JavaScript 現在日時を取得するサンプル](https://itsakura.com/js-date)
: [JavaScript 日時の計算のサンプル(加算と減算)](https://itsakura.com/javascript-date)
: [JavaScript 日時の差分を求めるサンプル](https://itsakura.com/javascript-diffdate)

## 現在日時を個別のメソッドで取得する

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	現在日時を個別のメソッドで取得するサンプルです。
<script async src="//jsfiddle.net/hirao/j0qhzc95/3/embed/js,result/"></script>
</div>
```
2行目は、曜日の配列です。
4行目は、Dateオブジェクトを生成しています。
5～12行目は、個別に値を取得しています。
6行目のgetMonthは、0から始まります。1月のときは0が返ります。そのため+1しています。
12行目のgetDayは、曜日が数字で返ってきます。0は日曜日で、6は土曜日です。
17,18行目は、sliceメソッドで頭ゼロを付与しています。
19行目は、YYYYMMDDで出力されます。
```

## 現在日時を取得しtoLocaleStringでフォーマット変換する
<div class="exp">
	<p class="tmp"><span>例2</span>toLocaleString</p>
	<script async src="//jsfiddle.net/hirao/rg28jkc4/1/embed/js,result/"></script>
</div>
```
3行目は、Dateオブジェクトを生成しています。
5行目は、toLocaleStringメソッドで年月日をスラッシュ区切りで、時分秒をカンマ区切りで表示しています。
```
toLocaleStringメソッドは、サポートされていないブラウザもあります。


## JavaScript 日時の計算のサンプル(加算と減算)

～途中～

## JavaScript 日時の差分を求めるサンプル

～途中～