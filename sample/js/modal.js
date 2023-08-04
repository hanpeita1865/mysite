//ダイアログを表示
$('.modal-open').click(function(){
	// オーバーレイ用の要素を追加
	$('body').append('<div class="modal-backdrop fade show"></div>');
	// ダイアログのIDを取得
	var modal = $(this).attr('data-target');
	//ダイアログを表示
	$(modal).show('fast',function() {
		$(this).addClass('show');
	});
});

//ダイアログを閉じる
$('.modal').click(function(e){	  
	if ( !$(e.target).hasClass('modal') && !$(e.target).hasClass('btn-close') ){
		return false;
	}
	// ダイアログとオーバーレイをフェードアウト
	$('.modal').removeClass('show');
	$('.modal-backdrop').fadeOut('slow',function(){
		$('.modal-backdrop').remove();
		$('.modal').hide();
	});
});

