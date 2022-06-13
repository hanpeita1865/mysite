*[page-title]: マークダウン記述例

Font Awesomeチャートシートと使い方
: https://fontawesome.com/v5/cheatsheet
: https://h2ham.net/font-awasome/

Bootstrap4
: https://v4.bootstrap-guide.com/utilities/borders

Markdown Extraの記述方法
: [php Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)

## 見出しにid設置

<p class="tmp list"><span>マークダウン</span></p>
``` markdown
### 見出しH3 ### {#p2}
```
<p class="tmp">HTML</p>
```html
<h3 id="p2">見出しH3</h3>
```

### 見出しH3 ### {#p2}

## 画像やリンクにidやクラスを設置

<p class="tmp"><span>書式</span></p>
```
[link](url){#id .class}  //リンク
![img](url){#id .class} //画像
```


## リストと定義リストの組み合わせ
<p class="tmp list"><span>リスト</span></p>
```
* headの共通化を行った。対象ページ
: トップページ～index.php
:	leisure(余暇活動)～index.php、detail.php
:	map(バリアフリー)～index.php、detail.php 
:	work-tool(仕事編)～index.php、detail.php 
:	life-tool(生活編)～index.php、detail.php 
:	living-info/facility/art_museum～index.php
```

<p class="result"><span>結果</span></p>

* headの共通化を行った。対象ページ
: トップページ～index.php
:	leisure(余暇活動)～index.php、detail.php
:	map(バリアフリー)～index.php、detail.php 
:	work-tool(仕事編)～index.php、detail.php 
:	life-tool(生活編)～index.php、detail.php 
:	living-info/facility/art_museum～index.php

<p class="tmp list"><span>リスト</span></p>
```
* <span class="green">高品質な機能を簡単に利用できる</span>
: フレームワーク作成に長けた技術者が作っているので、通常のコーディングでは難しい内容のものを簡単に利用できるように工夫されています。

* <span class="green">セキュリティに配慮した作りになっている</span>
: セキュリティに配慮した作りのアプリケーションを作成しようとすると、それだけで骨が折れることが多々あります。そのような機能をもともとフレームワークは含んでいるので、簡単にセキュリティを高めたアプリケーションを作成できるようになっています。

* <span class="green">メンテナンス性が確保しやすい</span>
: 100%自作したアプリケーションの場合、ソースコード量も多くなり、それだけでメンテナンス性が下がります。一方、フレームワークを利用した場合、フレームワークのルールに従った差分コーディングを基本とするため、コーディングした部分のソースコードの見通しが立ち、全体としてメンテナンスしやすいアプリケーションとなりやすいです。

* <span class="green">フレームワーク部分は専門チームがメンテナンスしてくれる</span>
: 100%自作したアプリケーションの場合は、当然ですが、100%自分でメンテナンスする必要があります。それが、フレームワークを利用した場合は、フレームワーク部分については、そのフレームワークを作成した専門チームがメンテナンスしてくれます。コーディングだけでなく、メンテナンスも差分ですみます。
```
<p class="result"><span>表示結果</span></p>
* <span class="green">高品質な機能を簡単に利用できる</span>
: フレームワーク作成に長けた技術者が作っているので、通常のコーディングでは難しい内容のものを簡単に利用できるように工夫されています。

* <span class="green">セキュリティに配慮した作りになっている</span>
: セキュリティに配慮した作りのアプリケーションを作成しようとすると、それだけで骨が折れることが多々あります。そのような機能をもともとフレームワークは含んでいるので、簡単にセキュリティを高めたアプリケーションを作成できるようになっています。

* <span class="green">メンテナンス性が確保しやすい</span>
: 100%自作したアプリケーションの場合、ソースコード量も多くなり、それだけでメンテナンス性が下がります。一方、フレームワークを利用した場合、フレームワークのルールに従った差分コーディングを基本とするため、コーディングした部分のソースコードの見通しが立ち、全体としてメンテナンスしやすいアプリケーションとなりやすいです。

* <span class="green">フレームワーク部分は専門チームがメンテナンスしてくれる</span>
: 100%自作したアプリケーションの場合は、当然ですが、100%自分でメンテナンスする必要があります。それが、フレームワークを利用した場合は、フレームワーク部分については、そのフレームワークを作成した専門チームがメンテナンスしてくれます。コーディングだけでなく、メンテナンスも差分ですみます。

