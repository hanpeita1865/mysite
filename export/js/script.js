$(function () {
	//Simplebar設定
	const leftColumn = document.getElementById('menu-wrap');
	const simpleBar = new SimpleBar(leftColumn);

	function setLayout() {
		const headerHeight = $('#header-wrapper').outerHeight();
		const menuHeight = (window.innerHeight - headerHeight) + 'px';
		$('#menu-wrap').css('height', menuHeight);
	}
	setLayout();
	window.addEventListener('resize', setLayout);

	//ページ名取得
	let pathArray = location.pathname.split("/");
	let markFolder = pathArray.slice(-2)[0]; //フォルダ名
	let markSplit = markFolder.split("__");
	let markFile = markSplit.slice(-1)[0]; //ページのファイル名

	//スクロール位置
	let scrollStart = $('#scroll').val();

	$('body,html').animate({
		scrollTop: scrollStart
	}, 0);



	//メニュー設定
	$('#menu li a').each(function () { //ナビリンクからカテゴリフォルダ名と一致したカテゴリーのテキスト名を取得
		let href1 = $(this).attr('href');
		let href2 = href1.split('/');
		let folderName = href2.slice(-2)[0]; //フォルダ名
		let categorySplit = folderName.split("__");
		let category = categorySplit.slice(-1)[0]; //ページのファイル名
		let categoryIcon = 'p-' + category;

		if ($(this).siblings('ul').length) {
			$(this).parents('li').addClass('toggle');
		}

		//タイトル属性設置
		$(this).attr('title', $(this).text());

		if (markFolder == folderName) {
			let cateText = $(this).text(); //ページ名
			//$('h1.heading1').text(cateText); //見出しに記入
			//let title = $('title').text();
			//title = title + ' | マークダウン式ノート';
			//$('title').text(cateText + title); //タイトルに記入
			$('a[href$="' + folderName + '/"]').parent('li').addClass('cate-active');
			$('a[href$="' + folderName + '/"]').parents('li').addClass('active');

			//スクロールバー位置設定
			let scrollId;
			let pos;

			if($(this).closest('ul').hasClass('side-link')){
				scrollId = '#' + $('#menu > .active').attr('id');
				pos = $(scrollId).position().top;
			}else if($(this).siblings('ul').length){
				scrollId = '#' + $(this).parent('li').attr('id');
				pos = $(scrollId).offset().top-113;
			}else{
				scrollId = '#' + $(this).closest('.sub-menu').parent('li').attr('id');
				pos = $(scrollId).offset().top-113;
			}

			$(".simplebar-content-wrapper").animate({
				scrollTop: pos
			}, 0);


			$('#edit').val(cateText); //編集ボタンのinputのvalue値にページ名を設定
			$('#folder').val(markFolder); //編集ボタンのinputのvalue値にフォルダ名を設定

		}

			let lockResult = $.inArray(folderName, lockArray);
			if(lockResult!=-1){
				$(this).addClass('lock');
			}
		});

	menuConfig();

	function menuConfig() {
		let menuNum = 1;
		$('#menu > li > a').each(function () {
			let menuText = $(this).text();
			$(this).text(menuNum + '. ' + menuText);
			menuNum++;
		});
	}

	markedConfig(); //マークダウン読み込みを最初に実行

	//マークダウン読み込み
	function markedConfig() {

		let t = 0;

		//目次を配列に格納
		let head2Text = [];
		let headNum2 = 0;
		let head3Text = [];
		let headNum3 = 1;
		let headData = [];

		$('#text-markdown h2, #text-markdown h3').each(function () {

			if ($(this).prop("tagName") == "H2") {
				//H2見出し
				headNum2++;
				let h2Text = $(this).text(); //見出し名取得
				let chap = 'chapter' + headNum2; //見出しidに使う数字
				headNum3 = 1;
				$(this).attr('id', chap); //見出しid名
				head2Text.push(h2Text); //見出しを配列に格納
				headData.push({
					selector: "h2",
					text: h2Text,
					chapter: chap
				});

			} else {
				//H3見出し
				let h3Text = $(this).text(); //見出し名取得
				let chap = 'chapter' + headNum2 + '-' + headNum3; //見出しidに使う数字
				$(this).attr('id', chap); //見出しid名
				headData.push({
					selector: "h3",
					text: h3Text,
					chapter: chap
				});
				headNum3++;
			}
		});

		let mokujiList;
		const listMax = 20;
		let turmH2 = 20;

		//console.log('目次リストの個数 ', headData.length);
		//console.log('h2の個数', head2Text.length);
		//console.log('目次リストの半分の個数 ', headData.length / 2);

		/*Object.keys(headData).forEach(function (key) {
			console.log(key, headData[key].selector);
		});*/

		let over = 0;
		Object.keys(headData).forEach(function (key) {
			if (headData[key].selector == 'h2') {
				if (key > headData.length / 2 && over == 0) {
					//console.log('超えました', key);
					over = 1;
					turnH2 = key;
				}
			}
		});


		if (head2Text.length != 0) { //h2の見出しがある場合、目次生成
			$('#mokuji').prepend('<h2 class="parts-guide">目次</h2>');

			//リストの数がMAXを超えたら、2列にする。
			if (headData.length > listMax) {
				$('#mokuji').append('<div class="mokuji-box"><ul id="list-mokuji1"></ul><ul id="list-mokuji2"></ul></div>');
				
				for (var i = 0; i < turnH2; i++) {
					if (headData[i].selector == 'h2') {
						//H2目次リスト
						$('#list-mokuji1').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');

					} else if (/-1$/.test(headData[i].chapter)) {
						//H3目次リスト先頭
						$('#list-mokuji1 > li:last-child').append('<ul><li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li></ul>');

					} else {
						//H3目次リスト 2番目以降
						$('#list-mokuji1 > li:last-child ul').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');
					}
				}

				//リスト数がturnH2から2列目のリストに挿入
				for (var i = turnH2; i < headData.length; i++) {
					if (headData[i].selector == 'h2') {
						//H2目次リスト
						$('#list-mokuji2').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');

					} else if (/-1$/.test(headData[i].chapter)) {
						//H3目次リスト先頭
						$('#list-mokuji2 > li:last-child').append('<ul><li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li></ul>');

					} else {
						//H3目次リスト 2番目以降
						$('#list-mokuji2 > li:last-child ul').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');
					}
				}

			} else {

				$('#mokuji').append('<ul id="list-mokuji" class="mokuji-list"></ul>');

				for (var i = 0; i < headData.length; i++) {

					if (headData[i].selector == 'h2') {
						//H2目次リスト
						$('#list-mokuji').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');

					} else if (/-1$/.test(headData[i].chapter)) {
						//H3目次リスト先頭
						$('#list-mokuji > li:last-child').append('<ul><li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li></ul>');

					} else {
						//H3目次リスト 2番目以降
						$('#list-mokuji > li:last-child ul').append('<li><a href="#' + headData[i].chapter + '">' + headData[i].text + '</a></li>');
					}
				}
			}
		}


		$('#text-markdown a').each(function () {
			//「http」か「https」のとき、target="_blank"を設定
			let href = $(this).attr('href'); //aのhrefの値
			switch (true) {
				case /^http:|^https:/.test(href):
					$(this).attr('target', '_blank');
					//外部リンクにアイコンを付ける(任意)「file_icon newtab-icon」のクラスをサイト用のに変更する
					if (!$(this).children('img').length && !$(this).find('button').length) {
						$(this).addClass('file_icon newtab-icon');
					}

					break;
					//ファイルリンクのとき、target="_blank"を設定
				case /.xls$|.xlsx$|.pdf$|.doc$|.zip$|.txt$|.pptx$/.test(href):
					$(this).attr('target', '_blank');

					break;
			}

			if($(this).hasClass('image')){
				$(this).attr('data-group', 'gallery');
			}
		});
	}


	//ページトップボタン
	//初期は非表示
	$("#parts-pagetop").hide();

	$(window).scroll(function () {
		//140pxスクロールしたら
		if ($(this).scrollTop() > 140) {
			//フェードインで表示
			$('#parts-pagetop').fadeIn();
		} else {
			//フェードアウトで非表示
			$('#parts-pagetop').fadeOut();
		}
	});

	//画像にfigureとfigcaptionを設置
	$('#text-markdown img').each(function (e) {
		figureWrap($(this));
	});

	$('[data-toggle="tooltip"]').tooltip();

});

