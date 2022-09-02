$(function () {
	//var params = (new URL(document.location)).searchParams;この書き方でもいける
	const params = new URLSearchParams(location.search); //パラメータ取得
	const word = params.get('word'); //検索ワード取得
	const type = params.get('case'); //英大文字小文字区別取得
	ajax_search(word, type);
});


function ajax_search(word, type) {

	$('#text-markdown').html('');
	const menuList = [];

	$('#menu li a').each(function () {
		const href = $(this).attr('href');
		const titleText = $(this).text();
		menuList.push({ path: href, title: titleText })
	});

	let num = 0;//ループ回数
	let hitNum = 0;//ヒット件数

	$('#text-markdown').prepend('<p id="search-number">「' + word + '」の検索結果：<span id="word-num"></span>ページ</p>');

	for (let i = 0; i < menuList.length; i++) {
		const menuTitle = menuList[i].title;
		const menuPath = menuList[i].path;

		//ファイルの読み込み
		$.ajax({
			url: menuPath + '/markdown.md',
			type: 'GET',
			dataType: 'html',
			cache: false,
			data: { title: menuList[i].title }
		}).done(function (data) {

			num++

			//data = data.replace(/<script(.*?)>(.*?)<\/script>/ims, '&lt;script$1&gt;$2&lt;/script&gt;');

			//data = replaceAll(data, /<script(.*?)>(.*?)<\/script>/ims, '&lt;script$1&gt;$2&lt;/script&gt;');

			//console.log(data);

			//$md = preg_replace('/<script(.*?)>(.*?)<\/script>/ims', '&lt;script$1&gt;$2&lt;/script&gt;', $md);//scriptタグ文字変換

			const cmpHtml = marked(data); //HTMLに変換
			const reCode = new RegExp("</code></pre>");

			let reCmp = cmpHtml.replace(/<pre><code>/g, '```');//前のタグを「```」に置換
			reCmp = replaceAll(reCmp, '</code></pre>', '```')//閉じタグを独自関数で「```」に置換

			$('#test').html(reCmp); //仮挿入
			let targetText = $('#test').text(); //テキスト取得

			let wordType = 'g';//初期設定は、英大文字小文字区別あり
			if (type) {
				wordType = 'ig';//英大文字小文字区別なし
				$('#word-case').prop('checked', true);
			} else {
				$('#word-case').prop('checked', false);
			}

			var wordExp = new RegExp(word, wordType);

			//検索ワードがあれば挿入
			if (wordExp.test(targetText) == true) {

				const split = targetText.split(word);//文字分割

				//検索文字の前に300文字以上ある場合、50文字を残して削除
				if (split[0].length > 400) {
					targetText = targetText.slice(split[0].length - 250);
				}
				hitNum++

				const reText = replacer(targetText, word, wordType);//独自関数で置換		
				const cmpHtml = marked(reText);//HTMLに変換

				$('#text-markdown').append('<section>' + '<h3><a href="' + menuPath + '" >' + menuTitle + '<span>（' + menuPath + '）</span></a></h3>' + cmpHtml + '</section>');//HTMLを挿入

				//code内に検索ワードがある時の処理
				$('#text-markdown section:last-of-type').each(function () {
					var txt = $(this).html();
					txt.replace(/code/g, 'span');
					txt = replaceAll(txt, '***' + word + '***', '<strong><em>' + word + '</em></strong>');

					$(this).html(txt);
				});
			}

			if (num == menuList.length) {
				$('#word-num').html((hitNum));
			}
		});
	}

	$('#test').html('');
}

//replaceAllを独自に作成
function replaceAll(org, search, replace) {
	return org.split(search).join(replace);
}

//replace強調表示用(大文字小文字区別なし)
function replacer(org, search, wordType) {
	var SearchString = '(' + search + ')';
	var RegularExp = new RegExp(SearchString, wordType);
	var ReplaceString = '***$1***';
	var ResString = org.replace(RegularExp, ReplaceString);
	return ResString;
}

