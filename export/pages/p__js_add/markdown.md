*[page-title]:class名の追加、削除、切り替え、置き換え、書き換え add() remove() toggle

参考サイト
: [JavaScript | class名の追加、削除、切り替え、置き換え、書き換えをする方法](https://1-notes.com/javascript-operate-class-name/)
: [JavaScriptのclassList.addメソッドを使ってclass属性を追加する方法を現役エンジニアが解説【初心者向け】](https://techacademy.jp/magazine/27026)
: [クラス名（class属性に値）を削除](https://shanabrian.com/web/javascript/remove-class.php)

## class属性への処理
class属性への主要な処理を一覧で紹介します。


|  メソッド| 用途 |
| -------- | -------- |
|elements.<span class="green bold">classList.add</span>(‘className’)	|要素にクラスを追加する|
|elements.<span class="green bold">classList.remove</span>(‘className’)	|要素からクラスを削除する|
|elements.<span class="green bold">classList.toggle</span>(‘className’)	|要素が持っている特定のクラスを切り替える|
|elements.<span class="green bold">classList.contains</span>(‘className’)	|クラスを持っているかを確認する|



## classList.add()でclass名を追加する

<div class="exp">
	<p class="tmp"><span>例1-1</span></p>
	ボタンをクリックする、#target_idの要素に、 classList.addを使って、「classB」クラスを追加します。
	<a href="sample/sample(add)/index1.html" target="_blank">新規タブ</a>
</div>

<p class="lang">JS</p>
```
document.querySelector('#target_id').classList.add('classB');
```

カンマ区切りによる複数のclass名の追加が可能です。
<div class="exp">
	<p class="tmp"><span>例1-2</span></p>
	ボタンをクリックする、#target_idの要素に、 classList.addを使って、「classB」と「classC」の複数のクラスを追加します。
	<a href="sample/sample(add)/index2.html" target="_blank">新規タブ</a>
</div>
<p class="lang">JS</p>
```
document.querySelector('#target_id').classList.add('classB','classC');
```

※既に存在するclass名を指定した場合、重複されて追加される事はありません。

## classList.remove()でclass名を削除する

classList.remove()は指定したclass名をHTML要素から削除します。

<div class="exp">
	<p class="tmp"><span>例2-1</span></p>
	ボタンをクリックすると、#target_idの要素の「classA」クラスを、 classList.removeを使って削除します。
	<a href="sample/sample(remove)/index1.html" target="_blank">新規タブ</a>
</div>

<p class="lang">JS</p>
```
document.querySelector('#target_id').classList.remove('classA');
```

## classList.toggle()でclass名を切り替える

classList.toggle()は、HTML要素に指定したclass名が付与されていたら削除し、付与されていなかったら追加します。  
いわゆるトグル（切り替え）を実行します。

<div class="exp">
	<p class="tmp"><span>例3-1</span></p>
	ボタンをクリックするごとに、#target_idの要素の「classA」クラスを、 classList.toggleを使って追加、削除の切り替えをしています。
	<a href="sample/sample(toggle)/index1.html" target="_blank">新規タブ</a>
</div>

<p class="lang">JS</p>
```
document.querySelector('#target_id').classList.toggle('classA');
```

### classList.toggle()でclassを切り替える（条件付き）

classList.toggle()は第二引数に条件を記述してclass名を追加するかどうかを指定可能な関数です。

この場合、条件を満たしていれば追加、満たしていなければ削除という処理を行います。  
満たしていれば切り替える、という処理ではないことに注意が必要です。

<div class="exp">
	<p class="tmp"><span>例3-2</span></p>
	ボタンをクリックすると、iの値が10以下ならば、#target_idの要素の「classC」クラスの追加、削除の切り替えをします。  
	ここでは条件を満たしているので、実行されます。  
	<a href="sample/sample(toggle)/index2.html" target="_blank">新規タブ</a>
		<span class="red">※追加はできるが、削除ができない、なぜ???</span>
</div>

<p class="lang">JS</p>
```
document.querySelector('#target_id').classList.toggle('classC', i <= 10);
```

## classList.replace()でclass名を置き換える

･･･未記入･･･


## setAttribute()でclass名を書き換える

setAttribute()でclassを書き換えるサンプルコードです。  
setAttribute()は要素の属性を追加する事が可能な関数ですが、既に値が存在している属性の場合は上書きされます。  
第一引数は属性名、第二引数に値を指定します。

この関数にてclassを指定した場合、HTML要素に既にひとつ、あるいは複数のclass名が指定されていても常に上書き処理となり書き換えられます。

<div class="exp">
	<p class="tmp"><span>例5-1</span></p>
	クラス「classA」を「classB」に書き換えます。
	<a href="sample/sample(setAttribute)/index1.html" target="_blank">新規タブ</a>
</div>

<p class="lang">HTML</p>
```
<div id="target_id" class="classA"></div>
```
<p class="lang">JS</p>
```
document.querySelector('#target_id').setAttribute('class', 'classB');
```







