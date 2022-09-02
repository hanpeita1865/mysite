*[page-title]:配列とオブジェクトの並べ替え

## 配列の並べ替え

参考サイト
: [配列の要素を並び替える](https://www.javadrive.jp/javascript/array/index16.html)


## オブジェクトをキーで並べ替え

参考サイト
: [javascriptでオブジェクトをソートするには？要素をキーに並べ替え](https://keizokuma.com/js-array-object-sort/)

<p class="lang">オブジェクト並べ替え例</p>
```
let arr = [
  {date : '2020-02-20', memo : 'あいうえお'}
, {date : '2020-02-30', memo : 'かきくけこ'}
, {date : '2020-02-10', memo : 'さしすせそ'}
, {date : '2020-02-05', memo : 'たちつてと'}
];
let result = arr.sort(function(a, b) {
  return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
});

```