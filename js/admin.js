let num = 0;

menuSort();

function menuSort() {

	$('ul').append('<li class="dummy"></li>');

	//console.log(lockArray);

	$('.side-link li').each(function (e, elm) {

		if (!$(this).hasClass('dummy')) {

			let href = $(this).children('a').attr('href');
			let folderName = href.split('/')[1];

			if (folderName != 'p_base') {
				$(this).prepend('<button class="btn-lock">ロック変更</button>');
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

			let lockResult = $.inArray(folderName, lockArray);
			if(lockResult!=-1){
				$(this).children('a').addClass('lock');
			}

		}

		overDrop(e, elm);
	});
}

//サブメニュー用ボックス作成
$('.side-link li').on('dblclick', function (e) {

	let side = $(this).parent('ul').hasClass('side-link');//第二階層のサブメニューか判定

	if (!$(this).children('ul').length) {//サブメニュのボックスがないかつ第二階層のメニューを作成
		//console.log('メニューボックスを作成');
		$(this).append('<ul class="emp-ul sub-menu"><li class="emp-list">ここにメニューを挿入</li></ul>');
		$(this).addClass('emp');
		let obj = $(".emp-ul");

		objDrop(obj);

	} else if ($(this).children('ul').length && !$(this).children('ul').children('li').not('.dummy').length) {//空のサブメニューボックスがある
		//console.log('空のボックスがある');
		$(this).find('.dummy').remove();
		$(this).children('ul').addClass('emp-ul');
		$(this).children('ul').prepend('<li class="emp-list">ここにメニューを挿入</li></ul>');
		$(this).addClass('emp');
		let obj = $(".emp-ul");

		objDrop(obj);

	} else if ($(this).hasClass('emp') && side) {//第二階層に空のボックスがある場合
		//ulの空ボックス削除
		//console.log('ボックス削除');
		$(this).children('ul').remove();
		$(this).removeClass('emp');
	}

	e.stopPropagation();
});



//並べ替え確定
$('#confirm').on('click', function () {

	if (window.confirm('メニューの並びの変更を確定していいですか？')) {

		/*$('#menu .dummy').each(function(){ //dummyクラスの要素を削除
			$(this).remove();
		});*/

		let menuList = $('#menu').html().trim();

		/*$('ul').append('<li class="dummy"></li>');//dummy再設置*/

		menuList = menuList.replace(/(\r?\n)+/g, "\n");//空行削除
		menuList = menuList.replace(/href="..\/(.*)\/"/g, 'href="<?= $base_path ?>$1/"');//パス修正

		$.ajax({
			url: 'menu_confirm.php',
			type: 'POST',
			cache: false,
			data: { post_menu: menuList }
		}).done(function (data) {
			//通信成功時の処理
			alert('メニューの並びを変更しました。');

		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});
	}
});

let folderName, folderReName, menuName, menuReName, menuId, menuPath;

//メニュー名変更
$('.side-link li a').on('dblclick', function (e) {
	menuName = $(this).text();
	menuId = $(this).parent('li').attr('id');
	folderName = $(this).attr('href').split('/')[1];
	menuReName = prompt('名前を変更して「ok」を押してください', menuName);


	if (menuName != menuReName && menuReName != '' && menuReName != null) {

		$.ajax({
			url: 'file_rename.php',
			type: 'POST',
			cache: false,
			data: { post_menu: menuName, post_reName: menuReName, post_folder: folderName }
		}).done(function (data) {
			//通信成功時の処理
			alert(data);

			if (data.match(/変更しました/)) {
				$('#' + menuId).children('a').text(menuReName);
			}

		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});
	} else if (menuReName == '') {
		alert('メニュー名の値が空です');
	}

	e.stopPropagation();
});

//リンク無効化
$('a').on('click', function () {
	return false;
});


//ファルダ名変更
$('.folder-rename').on('click', function (e, obj) {

	folderName = $(this).siblings('a').attr('href').split('/')[1];
	folderReName = prompt('フォルダ名を変更して「ok」を押すと元には戻せません。（「p__」は必ず頭に付けて下さい。）', folderName);
	menuId = $(this).parent('li').attr('id');


	if (folderReName == null || folderName == folderReName) {//キャンセルまたは名前を変えずにokを押した場合

	} else if (folderReName == '') {
		alert('フォルダ名の値が空です');

	} else if (!/^p__/.test(folderReName)) {
		alert('フォルダ名の先頭に「p__」を付けて下さい。');

	} else if (!/^p__./.test(folderReName)) {
		alert('フォルダ名の先頭の「p__」の後に文字を記入してください。');

	} else {
		$.ajax({
			url: 'folder_rename.php',
			type: 'POST',
			cache: false,
			data: { post_folder: folderName, post_reName: folderReName }
		}).done(function (data) {
			//通信成功時の処理
			alert(data);

			if (data.match(/変更しました/)) {
				$('#' + menuId).children('a').attr('href', '../' + folderReName);
				$('#' + menuId).children('.link-name').text(folderReName);
			}

		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});

	}
});


//並べ替え
function compareFunc(a, b) {
	return a - b;
}

//フォルダ新規作成
$('#create').on('click', function () {

	let newFolder = prompt('新規にフォルダ名を作成します。「p__」の後に記入してください。', 'p__');
	let idList = [];

	$('#menu li').not('.dummy').each(function () {
		let idNum = $(this).attr('id').replace('item', '');
		idNum = Number(idNum);
		idList.push(idNum);
	});

	idList.sort(compareFunc);
	let empId;

	for (var i = 1; i <= idList.length; i++) {
		if (!idList.includes(i)) {
			empId = 'item' + i;
			break;
		} else if (i == idList.length) {
			i++
			empId = 'item' + i;
		}
	}

	if (newFolder != null) {

		$.ajax({
			url: 'folder_create.php',
			type: 'POST',
			cache: false,
			data: { post_newFolder: newFolder, post_empId: empId }
		}).done(function (data) {
			//通信成功時の処理
			alert(data);

			if (data.match(/新規作成しました/)) {

				window.location.reload();
			}

		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});
	}
});

//ロック設定・解除
$('.btn-lock').on('click',function(){

	if (window.confirm('閲覧ロックの設定を変更していいですか？')) {

		let folderName = $(this).siblings('.link-name').text();

		$.ajax({
			url: 'page_lock.php',
			type: 'POST',
			cache: false,
			data: { post_folder: folderName }
		}).done(function (data) {
			//通信成功時の処理
		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});

		$(this).siblings('a').toggleClass('lock');
	}
});


//フォルダ削除
$('.folder-del').on('click', function () {

	let chObj = '';
	let listObj = $(this).parent('li');
	let listName = $(this).siblings('a').text();
	let listFolder = $(this).siblings('a').attr('href').split('/')[1];

	if (window.confirm(listName + ' 【' + listFolder + '（フォルダ名）】を削除していいですか？\n（削除すると元に戻せません。）\n※削除した後は、一旦いまのメニューの並びが保存されます。')) {

		//メニュー操作
		if ($(this).siblings('ul').length) {
			chObj = $(this).siblings('ul').children('li');
			listObj.after(chObj);
			listObj.remove();
		} else {
			listObj.remove();
		}

		//フォルダ操作
		$.ajax({
			url: 'folder_delete.php',
			type: 'POST',
			cache: false,
			data: { post_delFolder: listFolder }
		}).done(function (data) {
			//通信成功時の処理
			if (!data.match(/削除するフォルダがありません/)) {
				alert('削除しました。');

				$('#menu').removeClass('emp');

				let menuList = $('#menu').html();

				$.ajax({
					url: 'menu_confirm.php',
					type: 'POST',
					cache: false,
					data: { post_menu: menuList }
				}).done(function (data) {
					//通信成功時の処理
					alert('メニューの並びを保存しました。');

				}).fail(function () {
					//通信失敗時の処理
					alert('失敗しました～。')
				});

			} else {
				alert(data);
			}

		}).fail(function () {
			//通信失敗時の処理
			alert('失敗しました～。')
		});
	}
});

$('.btn-sub-close').on('click',function(){
	$('.side-link').toggleClass('sub-close');
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

			//console.log('ドロップしました（objDrop）');
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

		//console.log('ドロップしました（overDrop）');

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