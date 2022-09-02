*[page-title]:要素の属性値を取得・設定 getAttribute、setAttribute

参考サイト
: [要素の属性値を取得・設定(getAttribute,setAttribute)](https://www.javadrive.jp/javascript/dom/index16.html)


JavaScript からはプロパティまたはメソッドを使って属性値を参照したり新しい値を設定することができます。ここでは要素ノードに対して属性名を指定して属性値を取得したり、新しい属性値を設定する方法について解説します。

## 属性値を取得する(プロパティ)

要素に設定された属性値は次のようにプロパティ名として属性名を指定して参照することができます。

<p class="tmp"><span>書式</span>プロパティ取得</p>
```
element.属性名
```
使用できる属性名は、要素ノードのタグ毎に決まっており、どのタグでも使用できる共通の属性名と、特定のタグだけに用意された個別の属性名があります。

どのタグでも使用できる共通の属性名には id や class, style, title などの他にイベントハンドラ( onclick など)が用意されています(他にもあります)。 <p> タグや <div> タグは共通の属性名しか持っていません。

特定のタグでしか使用できない属性値には例えば <a> タグの href 属性や target 属性、 <blockquote> タグの cite 属性などがあります。

id 属性や href 属性はそのまま 要素ノード.id や 要素ノード.href と参照できますが、 class 属性の class は他の意味で使用される言葉なので class の代わりに 要素ノード.className と参照します。他にも JavaScript で予約語と同じ名前の属性名については、もし属性名が xxx だった場合は代わりに 要素ノード.htmlXxx のように属性名の前に html をつけ属性名の最初の文字を大文字に変えてください。

属性名はあるけれど値が設定されていないときは空文字が返り、対象の要素ノードに対して存在しない属性名を指定して値を参照すると undefined が返されます。

<div class="exp">
	<p class="tmp"><span>例1</span></p>
	表示されたボタンをクリックすると、 id 属性の値が 'shopinfo' の要素ノードを取得し、最初の子要素の href 属性、次の子要素の class 属性、 title 属性、 href 属性を取得してコンソールに出力します。
<iframe width="100%" height="400" src="//jsfiddle.net/hirao/kghps5tn/5/embedded/result,js,html/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

次の子要素である div タグには title 属性はありますが値が設定されていないので空文字が返され、 href 属性は存在しないので undefined が返されています。

## 属性値を設定する(プロパティ)

属性名を表すプロパティに対して値を設定することで、属性値に新しい値を設定することができます。

<p class="tmp"><span>書式</span></p>
```
element.属性名 = 'value'
```
属性名に対して値が設定されていた場合は新しい属性値が設定されます。  
属性名に値が設定されていなかった場合は、新しく属性名に対して属性値が設定されます。例えば class 属性に 'box' を設定する場合は次のように記述します。

```
let element = document.getElementById('shopinfo');
element.className = 'box';
```

<div class="exp">
	<p class="tmp"><span>例2</span></p>
	表示されたボタンをクリックすると、 id 属性が shopinfo の要素ノードを取得し、最初の子要素の href 属性の値を変更し、新しく target 属性の値を設定します。そのあとで href 属性の値と target 属性の値を取得してコンソールに出力します。
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/2e0rL8xu/3/embedded/result,js,html/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 属性値を取得する(getAttributeメソッド)

要素の属性値を取得するもう一つの方法です。 Element オブジェクトの getAttribute メソッドは指定した属性名の属性値を取得します。書式は次の通りです。

<p class="tmp"><span>書式</span></p>
```
element.getAttribute(qualifiedName)
```

引数には取得したい属性名を DOMString オブジェクトで指定します。戻り値は引数に指定した属性名の属性値を DOMString オブジェクトで返します。指定した属性が見つからなかった場合は空文字か null が返されます。

なおプロパティを使って属性値を取得する場合、 class 属性の値を取得するときはプロパティ名として className を指定していましたが、 getAttribute メソッドを使う時は引数に 'class' のように属性名をそのまま指定します。他の属性名についても同じです。
```
let element = document.getElementById('shopinfo');
let attvalue = element.getAttribute('class');
```

<div class="exp">
	<p class="tmp"><span>例3</span></p>
表示されたボタンをクリックすると、 id 属性の値が 'shopinfo' の要素ノードを取得し、最初の子要素の href 属性、次の子要素の class 属性の値をそれぞれ取得してコンソールに出力します。
<iframe width="100%" height="400" src="//jsfiddle.net/hirao/9zeth15g/2/embedded/result,js,html/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 属性値を設定する(setAttributeメソッド)

要素の属性値を設定するもう一つの方法です。   
Element オブジェクトの setAttribute メソッドは指定した属性名の属性値に新しい値を設定します。書式は次の通りです。

<p class="tmp"><span>書式</span>setAttribute</p>
```
element.setAttribute(qualifiedName, value)
```
1 番目の引数に属性名、 2 番目の引数に属性値をそれぞれ DOMString オブジェクトで指定します。

属性名に対して値が設定されていた場合は新しい属性値が設定されます。  
属性名に値が設定されていなかった場合は、新しく属性名に対して属性値が設定されます。例えば class 属性の値に 'box' と設定する場合は次のように記述します。
```
let element = document.getElementById('shopinfo');
element.setAttribute('class', 'box');
```

<div class="exp">
	<p class="tmp"><span>例4</span></p>
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/15vayq46/3/embedded/result,js,html/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>