## （）付きリスト
<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="list-bra">
1. ああああああああああ
1. いいいいいいいいいい
1. うううううううううう
1. ええええええええええ
1. おおおおおおおおおお
1. かかかかかかかかかか
1. きききききききききき
1. くくくくくくくくくく
1. けけけけけけけけけけ
1. ここここここここここ
1. ささささささささささ
1. しししししししししし
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="list-bra">
1. ああああああああああ
1. いいいいいいいいいい
1. うううううううううう
1. ええええええええええ
1. おおおおおおおおおお
1. かかかかかかかかかか
1. きききききききききき
1. くくくくくくくくくく
1. けけけけけけけけけけ
1. ここここここここここ
1. ささささささささささ
1. しししししししししし
</div>

## リストの太い数字


<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="numbold">
1. SQL文字列を作成する。
2. プリペアドステートメントオブジェクトを取得する。
3. 変数をバインドする。
4. SQLを実行する。
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="numbold">
1. SQL文字列を作成する。
2. プリペアドステートメントオブジェクトを取得する。
3. 変数をバインドする。
4. SQLを実行する。
</div>




## 簡易テーブル

<p class="tmp list"><span>リスト</span></p>
```
headの共通化を行った対象ページの一覧です
:
トップページ～index.php
leisure(余暇活動)～index.php、detail.php
map(バリアフリー)～index.php、detail.php 
work-tool(仕事編)～index.php、detail.php 
life-tool(生活編)～index.php、detail.php 
living-info/facility/art_museum～index.php
```
<p class="result"><span>結果</span></p>
headの共通化を行った対象ページの一覧です
:
トップページ～index.php
leisure(余暇活動)～index.php、detail.php
map(バリアフリー)～index.php、detail.php 
work-tool(仕事編)～index.php、detail.php 
life-tool(生活編)～index.php、detail.php 
living-info/facility/art_museum～index.php

* 「:」は、tdが中央寄せ
* 「:--」は、左寄せ
* 「--:」は、右寄せ

### 全体を中央寄せ

`<div markdown="1" class="tb-center">`で囲む

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="tb-center">
<p class="tb-caption"><span>表10-3</span>systemctlの命令</p>
| 命令 | 内容 | 
| -------- | -------- |
| start     | サービスの起動     | 
| stop     | サービスの終了     | 
| restart     | サービスの再起動     | 
| reload     | サービスの再読み込み    | 
| status     | サービスの状態表示     | 
| is-enabled     | サービスが自動起動設定になっているかどうかの確認     | 
| enable     | サービスを自動起動に設定     | 
| disable     | サービスを自動起動させないように設定     | 
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="tb-center">
<p class="tb-caption"><span>表10-3</span>systemctlの命令</p>
| 命令 | 内容 | 
| -------- | -------- |
| start     | サービスの起動     | 
| stop     | サービスの終了     | 
| restart     | サービスの再起動     | 
| reload     | サービスの再読み込み    | 
| status     | サービスの状態表示     | 
| is-enabled     | サービスが自動起動設定になっているかどうかの確認     | 
| enable     | サービスを自動起動に設定     | 
| disable     | サービスを自動起動させないように設定     | 
</div>

### 横幅いっぱい

`<div markdown="1" class="tb-full">`で囲む

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="tb-full">
<p class="tb-caption"><span>表10-3</span>systemctlの命令</p>
| 命令 | 内容 | 
| -------- | -------- |
| start     | サービスの起動     | 
| stop     | サービスの終了     | 
| restart     | サービスの再起動     | 
| reload     | サービスの再読み込み    | 
| status     | サービスの状態表示     | 
| is-enabled     | サービスが自動起動設定になっているかどうかの確認     | 
| enable     | サービスを自動起動に設定     | 
| disable     | サービスを自動起動させないように設定     | 
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="tb-full">
<p class="tb-caption"><span>表10-3</span>systemctlの命令</p>
| 命令 | 内容 | 
| -------- | -------- |
| start     | サービスの起動     | 
| stop     | サービスの終了     | 
| restart     | サービスの再起動     | 
| reload     | サービスの再読み込み    | 
| status     | サービスの状態表示     | 
| is-enabled     | サービスが自動起動設定になっているかどうかの確認     | 
| enable     | サービスを自動起動に設定     | 
| disable     | サービスを自動起動させないように設定     | 
</div>

### thの枠線なし（.th-border-none）

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="flex-center th-border-none">
Slimに含まれている機能
:
<span class="green bold">ルーティング</span>
コンテナ
ミドルウエア
エラーハンドラ
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="flex-center th-border-none">
Slimに含まれている機能
:
<span class="green bold">ルーティング</span>
コンテナ
ミドルウエア
エラーハンドラ
</div>

