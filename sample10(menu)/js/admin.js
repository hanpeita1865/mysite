let num = 0;

menuSort();

function menuSort() {

	$('ul').append('<li class="dummy"></li>');

	$('.side-link li').each(function (e, elm) {

		if (!$(this).hasClass('dummy')) {

			let href = $(this).children('a').attr('href');
			let folderName = href.split('/')[1];

			if (folderName != 'p_base') {
				$(this).prepend('<button class="folder-del">削除</button>');
				$(this).prepend('<button class="folder-rename">フォルダ名変更</button>');
			}

			$(this).prepend('<span class="link-name">' + folderName + '</span>');
			$(this).children('a').attr('title', 'ダブルクリックするとメニュー名を変更できます。');

			//ドラッグスタート
			elm.ondragstart = function () {
				num = 0;
				event.dataTransfer.setData('text/plain', event.target.id);
			};

		}

		overDrop(e, elm);
	});
}

//サブメニュー用ボックス作成
$('.side-link li').on('dblclick', function (e) {

	let side = $(this).parent('ul').hasClass('side-link');//第二階層のサブメニューか判定

	if (!$(this).children('ul').length && side) {//サブメニュのボックスがないかつ第二階層のメニューを作成（ボックス作成）
		console.log('ボックス作成');
		$(this).append('<ul class="emp-ul sub-menu"><li class="emp-list">ここにメニューを挿入</li></ul>');
		$(this).addClass('emp');
		let obj = $(".emp-ul");

		objDrop(obj);

	} else if ($(this).children('ul').length && !$(this).children('ul').children('li').not('.dummy').length) {//空のサブメニューボックスがある
		//（ボックス再表示）
		console.log('ボックス再表示');
		$(this).find('.dummy').remove();
		$(this).children('ul').addClass('emp-ul');
		$(this).children('ul').prepend('<li class="emp-list">ここにメニューを挿入</li></ul>');
		$(this).addClass('emp');
		let obj = $(".emp-ul");

		objDrop(obj);

	} else if ($(this).hasClass('emp') && side) {//第二階層に空のボックスがある場合（ボックスを削除）

		console.log('ボックス削除');
		$(this).children('ul').remove();
		$(this).removeClass('emp');
	}

	e.stopPropagation();
});


//リンク無効化
$('a').on('click', function () {
	return false;
});


function objDrop(obj) {

	obj.on('dragenter', function (e) {
		//console.log('入りました');
		e.stopPropagation(); //イベントを停止する
		e.preventDefault(); //画面遷移を行わない
		$(this).css('border', '4px solid green');
	});

	//ドラッグしているファイルがドロップ領域にから出たとき
	obj.on('dragleave', function (e) {
		//console.log('出ました');
		$(this).removeAttr('style');
	});

	//ドラッグしているファイルがドロップ領域にドロップされたとき
	obj.on('drop', function (e) {

		if (obj.hasClass('emp-ul')) {//ボックスが空のとき実行

			console.log('ドロップしました（objDrop）');
			if (!$(this).children('li.dummy').length) {
				$(this).append('<li class="dummy"></li>');//ダミーのリスト挿入
			}

			$(this).css('border', 'none');

			e.preventDefault();

			let id = event.dataTransfer.getData('text/plain');
			let empDrag = document.getElementById(id);

			$(this).prepend(empDrag);//メニュー挿入
			$(this).children('.emp-list').remove();//挿入用の空メニューを削除
			$(this).removeClass('emp-ul');
			$('#menu li').removeAttr('style');


			$(this).children('.dummy').each(function (e, elm) {
				overDrop(e, elm);
			});
		}
	});
}

function overDrop(e, elm) {

	elm.ondragover = function () {
		event.preventDefault();

		let overMenu = this.parentElement.classList.contains('sub-menu');
		let empover = this.parentElement.classList.contains('emp');

		if (empover) {
			$(this).parent('.emp').css('border', '2px solid red');
		} else if (overMenu) {
			this.style.borderTop = '2px solid blue';
			$(this).parents('li').css('border', '2px solid red');

		} else {
			this.style.borderTop = '2px solid red';
		}
	};

	elm.ondragleave = function () {
		$('.side-link li').removeAttr('style');
		$('.side-link .emp').removeAttr('style');
	};


	//ドロップ
	elm.ondrop = function () {

		console.log('ドロップしました（overDrop）');

		event.preventDefault();

		let result = this.parentElement.classList.contains('sub-menu');
		let empty = elm.classList.contains('emp');//空ボックスに挿入か判定

		if (empty && num == 0) {////空ボックスにメニューを挿入した場合

			$(elm).removeClass('emp');//liのクラス「emp」削除

		} else if (result && num == 0) {//サブメニューの場合

			let id = event.dataTransfer.getData('text/plain');
			let elmDrag = document.getElementById(id);

			this.parentNode.insertBefore(elmDrag, this);

		} else if (num == 0) {
			//console.log('実行');
			let id = event.dataTransfer.getData('text/plain');
			let elmDrag = document.getElementById(id);
			this.parentNode.insertBefore(elmDrag, this);
		}
		num++

		$('#menu li').removeAttr('style');
		//$('#menu li').removeAttr('class');
		$('#menu ul').removeAttr('style');
	}
}