//画像にfigureとfigcaptionを設置
function figureWrap(e) {
	let clsName = e.closest('div').prop('class');

	if (/^photo/.test(clsName) && e.closest('a').length == 0) {
		if (e.parent()[0].tagName == 'P') {
			e.unwrap();
		}
		e.wrap('<figure>');

		e.attr('')

		if (e.is('[title]')) { //title属性がある場合
			let imgTitle = e.attr('title');
			e.after('<figcaption>' + imgTitle + '</figcaption>');
		}

	} else if (/^photo/.test(clsName) && e.closest('a').length > 0) {
		if (e.parents('a').parent()[0].tagName == 'P') {
			e.parents('a').unwrap();
		}
		e.parent('a').wrap('<figure>');

		if (e.is('[title]')) { //title属性がある場合
			let imgTitle = e.attr('title');
			e.parent('a').after('<figcaption>' + imgTitle + '</figcaption>');
		}

	} else if (e.closest('a').length == 0) {
		if (e.parent()[0].tagName == 'P') {
			e.unwrap();
		}
		e.wrap('<figure>');

		if (e.is('[title]')) { //title属性がある場合
			let imgTitle = e.attr('title');
			e.after('<figcaption>' + imgTitle + '</figcaption>');
		}

	} else if (e.closest('a').length > 0) {
		if (e.parents('a').parent()[0].tagName == 'P') {
			e.parents('a').unwrap();
		}
		//e.wrap('<figure>');
		$(e.closest('a')).wrap('<figure>');

		if (e.is('[title]')) { //title属性がある場合
			let imgTitle = e.attr('title');
			//e.after('<figcaption>' + imgTitle + '</figcaption>');
			$(e.closest('a')).after('<figcaption>' + imgTitle + '</figcaption>');
		}
	}
}



