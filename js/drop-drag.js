var waitList = [];  //追加するファイル用の配列変数

//ファイルを追加の関数
function addWaitList(files) {
	var pathName = location.href;//URL取得
	//var result = pathName.indexOf( 'insert-input.php' );//あいまい検索 編集画面は「-1」
	var result = -1;
	var delClass = 'fileDelete';
	var folderList = [];

	$('#waitingList li').each(function () {//フォルダにあるファイル名を配列に格納
		if (!$(this).hasClass('addFile')) {
			var name = $(this).children('.filename').text();
			folderList.push(name);
		}
	});

	if (result == -1) {//編集画面時
		delClass = 'fileDelete-update';
	}

	for (var i = 0; i < files.length; i++) {
		var sameName = -1;
		for (var j = 0; j < waitList.length; j++) {//追加リストファイルに同じファイル名がないかチェック
			if (files.item(i).name == waitList[j].name) {
				sameName = j;
				alert('同じファイル名があります。');
				return false;
			}
		}

		for (var j = 0; j < folderList.length; j++) {//フォルダにあるファイル名と同じのがないかチェック
			if (files.item(i).name == folderList[j]) {
				sameName = j;
				alert('同じファイル名があります。');
				return false;
			}
		}

		//追加したファイルをリストに表示
		if (sameName < 0) {
			//ファイルを配列変数に追加
			waitList.push(files.item(i));

			var fileClass = 'filename';

			//※test()メソッドは、正規表現と指定した文字列がマッチするかを調べます。 trueかfalseを返します.
			switch (true) {
				case /.pdf$/.test(files.item(i).name): //PDF
					fileClass = 'filename file_icon pdf-icon';
					break;

				case /.xlsx$|.xls$|.xlsm$|.xlsb$|.xltx$|.xltm$|.xlt$|.xls$|.xml$|.xml$|.xlam$|.xla$|.xlw$|.xlr$/.test(files.item(i).name):
					fileClass = 'filename file_icon excel-icon';
					break;
				case /.doc$|.docm$|.docx$|.dot$|.dotx$/.test(files.item(i).name):
					fileClass = 'filename file_icon word-icon';
					break;

				case /.pptx$/.test(files.item(i).name)://PowerPointアイコン
					fileClass = 'filename file_icon pptx-icon';
					break;

				case /.zip$/.test(files.item(i).name)://zipアイコン
					fileClass = 'filename file_icon zip-icon';
					break;

				case /.txt$/.test(files.item(i).name)://TEXTアイコン
					fileClass = 'filename file_icon text-icon';
					break;

				default:
					break;
			}

			$("#waitingList").append('<li class="addFile"><span class="' + fileClass + '">' + files.item(i).name + '</span><button class="' + delClass + '">削除</button><button class="fileInsert">挿入</button></li>');
		} else {
			waitList[sameName] = files.item(i);
		}
	}
}

function changeFile(obj) { //inputでファイルを選択した時

	//配列変数にファイルデータを格納
	waitList.push($('input[name=clickFile]')[0].files[0]);

	var fileName = $('input[name=clickFile]')[0].files[0].name;
	var fileClass = 'filename';

	//※test()メソッドは、正規表現と指定した文字列がマッチするかを調べます。 trueかfalseを返します.
	switch (true) {
		//PDFアイコン
		case /.pdf$/.test(fileName):
			fileClass = 'filename file_icon pdf-icon';
			break;
		//EXCELアイコン
		case /.xlsx$|.xls$|.xlsm$|.xlsb$|.xltx$|.xltm$|.xlt$|.xls$|.xml$|.xml$|.xlam$|.xla$|.xlw$|.xlr$/.test(fileName):
			fileClass = 'filename file_icon excel-icon';
			break;
		//WORDアイコン
		case /.doc$|.docm$|.docx$|.dot$|.dotx$/.test(fileName):
			fileClass = 'filename file_icon word-icon';
			break;
		//ZIPアイコン
		case /.zip$/.test(fileName):
			fileClass = 'filename file_icon zip-icon';
			break;
		//TEXTアイコン
		case /.txt$/.test(fileName):
			fileClass = 'filename file_icon text-icon';
			break;
		//PowerPointアイコン
		case /.pptx$/.test(fileName):
			fileClass = 'filename file_icon pptx-icon';
			break;
		default:
			break;
	}

	$("#waitingList").append('<li class="addFile"><span class="' + fileClass + '">' + fileName + '</span><button class="fileDelete">削除</button><button class="fileInsert">挿入</button></li>');
}


$(function () {
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
		var msgText = [];//メッセージボックス用のテキスト配列
		var msg = '';//メッセージボックス用テキストまとめ

		//ファイルサイズとファイル種類をチェック
		for (var i = 0; i < dropFile.length; i++) {
			if (dropFile.item(i).size > 2000000) {//ファイルサイズ
				msgText.push('2MBを超えてます。' + dropFile.item(i).name + '(' + dropFile.item(i).size + 'Byte)');
			}
			if (dropFile.item(i).type.match(/image/)) {//ファイル種類
				msgText.push('画像ファイルはここではアップできません。' + dropFile.item(i).name);
			}
		}

		if (msgText.length > 0) {//メッセージがあればアラートを表示して追加を停止する。
			for (var $i = 0; $i < msgText.length; $i++) {
				msg = msg + msgText[$i] + '\n';
			}
			alert(msg);
			return false;
		}
		addWaitList(e.originalEvent.dataTransfer.files);
	});

	//クリアボタンを押すと、全削除
	$('#clearWaitList').on('click', function () {
		$('#waitingList li').remove();
		waitList = [];
		$('#file').val('');
	});

	//ファイル削除を押したときの処理
	/*$('ul').on('click', '.fileDelete', function() {
		var delObj = $(this);
		var delName = $(this).prev('span').text();
		var fileIndex = $(this).parent('li').index('.addFile');
		
		waitList.splice(fileIndex, 1);
		//リストのファイル表示削除
		delObj.parent('li').remove();
		//inputの選択をクリア
		$('#file').val('');
	});*/



	//ファイル削除を押したときの処理（編集画面）
	/*$('ul').on('click', '.fileDelete-update', function() {
		var delObj = $(this);
		var delName = $(this).prev('span').text();
		//var fileIndex = $(this).parent('li').index('.addFile');
		var fileIndex = $(this).parent('li').index();
		var fileAdd = !$(this).parent('li').hasClass('addFile');//クラスがなかったらtrue（フォルダに保存済みのファイル）	
		var idNum = $('[name="id"]').val();
		var delPage = $('h1').text();
		
		if (fileAdd){//フォルダに保存済みのファイルの削除処理
			if(window.confirm('削除していいですか？')){

				//削除ファイル名の変数delNameをfile_delete.phpに送信
				$.ajax({  
					url: "file_delete.php",
					type: "POST",
					cache: false,
					data:{
						item:delName,//ファイル名
						id:idNum,//id番号
						page:delPage//編集などのページ名
					},
					success: function(data) {
						//リストのファイル表示削除
						delObj.parent('li').remove();
						alert(delName+'を削除しました。');
					},
					error: function(data) {  
					   alert(delName+'の削除に失敗しました。');  
					}
				});
			} else {
				return false;
			}
		}
		
		//配列から削除
		//waitList.splice(fileIndex, 1);
		//リストのファイル表示削除
		delObj.parent('li').remove();
	    
	   return false; 
	});*/

});