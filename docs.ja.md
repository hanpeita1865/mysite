---
title: '05. Drag&Drop'
taxonomy:
    category:
        - docs
---

Drag & Drop API（以降、DnDと呼びます）は、ページ内の要素をドラッグで動かし、ほかの場所に移動させたり、ブラウザ外からファイルをページにドロップしたりといった操作を可能にするHTML5のAPIです。

次のような機能を実装することができます。

* 要素の順番や位置を入れ替える
* ローカルにある画像やテキストをブラウザにドロップして読み込む

## イベントの種類 ##{.h-type2}

|イベント名 |	発生するタイミング|
| ------- | ----------------- |
|**dragstart** |ドラッグ開始時|
|**drag** |	ドラッグしている間|
|**dragend** |ドラッグ終了時|
|**dragenter** |ドラッグしている要素がドロップ領域に入ったとき|
|**dragover** |ドラッグしている要素がドロップ領域にある間|
|**dragleave** |ドラッグしている要素がドロップ領域から出たとき|
|**drop** |ドラッグしている要素がドロップ領域にドロップされたとき|


## DataTransferオブジェクト ##{.h-type2}

**DataTransferオブジェクト**は、ドラッグしている要素のデータを保持するために使います。DataTransferオブジェクトはDnDで発生するイベント内からのみアクセスすることができます。

### DataTrasnferオブジェクトのメソッド ###{.h-type3}
DataTransferオブジェクトにはデータの保持以外にも役割があります。

|メソッド名 |役割|
| --------- | --- |
|**setData** |データセットする|
|**getData** |セットされているデータを取得する|
|**setDragImage** |ドラッグ中に表示されるイメージを変更する|

**setData**は、{c:red}setData('text', 'hogehoge'){/c}のように、第一引数にタイプを指定してデータをセットします。セットしたデータは、{c:red}getData('text'){/c}とすることで取得できます。
**setDragImage**ではドラッグ中に表示されるイメージを変更することができます。セットしない場合はドラッグしている要素自体が使われます。


### DataTrasnferオブジェクトのプロパティ ###{.h-type3}

プロパティはsetDataでセットされたデータに関する情報や、ドロップされたファイルの情報を持っています。

|プロパティ名 |機能 |
| ----------- | --- |
|**files** |ドロップされたファイルの情報を保持。File APIのFileList形式で格納される。|
|**types** |setDataでセットされたデータの種類が格納されている。|
|**dropEffect** |設定した値が格納される。初期値はnone |
|**effectAllowed** |設定した値が格納される。初期値はall|

<div class="box-example" markdown="1">
### 例1 ### {.h-example}
点線の枠の中にファイルを**Drag&Drop**すると、Consoleにそのファイルのfilesプロパティが表示されます。
[新規タブ](../../../sample/DnD/sample4(DnD)/index.html?target=_blank)

<iframe width="100%" height="400" src="../../sample/DnD/sample4(DnD)/index.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

##### **JS**

    $(function(){  
        var obj = $("#DnDBox");

        //ドラッグしているファイルがドロップ領域に入ったとき
        obj.on('dragenter', function (e) {
            e.stopPropagation(); //イベントを停止する
            e.preventDefault(); //画面遷移を行わない
            $(this).css('border', '4px solid #000');
        });

        //ドラッグしているファイルがドロップ領域にある間
        obj.on('dragover', function (e) {  
            e.stopPropagation();  
            e.preventDefault();  
            $(this).css('border', '4px solid #000');  
        });

        //ドラッグしているファイルがドロップ領域にドロップされたとき
        obj.on('drop', function (e) {  
            $(this).css('border', '4px dashed #000');
            e.preventDefault(); 

            var dropFile = e.originalEvent.dataTransfer.files;//filesプロパティを変数に格納
            console.log(dropFile);//格納したファイルのfilesプロパティを表示
        });
    });

<div class="box-example" markdown="1">
### 例2 ### {.h-example}
緑のボックス（#box）をドラッグすると、ウサギのイメージ画像が表示される。青のボックスでは、表示されない。
[新規タブ](../../../sample/DnD/sample5(DnD)/index.html?target=_blank)

<iframe width="100%" height="250" src="../../sample/DnD/sample5(DnD)/index.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

##### **HTML**

    <div>  
		<div id="box" class="box green" draggable="true"></div>
		<div class="box blue" draggable="true"></div> 
    </div>  

##### **JS**

    var dragImage = document.createElement('img');//img要素を作成
    dragImage.src = 'image/0-01.png'; //ドラッグしてるときのイメージ画像を設定

    $('#box').on('dragstart', onDragStart);//#boxのドラッグを開始したときに、作成したonDragStart関数を行う

    function onDragStart(e) {
        //DataTrasnferオブジェクトにidを設定
        e.originalEvent.dataTransfer.setData('text', this.id);
        //DataTrasnferオブジェクトにイメージを設定
        e.originalEvent.dataTransfer.setDragImage(dragImage, 40, 40);
    }

