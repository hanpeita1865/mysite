*[page-title]:getElementById idの要素取得

参考サイト
: [【JavaScript入門】getElementByIdを完全理解する3つのコツ！](https://www.sejuku.net/blog/27019)

getElementByIdは、任意のHTMLタグで指定したIDにマッチするドキュメント要素を取得するメソッドです。  
引数としてIDであるStringオブジェクトを要し、戻り値は取得した要素です。任意の要素を抽出し、その内容を変更したい場合など、様々なシチュエーションで活躍する関数です。

基本的にIDはドキュメント内で重複してはならないので、getElementByIdによって取得される要素は一つです。重複してる場合は、最初の要素だけを取得します。