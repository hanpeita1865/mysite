//マークダウンファイルを更新処理
function file_submit(howUpdate) {
	let markText = $('#report-markdown').val();
	let folderList = [];

	//入力データを送信
	$.ajax({
		url: 'markdown-upload.php',
		type: "POST",
		cache: false,
		data: { report: markText, path: markPath },
	}).done(function (data) {
		//通信成功時の処理
		if(howUpdate!=='key'){
			alert('入力内容を更新しました。');
		}
		

	}).fail(function () {
		//通信失敗時の処理
		alert('入力内容のアップロードに失敗しました');
		return false;
	});
}


//ドラッグ&ドロップとたときの処理
let obj = $("#DnDBox");

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
	let folderList = [];
	let dropFile = e.originalEvent.dataTransfer.files[0];
	let fileName = e.originalEvent.dataTransfer.files[0].name;//選択したファイル名

	$('#waitingList li').each(function () {//ファイル一覧を変数に格納
		folderList.push($(this).children('.filename').text());
	});

	if (folderList.indexOf(fileName) != -1) {
		if (window.confirm(fileName + 'と同じ名前のファイルがあります。上書きしますか?')) {
			file_save(dropFile);
		}
	} else {
		file_save(dropFile);
	}
});


//uploadフォルダ内にファイルの登録、更新処理
$('input#file').change(function () {
	let fileName = $('input[type=file]')[0].files[0].name;//選択したファイル名
	let folderList = [];
	let selectFile = $('input[type=file]')[0].files[0];

	console.log('ファイルアップ更新');

	$('#waitingList li').each(function () {//ファイル一覧を変数に格納
		folderList.push($(this).children('.filename').text());
	});

	if (folderList.indexOf(fileName) != -1) {
		if (window.confirm(fileName + 'と同じ名前のファイルがあります。上書きしますか???')) {
			file_save(selectFile);
		}
	} else {
		file_save(selectFile);
	}
});

function file_save(fileData) {
	let fd = new FormData();
	let folder = $('#return-form').attr('action');

	fd.append('hoge', fileData);
	fd.append('folder', folder);

	$.ajax({
		url: 'file_save.php',
		type: 'POST',
		processData: false,
		contentType: false,
		cache: false,
		data: fd
	}).done(function (data) {
		//通信成功時の処理
		$('#waitingList').html(data);//保存ファイルリストを挿入
		alert('保存しました。')

	}).fail(function () {
		//通信失敗時の処理
		alert('失敗しました～。')
	});
}

//uploadフォルダ内のファイル削除
$('ul').on('click', '.fileDelete', function () {
	let delObj = $(this);
	let delName = $(this).siblings('.filename').text();
	let folder = $('#return-form').attr('action');

	if (window.confirm(delName + 'を削除していいですか？')) {

		//削除ファイル名の変数delNameをfile_delete.phpに送信
		$.ajax({
			url: "file_delete.php",
			type: "POST",
			cache: false,
			data: { item: delName, folderPath: folder }//ファイル名
		}).done(function (data) {
			//リストのファイル表示削除
			delObj.parent('li').remove();
			alert(delName + 'を削除しました。');

		}).fail(function () {
			alert(delName + 'の削除に失敗しました。');
		});

	} else {
		return false;
	}
});


function icon_inst() {
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
}


//プレビューボタンをクリック
$(".btn-preview").click(function () {

	let titleVal = $('h1').val();//タイトル名
	$('#title-p').val(titleVal);

	let reportVal = $('#report-markdown').val();//記事
	$('#report-p').val(reportVal);

	$('#form-preview').submit();
})