<div class="box-example" markdown="1">
### 例3 ### {.h-example}

DnDしたファイルのリストを表示させる。[新規タブ](../../../sample/DnD/sample6(DnD)/index.html?target=_blank)

<iframe width="100%" height="450" src="../../sample/DnD/sample6(DnD)/index.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

##### **JS**

    var waitList=[];  //追加するファイル用の配列変数

    //ファイルをDnDしたときの関数
    function addWaitList(files){  
        for(var i=0;i<files.length;i++){ //新しくDnDしたファイルらを一個一個チェックしてから、waitListに追加
            var sameName=-1;  
            //新しくDnDしたファイル名と既にwaitListにあるファイル名とを比較してチェック
            for(var j=0;j<waitList.length;j++){ 
                if(files.item(i).name==waitList[j].name){ //ファイル名が同じのがあった場合、
                    sameName=j;  
                    break; //同じ名前のファイルがあればこのファイルの処理を停止
                }  
            }	

            if(sameName<0){//初期値(sameName=-1)のとき(同じ名前がなかったとき)

                waitList.push(files.item(i));//ファイルを配列変数に追加
                //追加したファイル名をリストに表示
                $("#waitingList").append('<li><span class="filename">'+files.item(i).name +'</span><button class="fileDelete">削除</button></li>');

            }else{
                if(window.confirm(files.item(i).name +'と同じ名前のファイルがあります。上書きしますか?')){
                    waitList[sameName]=files.item(i);//ファイルを上書き			   
                }
            }
        }  
    }  

    $(function(){  
        var obj = $("#DnDBox");

        //ドラッグしているファイルがドロップ領域に入ったとき
        obj.on('dragenter', function (e) {
            e.stopPropagation();  
            e.preventDefault();  
            $(this).css('border', '4px solid #000');
        });

        //ドラッグしているファイルがドロップ領域にある間
        obj.on('dragover', function (e) {  
            e.stopPropagation();  
            e.preventDefault();  
            $(this).css('border', '4px solid #000');  
        });

        //ドラッグしているファイルがドロップ領域にドロップされたとき
        obj.on('drop', function (e) {  
            $(this).css('border', '4px dashed #000');
            e.preventDefault(); 

            var dropFile = e.originalEvent.dataTransfer.files;
            addWaitList(e.originalEvent.dataTransfer.files);
        });

        //クリアボタンを押すと、全削除
        $('#clearWaitList').on('click',function(){
            $('#waitingList li').remove();  
            waitList=[];  
        });


        //ファイル削除を押したときの処理
        $('ul').on('click', '.fileDelete', function() {
            var delObj = $(this);
            var delName = $(this).prev('span').text();
            var fileIndex = $(this).parent('li').index();

            waitList.splice(fileIndex, 1);

            //リストのファイル表示削除
            delObj.parent('li').remove();
        }); 
    });  


<div class="box-example" markdown="1">
### 例4 ### {.h-example}

DnDしたファイルをアップロードする。[新規タブ](../../../sample/DnD/sample7(DnD)/index.html?target=_blank)

<iframe width="100%" height="450" src="../../sample/DnD/sample7(DnD)/index.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

##### **例3のJSにアップロード用のスクリプトを追加**

     //アップロードボタンを押したときの処理
    $('#upload').on('click',function(){
		if(window.confirm('アップしていいですか？')){//確認メッセージ
			total = 0;
			// ファイルを上げに行く  
			var fd= new FormData();  
			for(var i=0;i<waitList.length;i++) {
				fd.append('file['+i+']', waitList[i]);//ファイル追加
			}


			//FormDataを格納した変数fdをupload.phpに送信
			$.ajax({  
				url: "upload.php",  
				type: "POST",  
				contentType: false,  
				processData: false,  
				cache: false,  
				data: fd,  
				success: function(data) {  
					$('#waitingList').children('li').remove();  
					waitList=[];
					alert('アップロードに成功しました');  
				},  
				error: function(data) {  
				   alert('アップロードに失敗しました');  
				}  
			});  
		}
    });  

##### **upload.php**

    <?php
    //フォルダがなければ作成する
    if(!file_exists('upload')){
        mkdir('upload');
    }

    $file = array();

    if (!empty($_FILES['file'])){  
        foreach ($_FILES['file'] as $string=>$naiyou){  
            foreach ($naiyou as $key=>$val){  
                $file[$key][$string] = $val;  
            }  
        }  
        foreach ($file as $key=>$val){  
            move_uploaded_file($val['tmp_name'], 'upload/'.$val['name']);  
        }  
    }  
    ?>  

