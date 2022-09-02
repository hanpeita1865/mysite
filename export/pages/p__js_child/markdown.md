*[page-title]:子要素、親要素、前後の要素を取得

参考サイト
: [特定のHTML要素の子要素、親要素、前後の要素を取得する](https://gray-code.com/javascript/get-child-element-and-paranet-element-and-previous-element-and-next-element-of-specific-html-element/)
: [子要素（子ノード）の取得](https://shanabrian.com/web/javascript/element-children.php)

## 子要素（子ノード）の取得

子要素（子ノード）を取得するにはelement<span class="green bold">.children</span>プロパティを使用します。

<p class="tmp"><span>書式</span>子要素</p>
```
let elements = element.children;
```

戻り値
: HTMLCollectionを返し、存在しない場合は0個のHTMLCollectionを返します。