//編集画面を表示(編集ボタンをクリック)
$('.btn-edit').on('click', function () {

	//let editName = $('#edit').val();
	//let editPath = $('#folder').val();
	let scrollTop = $(window).scrollTop();
	$('#scroll').val(scrollTop);

	$.ajax({
		url: '../../common/update/index.php',
		type: 'POST',
		cache: false,
		//data: { edit: editName, folder: editPath, scroll: scrollTop },
	}).done(function (data) {
		$('#edit-form').submit(); //送信

	}).fail(function () {
		//通信失敗時の処理
		alert('編集画面は開けません。PHP環境ではありません。')
		return false;
	});
});

/*$(window).on("scroll", function() { 
	let scrollPos = $(window).scrollTop(); //トップからの位置
	console.log(scrollPos);
});*/


//サイドバー開閉
/*$('.side-link a').on('click', function () {
	let prop = $(this).prop('href');
	console.log(prop);
	//$(this).siblings('.sub-menu').toggleClass('opened');
	return false;
});*/

//ハンバーガメニューボタン
$('#menu-icon-bars').on('click', function () {
	//$('#content').toggleClass('menu-open');
	//$('#sidebar').slideToggle();
});


// 開閉ボタンをクリックしたとき
$('.menu-trigger').on('click', function () {
	// 開閉ボタンがactiveクラスを持っているならば
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('nav').removeClass('open');
		$('.overlay').removeClass('open');
		// 開閉ボタンがactiveクラスを持っていないならば
	} else {
		$(this).addClass('active');
		$('nav').addClass('open');
		$('.overlay').addClass('open');
	}
});
// オーバーレイをクリックしたとき
$('.overlay').on('click', function () {
	// オーバーレイがopenクラスを持っているならば
	if ($(this).hasClass('open')) {
		$(this).removeClass('open');
		$('.menu-trigger').removeClass('active');
		$('nav').removeClass('open');
	}
});