<div class="box-example" markdown="1">
### 例5 ### {.h-example}

DnDと&lt;input type"file"&gt;で取得したファイルををアップロードする。[新規タブ](../../../sample/DnD/sample8(DnD)/index.html?target=_blank)  
アップすると、例5のリストに表示されます。

<iframe width="100%" height="350" src="../../sample/DnD/sample8(DnD)/index.html" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>


##### **HTML**
&lt;input type"file"&gt;は非表示にして、labelをファイル取得のボックスにしています。

    <div>
		<input type="file" name="clickFile" id="file" class="d-none" onchange="changeFile(this);">
        <label id="DnDBox" for="file">  
            クリックするか<br>ここにファイルをドラッグ&amp;ドロップしてください  
        </label>  
        <ul id="waitingList">  
        </ul>  
    </div>  
    <input type="button" id="clearWaitList" value="クリア">  
    <input type="button" id="upload" value="アップロード"> 
    
##### **JS**
例4のJSにボックスをクリックしてファイルを追加するスクリプトを加える。

    function changeFile(obj){ //inputでファイルを選択した時（★同じファイルを選択した時は発動しない）
        addWaitList($('input[name=clickFile]')[0].files);//addWaitListで同じ名前のファイルがないかチェックして配列に格納
    }

<div class="box-example" markdown="1">
### 例6 ### {.h-example}

例5でアップしたuploadフォルダにあるファイルを表示し、削除ボタンも設置。[新規タブ](../../../sample/DnD/sample8(DnD)/file_list.php?target=_blank)  
（例5でファイルをアップし、ブラウザを更新すると、アップしたファイルが表示される）

<iframe width="100%" height="350" src="../../sample/DnD/sample8(DnD)/file_list.php" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>

***

**glob関数**は、引数に値を渡すだけで戻り値としてディレクトリ内のファイル一覧を配列形式で取得することが可能です。

##### **file_list.php**

	<p>uploadフォルダ内のファイル一覧</p>
	<ul id="waitingList">
	<?php
		$uplist = glob('./upload/*');//grob関数を使って、フォルダのファイル名を配列変数に格納

		for ($i=0; $i<count($uplist); $i++) {
			$file_name = basename($uplist[$i]);//ファイル名だけを抜き出す
			echo '<li><span class="filename">'.$file_name.'</span><button class="upfileDelete">削除</button></li>';
		}
	?>
	</ul>
    
上記の書き方より、foreach文を使って以下のようにした方が簡単です。

##### **file_list.php**（foreach文使用）

	<p>uploadフォルダ内のファイル一覧</p>
	<ul id="waitingList">
	<?php
		foreach (glob('./upload/*') as $item) {
			$file_name = basename($item);//ファイル名だけを抜き出す
			echo '<li><span class="filename">'.$file_name.'</span><button class="upfileDelete">削除</button></li>';
		}
	?>
	</ul>  
    
##### **JS(del_script.js)**

    //アップしたファイルの削除ボタンを押したときの処理
    $('ul').on('click', '.upfileDelete', function() {
        var delObj = $(this);
        var delName = $(this).prev('span').text();
        var fileIndex = $(this).parent('li').index('.addFile');

            if(window.confirm('削除していいですか？')){

                //削除ファイル名の変数delNameをfile_delete.phpに送信
                $.ajax({  
                    url: "file_delete.php",  
                    type: "POST",
                    //dataType:'json',
                    cache: false,
                    data:{
                        item:delName
                    },
                    success: function(data) {
                        //リストのファイル表示削除
                        delObj.parent('li').remove();
                    },  
                    error: function(data) {  
                       alert(delName+'の削除に失敗しました。');  
                    }  
                });
            } else {
                return false;
            }

        //リストのファイル表示削除
        delObj.parent('li').remove();
    });  

##### **file_delete.php**

    <?php
        $result = 'upload/'.$_POST['item'];//ポストで受け取れる
        echo $result;
        unlink($result);
    ?>

## メニュー並べ替え


<div class="box-example" markdown="1">
### 例7 ### {.h-example}

メニューをドラッグ&ドロップすることで、位置変更ができます。[新規タブ](../../../sample/DnD/sample10(menu)/admin/index.php?target=_blank)  
メニューだけだと一番下に移動できないので、仮のリスト（&lt;li class="dummy"&gt;&lt;/li&gt;）を最後のリストの後ろに設置しています。

<iframe width="100%" height="350" src="../../sample/DnD/sample10(menu)/admin/index.php" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</div>