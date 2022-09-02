$(function () {
	//var params = (new URL(document.location)).searchParams;この書き方でもいける
	const params = new URLSearchParams(location.search); //パラメータ取得
	const cate = params.get('cate'); //検索ワード取得
	const word = params.get('word');

	$('#search-select').val(cate);
	$('#word').val(word);
});