## テーブル

### キャプション
<p class="tmp list"><span>リスト</span></p>
```
<p class="tb-caption"><span>表3-4</span>Composer のその他のコマンド一覧</p>
| コマンド | 引数 | 内容 |
| -------- | -------- | -------- |
|  require   | パッケージ     | 引数に該当するパッケージをcomposer.jsonに追記し、そのパッケージをダウンロード|
|  install   | なし     | composer.jsonに記述されたそのパッケージをダウンロード。     |
| outdated    | なし     | 現在インストールされているパッケージのうち、更新可能なものがあるかどうかを表示。     |
| update    | なし     |  現在インストールされているパッケージを最新のものに更新。    |
```

<p class="tmp">表示結果</p>
<p class="tb-caption"><span>表3-4</span>Composer のその他のコマンド一覧</p>
| コマンド | 引数 | 内容 |
| -------- | -------- | -------- |
|  require   | パッケージ     | 引数に該当するパッケージをcomposer.jsonに追記し、そのパッケージをダウンロード|
|  install   | なし     | composer.jsonに記述されたそのパッケージをダウンロード。     |
| outdated    | なし     | 現在インストールされているパッケージのうち、更新可能なものがあるかどうかを表示。     |
| update    | なし     |  現在インストールされているパッケージを最新のものに更新。    |

### 横に見出しセルのテーブル

この場合は、マークダウンでは無理なので、HTMLで記述します。
<p class="tmp list"><span>リスト</span></p>
```
<table>
	<tbody>
		<tr>
			<th>データベース名</th>
			<td>socymslimdb</td>
		</tr>
		<tr>
			<th>Text</th>
			<td>socymslimdbusr</td>
		</tr>
		<tr>
			<th>Text</th>
			<td>hogehoge</td>
		</tr>
	</tbody>
</table>
```

<p class="tmp">表示結果</p>
<table>
	<tbody>
		<tr>
			<th>データベース名</th>
			<td>socymslimdb</td>
		</tr>
		<tr>
			<th>Text</th>
			<td>socymslimdbusr</td>
		</tr>
		<tr>
			<th>Text</th>
			<td>hogehoge</td>
		</tr>
	</tbody>
</table>



#### thの背景を緑に設定（th-bg-green）

<p class="tmp list"><span>リスト</span></p>
```
<table class="th-bg-green">
	<tbody>
		<tr>
			<th>データベース名</th>
			<td>socymslimdb</td>
		</tr>
		<tr>
			<th>ユーザ名</th>
			<td>socymslimdbusr</td>
		</tr>
		<tr>
			<th>パスワード</th>
			<td>hogehoge</td>
		</tr>
	</tbody>
</table>
```

<p class="result"><span>結果</span></p>
<table class="th-bg-green">
	<tbody>
		<tr>
			<th>データベース名</th>
			<td>socymslimdb</td>
		</tr>
		<tr>
			<th>ユーザ名</th>
			<td>socymslimdbusr</td>
		</tr>
		<tr>
			<th>パスワード</th>
			<td>hogehoge</td>
		</tr>
	</tbody>
</table>


### 簡易テーブル

<p class="tmp list"><span>リスト</span></p>
```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```
<p class="result"><span>結果</span></p>

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

## 画像

基本は、みんばりのマークダウン用スタイルをつかっています。