//replaceAllを独自に作成
function replaceAll(org, search, replace) {
	return org.split(search).join(replace);
}

//鍵マーク有りのリンクをクリックしたとき
$('ul').on('click', 'a.lock', function() {
	if(unlock == 0){
		alert('閲覧できません。');
		return false;
	}
});


// マークダウン用モーダルウィンドウ
$("a.modal-win").click(function () {

	// body要素の最後にdiv.modal-wrapを追加
	$("body").append('<div class="modal-wrap">');

	// .modal-wrap要素の中にdiv#photoを追加
	$(".modal-wrap").html('<div id="photo">');

	// .modal-wrap要素の中の最後にオーバーレイヤーを設置
	$(".modal-wrap").append('<div class="modal-overlay">');

	// それぞれ非表示にする
	//$("#photo").hide();
	//$(".modal-overlay").hide();

	// #photoの中にimg要素を追加
	$("#photo").html("<img>");

	// img要素にsrc属性を設定
	$("#photo img").attr("src", $(this).attr("href"));


	// .modal-overlayと#photoをフェードイン   
	$(".modal-overlay").fadeIn();
	$("#photo").fadeIn();

	// 背景をクリック   
	$(".modal-overlay").click(function () {
		// 背景（自分自身）をフェードアウト、完了したら削除
		$(this).fadeOut(function () {
			$(this).remove();
		});

		// 画像をフェードアウト、完了したら削除
		$("#photo").fadeOut(function () {
			$(this).remove();
			$(".modal-wrap").remove();
		});
	});

	return false;
});

//遷移前 閲覧判定テスト
/*$('#menu a').on('click',function(){
	let hrefValue = $(this).prop('href');

	$.ajax({
		url: '../../common/user_check_before.php',
		type: 'POST',
		cache: false,
		data: { href: hrefValue }
	}).done(function (data) {
		//通信成功時の処理
		if(data=='遷移不可'){
			alert('閲覧できませーん。');
			return false;
		}

	}).fail(function () {
		//通信失敗時の処理
		alert('編集画面は開けません。PHP環境ではありません。')
		return false;
	});
});*/


//Modaal（モーダルウインドウ）
//画像　Single Image Modal
$('.image').modaal({
    type: 'image',
	after_open: imageNumber,
	after_image_change: changeNumber
});

//画像ギャラリー
$('.modaal-image').modaal({
    type: 'image'
});

// YOUTUBE
$('.video').modaal({
    type: 'video',
});

// AJAX
$('.modaal-ajax').modaal({
    type: 'ajax'
});

//インライン
$(".inline").modaal();

//フルスクリーン
$('.fullscreen').modaal({
    fullscreen: true
});

function imageNumber(){
	galleryNum = 0;
	let galleryOrder;

	$('[data-group="gallery"]').each(function(){
		galleryNum++;

		let dataGallery = $(this).attr('data-gallery-active');
		if($(this).attr('data-gallery-active')){
			galleryOrder = galleryNum;
		}
	});

	$('.modaal-container').prepend('<p class="gallery-num">'+galleryOrder+'/'+galleryNum+'</p>');
	$('.modaal-container').append('<p class="gallery-num num-bottom">'+galleryOrder+'/'+galleryNum+'</p>');
}

function changeNumber(){
	let galleryOrder;
	let activeCls = $('.is_active.gallery_active_item').attr('class');
	let clsArray = activeCls.split(" ");
	galleryOrder = clsArray[1].replace('gallery-item-','');
	galleryOrder = Number(galleryOrder)+1;

	$('.gallery-num').text(galleryOrder+'/'+galleryNum);
}