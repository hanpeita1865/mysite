$('button').on('click',function(){
	$.ajax({
		url: 'ajax.php',
		type: 'POST',
		cache: false,
		data : {post_data_1:"hoge", post_data_2:"piyo"}
	}).done(function(data) {
		//通信成功時の処理
		alert('成功しました。');
		
	}).fail(function(){
		//通信失敗時の処理
		alert('失敗しました～。')
	});
});


