*[page-title]:fetch() 非同期通信

*[page-title]:fetch() 非同期通信

fetch() メソッドは従来の XMLHttpRequest や jQuery の $.ajax() を使って実現していたような、 リモートリソースの非同期取り込みに使えます。

## fetch() の基本的な使い方

fetch() メソッドは次の形で使います。

<p class="tmp"><span>書式1</span></p>
```
fetch('http://...', { オプション })
.then((response) => {
    if (!response.ok) {
        throw new Error();
    }
    return response.blob(); // あるいは response.json()
})
.then((blob) => {

})
.catch((reason) => {
    // エラー
});
```

非同期呼び出しは Promise で実装されていて、then() で Response オブジェクトを受け取ります。  
ネットワークエラー以外は、基本的に最初の then() まで到達します。最初の then((response)) で response.ok や response.status をチェックすることで、サーバー側からの応答の状態を確認できます。  
エラーを検出したら、Error() オブジェクトをスローすることで、catch() に処理が移ります

## fetch() による HTTP リクエストの送信

### fetch() による GET リクエストの送信

fetch() メソッドで GET リクエストを送る場合は次のようにします。

<p class="tmp"><span>書式2</span></p>
```
fetch('/test1')
  .then((res) => {
      if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.blob();
  })
  .then((blob) => {
      // ...
  })
  .catch((reason) => {
      console.log(reason);
  });
```

### fetch() による POST リクエストの送信

フォームデータを POST する場合には、次のようにします。

<p class="tmp"><span>書式3</span></p>
```
const data = new FormData();
data.set('message', 'Hello!');

fetch('/test',
    {
        method: 'POST',
        cache: 'no-cache',
        body: data
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.blob();
    })
    .then((blob) => {
      // blob にレスポンスデータが入る
    })
    .catch((reason) => {
        console.log(reason);
    });
 ```
 
 JSON 文字列をポストする場合には、次のようにします。

HTTP ヘッダーでコンテント・タイプを指定する点と、JSON.stringify() を呼ぶ点です。

<p class="tmp"><span>書式4</span></p>
```
const data = {
    message: 'Hello'
};

fetch('/test',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.blob();
    })
    .then((blob) => {
        // blob にデータが入る
    })
    .catch((reason) => {
        console.log(reason);
    });

```

## レスポンスボディ部の読み取り

サーバーからのレスポンスのボディ部に画像ファイルデータや PDF ファイルなどのバイナリデータが返されている場合、 どのように読み取れば良いでしょうか？  
この場合、最初の then((response)) にて、return response.blob() とすることで、 レスポンスの内容を Blob オブジェクトに詰め込んで、次の then() に渡すことができます。  
一方、もしサーバーからの応答の内容が JSON 文字列だったりする場合には、ここで return res.json() とすることで、次の then((data)) に JSON から作り起こされたオブジェクトが渡されます。  
具体例は上の、HTTP リクエストの送信のところに書いてあるので、参考にしてください。  
以上、ここでは fetch() メソッドの基本的な使い方について説明しました。

## キャッシュをクリアー

参考サイト
:[【JS】Fetch APIが勝手にキャッシュを使用する件](https://mgmgblog.com/?p=2525)
:[Fetch API](https://ja.javascript.info/fetch-api#ref-1724)

Fetch APIは第二引数に様々なオプションを持たせることができるようで、その中の一つにキャッシュの設定もあります。  
下記のようにオプションとして cache:”no-store” を設定することで、キャッシュした画像などを取得することをやめてくれます。

```
fetch(filePath,{cache: "no-store"}) //第二引数にcacheオプション追加
.then(response => response.blob()) 
.then(data => {
　　～処理～
});
```

## 参考サイト

* [fetch の使い方](https://javascript.keicode.com/newjs/fetch.php)
<!--* [backboneからのajaxがpayloadでPHPの$_POSTで取得できない](https://egapool.hatenablog.com/entry/2015/07/28/225658)-->
* <a href="https://egapool.hatenablog.com/entry/2015/07/28/225658" target="_blank">backboneからのajaxがpayloadでPHPの$_POSTで取得できない</a>
* [[HTML5] Fetch API で GET/POST で通信する](https://blog.katsubemakito.net/html5/fetch1)
* [Fetch APIでファイルを読み込む](https://gray-code.com/javascript/load-file-with-fetch-api/)


