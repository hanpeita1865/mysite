*[page-title]:要素のサイズ、位置を取得 getBoundingClientRect()

参考サイト
: [【mdn_web_docs】 Element.getBoundingClientRect()](https://developer.mozilla.org/ja/docs/Web/API/Element/getBoundingClientRect)

Element.getBoundingClientRect() メソッドは、要素の寸法と、そのビューポートに対する相対位置に関する情報を返します。

<p class="tmp"><span>書式</span></p>
```
domRect = element.getBoundingClientRect();
```

### 値
返値は <sup class="green bold">注1</sup><span class="bold">DOMRect</span> オブジェクトで、（パディングと境界の幅を含む）要素全体が収まる最小の長方形です。left, top, right, bottom, x, y, width, height の各プロパティは、長方形の全体の位置と大きさをピクセル数で記述します。 width と height 以外のプロパティは、ビューポートの左上を基準としています。

<span class="green bold">注1）</span><span class="bold">DOMRect </span>は矩形の大きさと位置を記述します。DOMRect が表すボックスの型は、それを返したメソッドやプロパティで指定されます。

![](upload/element-box-diagram.png){.wd80}

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	ボックスの幅と高さ、横位置と縦位置の値を取得し、コンソールに表示させています。
	<iframe width="100%" height="500" src="//jsfiddle.net/hirao/pyjtL7o8/6/embedded/result,js,html,css" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

HTMLに値を表示させたい場合、次のコードを追加するとできます。
```
for (var key in rect) {
  if(typeof rect[key] !== 'function') {
    let para = document.createElement('p');
    para.textContent  = `${ key } : ${ rect[key] }`;
    document.body.appendChild(para);
  }
}
```