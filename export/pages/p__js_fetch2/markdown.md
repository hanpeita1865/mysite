*[page-title]:Fetch APIでファイルを読み込み

*[page-title]:Fetch APIでファイルを読み込み

Fetch APIを使って指定したURLからテキストファイルや画像ファイルなどを読み込む方法について解説します。


### ポイント
* 読み込むデータのファイル形式によって、Responseオブジェクトからファイルを取得するメソッドを切り替える
* 画像、音声、動画のようなリソースファイルを読み込むときはURL.createObjectURLメソッドを使ってページに挿入すると表示できる




Fetch APIはサーバーにリクエスト（要求）を送信することで各種ファイルを読み込むことができます。

ファイルはどの形式でも読み込むことができますが、取得するファイル形式ごとにレスポンスデータの処理が必要になります。  
以降では、以下の形式の各種ファイルをFetch APIで取得する例を上から順に解説していきます。


ファイル形式はそれぞれ異なりますが、読み込むまでの流れは共通です。  
解説では以下のHTMLコードにあるid属性「file_area」を持つdiv要素の中に、読み込んだファイルを挿入してページに表示します。

## テキストファイルの読み込み

(1)でfetchメソッドに取得したいファイルのURL（パス）を指定して、リクエストを送信します。

(2)では受け取ったレスポンスデータからtextメソッドを実行して、テキストファイルを取得します。  
ここで取得したデータは次のthenメソッドに引数として渡します（変数dataにデータをセット）。

最後に(3)で、(2)から受け取ったデータをdiv要素に挿入します。  
今回は通常のテキストですが、テキストファイル内の改行を反映するためにdiv要素のinnerHTMLプロパティに文字列を挿入します。

<p class="tmp">JS</p>
```
//テキストファイルを読み込む
window.addEventListener('DOMContentLoaded', () => {
    fetch('text/test.txt') // (1) リクエスト送信
        .then(response => response.text()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            file_area.innerHTML = data.replace(/\n/g, "<br>");
        });
});
```


<div class="exp">
	<p class="tmp"><span>例1</span></p>