[http://localhost:9400/how_to_fill/photo.php](http://localhost:9400/how_to_fill/photo.php)

### 画像に枠線を設置する
<p class="tmp"><span>書式</span>photo-borderクラスを設置して枠線を付ける</p>
```
<div markdown="1" class="photo-border">
![](画像ファイルパス)
</div>
```
<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="photo-border">
![](upload/Create_repository.png)
</div>
```


<p class="tmp">表示結果</p>
<div markdown="1" class="photo-border">
![](upload/Create_repository.png)
</div>



### 画像にキャプションを設置

title属性に入力した値を画像のキャプションに使っています。

<p class="tmp list"><span>マークダウン</span></p>
```
![](upload/Current_branch.png?classes=caption  "図1　画像タイトルです。")
```

<p class="tmp">HTML</p>
```
<figure>
	<img src="upload/Current_branch.png" alt="" title="図1　画像タイトルです。">
</figure>
```

<p class="result"><span>結果</span></p>
![](upload/Current_branch.png?classes=caption "図1　画像タイトルです。")

### モーダルウィンドウ（通常）

クラス「.modal-win」を設置します。  
サムネイルのサイズは、wdp～（px）かwd～（%）のクラスをつける。

<p class="tmp list"><span>リスト</span></p>
```
[![](upload/sample.jpg){.wdp350}](upload/sample.jpg){.modal-win}
```
[![](upload/sample.jpg){.wdp350}](upload/sample.jpg){.modal-win}

#### タイトルを設置

<p class="tmp list"><span>リスト</span></p>
```
[![](upload/sample.jpg "タイトル"){.wdp350}](upload/sample.jpg){.modal-win}
```
[![](upload/sample.jpg "タイトル"){.wdp350}](upload/sample.jpg){.modal-win}

### モーダルウィンドウ（Modaal）

クラス「.image」を設置すると、Modaalの設定になります。
<p class="tmp list"><span>リスト</span></p>
```
[![](upload/sample_01.jpg "タイトル"){.image}](upload/sample_01.jpg)
```

[![](upload/sample_01.jpg "タイトル"){.image}](upload/sample_01.jpg)

<p class="tmp list"><span>リスト</span>サムネイルサイズ設定</p>
```
[![](upload/sample_01.jpg "タイトル"){.image}](upload/sample_01.jpg){.wdp300}
```

[![](upload/sample_01.jpg "タイトル"){.image}](upload/sample_01.jpg){.wdp300}


## ボックス枠

### グレーのボックス（gray-box）

グレーの枠線を設置します。

<div markdown="1" class="gray-box">
* フレームワークは、パターン化された処理の流れと、そこに含まれる定型処理をあらかじめ組み込んだもの。
* フレームワークを利用する場合は、処理の流れをフレームワークに任せる制御の反転が起こる。
* フレームワークを利用すると、高品質でメンテナンスしやすいアプリが作れるメリットがある。
</div>


### 緑のボックス（green-box）

緑のボックスを設置して、中のリストマークも緑になります。

<p class="tmp list"><span>リスト</span>●マーク付</p>
```
<div markdown="1" class="green-box">
* フレームワークは、パターン化された処理の流れと、そこに含まれる定型処理をあらかじめ組み込んだもの。
* フレームワークを利用する場合は、処理の流れをフレームワークに任せる制御の反転が起こる。
* フレームワークを利用すると、高品質でメンテナンスしやすいアプリが作れるメリットがある。
</div>
```

<div markdown="1" class="green-box">
* フレームワークは、パターン化された処理の流れと、そこに含まれる定型処理をあらかじめ組み込んだもの。
* フレームワークを利用する場合は、処理の流れをフレームワークに任せる制御の反転が起こる。
* フレームワークを利用すると、高品質でメンテナンスしやすいアプリが作れるメリットがある。
</div>

<p class="tmp list"><span>リスト</span>数字付</p>
```
<div markdown="1" class="green-box">
1. Slimが利用できるようになる。
1. Slimを利用したMVCアプリケーションが作成できるようになる。
1. Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
1. Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>
```

<div markdown="1" class="green-box">
1. Slimが利用できるようになる。
1. Slimを利用したMVCアプリケーションが作成できるようになる。
1. Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
1. Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>


### チェックマーク（.green-box.check-list）

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="green-box check-list">
* limが利用できるようになる。
* Slimを利用したMVCアプリケーションが作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>
```

<div markdown="1" class="green-box check-list">
* limが利用できるようになる。
* Slimを利用したMVCアプリケーションが作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>



### チェックマーク2（.green-box.check-list2）

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="green-box check-list2">
* limが利用できるようになる。
* Slimを利用したMVCアプリケーションが作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>
```

<p class="result"><span>結果</span></p>
<div markdown="1" class="green-box check-list2">
* limが利用できるようになる。
* Slimを利用したMVCアプリケーションが作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用を意識した開発環境で作成できるようになる。
* Slimを利用したMVCアプリケーションを本運用環境で稼働させるようになる
</div>

### メモボックス（.memo-box）

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="memo-box">
上のように表示されるはずなのですが、自分のは以下のように出ます。

でも、登録はちゃんとされます。
</div>
```

<div markdown="1" class="memo-box">
上のように表示されるはずなのですが、自分のは以下のように出ます。

でも、登録はちゃんとされます。
</div>

### Columnボックス（.column-box）

<p class="tmp list"><span>リスト</span></p>
```
<div markdown="1" class="column-box">
上のように表示されるはずなのですが、自分のは以下のように出ます。  
でも、登録はちゃんとされます。
</div>
```

<div markdown="1" class="column-box">
上のように表示されるはずなのですが、自分のは以下のように出ます。  
でも、登録はちゃんとされます。
</div>


## 書式タグなど

### ~~コードの折り返し設定（.pre-wrap）~~←削除しました。 標準で折り返しを設定

<p class="tmp cmd pre-wrap"><span>コマンド</span></p>
```
createdb --encoding=UTF-8 --locale US.UTF-8 --template=template0 --owner=socymslimdbusr --username=socymslimdbusr socymslimdb
```
<p class="tmp list"><span>マークダウン</span></p>
```
<p class="tmp cmd pre-wrap"><span>コマンド</span></p>
～コード記入～
```

<div markdown="1" class="pre-wrap">
```
$sqlInsert = "INSERT INTO members (mb_name_last, mb_name_first, mb_birth, mb_type) VALUES (:mb_name_last, :mb_name_first, :mb_birth, :mb_type)";
```
</div>

```
<div markdown="1" class="pre-wrap">
～コード記入～
</div>
```

## リンクの参照

同じリンクの参照を何度も利用する場合は、リンク先への参照を定義することができます。


[こっちからgoogle][google]

その他の文章

[こっちからもgoogle][google]

[google]: https://www.google.co.jp/

```
[こっちからgoogle][google]

その他の文章

[こっちからもgoogle][google]

[google]: https://www.google.co.jp/
```


## 定義リスト

<p class="tmp list"><span>リスト</span></p>
```
Term 1

:   This is a definition with two paragraphs. Lorem ipsum 
    dolor sit amet, consectetuer adipiscing elit. Aliquam 
    hendrerit mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus.

:   Second definition for term 1, also wrapped in a paragraph
    because of the blank line preceding it.

Term 2

:   This definition has a code block, a blockquote and a list.

        code block.

    > block quote
    > on two lines.

    1.  first list item
    2.  second list item
```

<p class="result"><span>結果</span></p>

Term 1

:   This is a definition with two paragraphs. Lorem ipsum 
    dolor sit amet, consectetuer adipiscing elit. Aliquam 
    hendrerit mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus.

:   Second definition for term 1, also wrapped in a paragraph
    because of the blank line preceding it.

Term 2

:   This definition has a code block, a blockquote and a list.

        code block.

    > block quote
    > on two lines.

    1.  first list item
    2.  second list item

## 新規タブとiframeを記入

```
<a href="sample/～.html" target="_blank">新規タブ</a>
<iframe width="100%" height="250" src="sample/～.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
```

## 注釈（.text-note）
※の直後に半角スペースを付ける。
<p class="tmp list"><span>リスト</span></p>
```
<p class="text-note">※ デプロイとは～作ったプログラムをしかるべき場所に置いたり、あれやこれやの設定をしたりして、使える状態にすること。</p>
```

<p class="text-note">※ デプロイとは～作ったプログラムをしかるべき場所に置いたり、あれやこれやの設定をしたりして、使える状態にすること。</p>

## マーカー

このテキストに<span class="marker-yellow">マーカー</span>をつけます。

このテキストに<span class="marker-yellow50">マーカー</span>をつけます。

このテキストに<span class="marker-yellow50 bold">マーカー</span>をつけます。

このテキストに<span class="marker-pink50">マーカー</span>をつけます。

このテキストに<span class="marker-green50">マーカー</span>をつけます。

このテキストに<span class="marker-blue50">マーカー</span>をつけます。

このテキストに<span class="marker-orange50">マーカー</span>をつけます。
```
このテキストに<span class="marker-yellow">マーカー</span>をつけます。
このテキストに<span class="marker-yellow50">マーカー</span>をつけます。
このテキストに<span class="marker-yellow50 bold">マーカー</span>をつけます。

このテキストに<span class="marker-pink50">マーカー</span>をつけます。

このテキストに<span class="marker-green50">マーカー</span>をつけます。

このテキストに<span class="marker-blue50">マーカー</span>をつけます。

このテキストに<span class="marker-orange50">マーカー</span>をつけます。
```

## iframeでサンプル表示

uploadフォルダに格納したサンプルのフォルダ名やファイル名と高さを記入する。

<p class="tmp"><span>書式</span>iframe</p>
```
<iframe width="100%" height="高さ" src="upload/ファイル名" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
```
