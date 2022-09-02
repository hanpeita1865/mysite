*[page-title]:Cookie操作

## 閲覧履歴をCookieに保存

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	ページ内のリンクをクリックすると、CookieにURL、ページタイトル、閲覧日時などが保存され、次に開いた時、履歴ボックスに表示されます。
			<a href="sample/sample1(cookie_history)/" target="_blank">新規タブ</a>
	<iframe width="100%" height="550" src="sample/sample1(cookie_history)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

上記の例1-1にPathの有効範囲を設定するには、例えば「test/sample11(cookie_history)」のディレクトリ内に設定する場合、次のように記述し、
```
const cookiePath = 'Path=/test/sample11(cookie_history)';//有効範囲
```

3か所のCookie保存のdocument.cookieのコードに「cookiePath」を付け足します。

```
document.cookie = nameList.name +'=; max-age=0'+ ';' + cookiePath;
document.cookie = 'url' + date2 + '='+ 'url=' + pageUrl + '&title=' + pageTitle + '&datetime=' + dateTime + ';' + cookieMaxage + ';'+cookiePath;
document.cookie = urlKey+'=; max-age=0'+ ';' + cookiePath;
```

こうすることで、指定したディレクトリ内のどのページからでも、自身ページ以外のCookieデータを削除などができるようになります。