テキストファイルをFetch APIで読み込みます。  
ページの読み込みが完了したときに発生するイベントDOMContentLoadedを検知したら、Fetch APIによるファイル取得を実行します。
<a href="sample/sample1(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="250" src="sample/sample1(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

### エラー時の対応コード（catch）を追記

<a href="sample/sample1-1(fetch)" target="_blank">新規タブ</a>

<p class="tmp list"><span>リスト</span></p>
```
fetch('files/today/20220730.txt')
	.then((response) => {
		if (!response.ok) {
			throw new Error();
		}
		return response;
	})
	.then(response => response.text()) // (2) レスポンスデータを取得
	.then(data => { // (3)レスポンスデータを処理
		console.log('成功');

	})
	.catch((reason) => {
		console.log('エラー');
	});
```

## JSONファイルを読み込む
ファイルをFetch APIで読み込み、それぞれの「title」と「release_date」のデータを取り出してページに表示します。

レスポンスで受け取ったJSONデータはresponseTextプロパティに入っています。  
この時点ではただの文字列なので、このデータをJSON.parseメソッドを使ってオブジェクト形式に変換します。

変換したデータをfor文に渡して、「title」と「release_date」のデータを取得してli要素を作成します。  
作成したli要素はul要素に追加していきます。

for文を抜けたあとはここまで作成したul要素をdiv要素に挿入し、データを表示します。

<p class="lang">JS</p>
```
//JSONファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('text/test.json') // (1) リクエスト送信
        .then(response => response.json()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const ul_element = document.createElement('ul');

            for (var d of data) {

                const li_element = document.createElement('li');
                li_element.textContent = d.title + " (リリース日：" + d.release_date + ")";

                ul_element.appendChild(li_element);
            }

            file_area.appendChild(ul_element);

        });
});
```

<div class="exp">
	<p class="tmp"><span>例2</span></p>
JSON形式のテキストファイルを読み込んでページに表示します。
<a href="sample/sample2(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="250" src="sample/sample2(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## XMLファイルを読み込む
XML形式のファイルについては、先述のJSONファイルを読み込む時に使ったjsonメソッドのようなメソッドは用意されていません。　　
そこで、一度テキストファイルとしてtextメソッド読み込んでから、XMLDocumentに変換してデータを取得していきます。

変数sitemapに入ったXMLDocumentはHTML同様にDOMツリーの操作を行うことができるようになります。  
そのため、特定の要素を全て取得したいときはquerySelectorAllメソッドに「url」を指定したり、特定の要素を1つだけ取得するときはquerySelectorメソッドを使うことが可能です。

要素内のテキストについても、HTML操作と同様にtextContentプロパティから参照します。  
最後のthenメソッドでは、まず最初に変数dataをDOMParserオブジェクトのparseFromStringメソッドでXML解析して、通常のテキストからXMLDocumentに変換します。

<p class="lang">JS</p>
```
//XMLファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('text/test.xml') // (1) リクエスト送信
        .then(response => response.text()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const parser = new DOMParser();
            const sitemap = parser.parseFromString(data, "application/xml");

            const urls = sitemap.querySelectorAll('url');
            const ul_element = document.createElement('ul');

            for (var url_data of urls) {

                const li_element = document.createElement('li');
                const url = url_data.querySelector("loc");
                const last_update = url_data.querySelector("lastmod");

                li_element.innerHTML = "URL：" + url.textContent + "<br>最終更新日：" + last_update.textContent;
                ul_element.appendChild(li_element);
            }

            file_area.appendChild(ul_element);

        });
});
```

<div class="exp">
	<p class="tmp"><span>例3</span></p>
XML形式のテキストファイルを読み込んでページに表示します。
<a href="sample/sample3(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="550" src="sample/sample3(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## HTMLを読み込む
ファイルをFetch APIで読み込み、querySelectorAllメソッドを使って全てのp要素を取り出してid属性「file_area」を持つdiv要素に挿入します。
<p class="lang">JS</p>
```
//HTMLファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('text/test.html') // (1) リクエスト送信
        .then(response => response.text()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const parser = new DOMParser();
            const html = parser.parseFromString(data, "text/html");

            const p_elements = html.querySelectorAll('p');
            const file_area = document.getElementById("file_area");

            for (var p of p_elements) {
                file_area.appendChild(p);
            }

        });
});
```

<div class="exp">
	<p class="tmp"><span>例4</span></p>
HTML形式のテキストファイルを読み込んでページに表示します。
<a href="sample/sample4(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="400" src="sample/sample4(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 画像ファイルを読み込む

画像ファイルのようなリソースファイルを読み込むときは、Responseオブジェクトのblobメソッドを実行するとレスポンスデータから画像ファイルを取得することができます。

読み込んだ画像データはBlobオブジェクトでそのままでは表示できないため、URL.createObjectURLメソッドを実行してファイルのURLを取得してからimg要素のsrc属性に設定して表示します。

<p class="tmp">JS</p>
```
//画像ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('image/bear.png') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const img_element = document.createElement('img');

            img_element.src = URL.createObjectURL(data);
            file_area.appendChild(img_element);

        });
});
```

<div class="exp">
	<p class="tmp"><span>例5</span></p>
画像ファイルを読み込んでページに表示します。  
ファイル形式はJPEG形式、PNG形式、GIF形式のいずれも可能です。
<a href="sample/sample5(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="400" src="sample/sample5(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 音声ファイルを読み込む

画像、音声、動画などのリソースファイルを読み込むときは、Responseオブジェクトのblobメソッドを実行するとレスポンスデータからリソースファイルを取得することができます。

読み込んだ音声ファイルはBlobオブジェクトなのでそのままではページに挿入することができません。  
そこで、URL.createObjectURLメソッドを実行してURLを取得してからaudio要素のsrc属性に設定します。

音声ファイルが再生可能な状態まで読み込まれたらコントローラが表示され、再生や一時停止、ボリュームの調整など各種操作を行うことができるようになります。

<p class="tmp">JS</p>
```
//音声ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('audio/sawano.mp3') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const audio_element = document.createElement('audio');

            audio_element.src = URL.createObjectURL(data);
            audio_element.controls = true;
            file_area.appendChild(audio_element);

        });
});
```

<div class="exp">
	<p class="tmp"><span>例6</span></p>
</div>
音声ファイルを読み込んでページで再生できるようにします。  
読み込むファイルはブラウザが対応している形式であれば、mp3形式、aac形式、wav形式などいずれの形式も可能です。
<a href="sample/sample6(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="250" src="sample/sample6(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


## 動画ファイルを読み込む ##{#p7}

画像ファイルや音声ファイルのときと同様に、動画ファイルもResponseオブジェクトのblobメソッドを実行してレスポンスデータからリソースファイルを取得します。

読み込んだ動画ファイルはBlobオブジェクトなので、そのままではページに挿入することができません。  
そこで、URL.createObjectURLメソッドでURLを取得してvideo要素のsrc属性に設定します。  

動画ファイルが再生可能な状態まで読み込まれたらページに表示され、コントローラより再生や一時停止、ボリュームの調整など各種操作を行うことができるようになります。

<p class="tmp">JS</p>
```
//動画ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('/movie/mizuli.mp4') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const video_element = document.createElement('video');

            video_element.src = URL.createObjectURL(data);
            video_element.controls = true;
            file_area.appendChild(video_element);

        });
});
```

<div class="exp">
	<p class="tmp"><span>例7</span></p>
動画ファイルを読み込んでページで再生できるようにします。  
読み込むファイルはブラウザが対応していればmp4形式、webm形式、ogg形式などいずれの形式も可能です。  
XMLHttpRequestオブジェクトで読み込み、video要素を作成してsrc属性に動画ファイルのパスを挿入して再生できる状態にします。
<a href="sample/sample7(fetch)/" target="_blank">新規タブ</a>
<iframe width="100%" height="350" src="sample/sample7(fetch)/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

## 参考サイト

* [Fetch APIでファイルを読み込む](https://gray-code.com/javascript/load-file-with-fetch-api/)
* [JavaScriptを実行したブラウザでFetch APIが使えるか確認する](https://gray-code.com/javascript/how-to-check-if-browser-is-available-to-use-fetch-api/)
* [【JavaScript】FetchAPIとaxiosの違いって？機能やメリットを比較](https://shimablogs.com/fetch-api-axios-difference)

