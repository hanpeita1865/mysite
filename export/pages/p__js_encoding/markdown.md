*[page-title]:エンコード

## Encoding APIについて

参考サイト
: [符号化について（Encoding API）](https://hakuhin.jp/js/encoding.html)

Encoding APIは、String 型と ArrayBuffer 型のデータを、相互変換できます。

### 「ArrayBuffer」から「文字列」に変換する

TextDecoder オブジェクトを作成する

<p class="tmp"><span>書式</span>TextDecoder</p>
```
new TextDecoder( "label" , options )
```

| | | |
|--|--|--|
|**第1引数(略可)**|	String	|文字コードを指定。デフォルトは "utf-8"|
|**第2引数(略可)**|	TextDecoderOptions	TextDecoderOptions |オブジェクトを指定。|
|**戻り値**|	TextDecoder|	新しい TextDecoder オブジェクトが得られる。|

#### 第1引数

変換したい文字コードを指定します。  
省略した場合、"utf-8" と解釈します。  
文字コードは、事前に知っている必要があります。
自動的に類推される事はありません。

下の表は、文字コードの一例です。
ブラウザが対応していない場合、エラーが発生します。

|文字列|	説明|
|--|--|
|"utf-8"|	Unicode (UTF-8)|
|"utf-16"| |
|"utf-16le"|	Unicode (UTF-16、リトルエンディアン)|
|"utf-16be"|	Unicode (UTF-16、ビッグエンディアン)|
|"utf-32"|	Unicode (UTF-32)|
|"euc-jp"|	日本語（EUC）|
|"iso-2022-jp"|	日本語（JIS）|
|"shift_jis"|	日本語（Shift-JIS）|


#### 第2引数（TextDecoderOptions）
　
Object オブジェクトを作成し、以下のプロパティを追加します。

|プロパティ名 |型 |説明|デフォルト|
|--|--|--|--|
|fatal|Boolean |符号化の違反を確認する場合、true を指定 |false |
|ignoreBOM |Boolean |BOM情報を考慮しない場合、true を指定 |false |
　
 
<div class="exp">
	<p class="tmp"><span>例1</span>TextDecoder オブジェクトを作成する</p>
<iframe width="100%" height="200" src="//jsfiddle.net/hirao/0r3vsjem/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>
　
<div class="exp">
	<p class="tmp"><span>例2</span>TextDecoder オブジェクトを作成する（オプション指定）</p>
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/fjqcxu2m/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


### 「ArrayBuffer」から「文字列」にデコードする

<span class="green bold">decode() </span>メソッドを使用します。  
このメソッドは、同期的に実行されます。  
分割して、少しずつ複数回実行する事もできます。


<p class="tmp"><span>書式</span></p>
```
TextDecoder.decode ( input , options )
```


**第1引数(略可)**	ArrayBufferView	～ソースとなるバッファを指定。  
**第2引数(略可)**	TextDecodeOptions	TextDecodeOptions ～ オブジェクトを指定。  
**戻り値**	String	～ 変換後の文字列が得られる。



<div class="exp">
	<p class="tmp"><span>例3</span>UTF-8 のバイナリをデコードする</p>
	<iframe width="100%" height="400" src="//jsfiddle.net/hirao/qo8xkptf/1/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>



<div class="exp">
	<p class="tmp"><span>例4</span>Shift-JIS のバイナリをデコードする</p>
	<iframe width="100%" height="420" src="//jsfiddle.net/hirao/k7hy8o94/6/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


#### TextDecoder クラスのプロパティについて
　
以下の、読み取り専用のプロパティがあります。

| プロパティ名|型|説明|
| -------- | -------- | -------- |
|encoding|String|文字コードを取得する|
|fatal|Boolean|符号化の違反を確認するか？（エラーモードの有無）|
|ignoreBOM|Boolean|BOM情報を考慮しないか？|


### 「文字列」から「ArrayBuffer」に変換する

TextEncoder オブジェクトを作成する。  
new 演算子を使って、TextEncoder コンストラクタをインスタンス化します。

<p class="tmp"><span>書式</span>TextEncoder</p>
```
new TextEncoder( "label" ) :TextEncoder
```

**第1引数(略可)**	String ～	文字コードを指定。デフォルトは "utf-8"  
**戻り値**	TextEncoder ～	新しい TextEncoder オブジェクトが得られる。








