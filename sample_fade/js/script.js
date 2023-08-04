$(function(){
    var count = $("#carousel-inner li").length;//画像の枚数
    var current = 1;
    var next = 2;
    var interval = 7000;//画像が切り替わる間隔
    var timer;

    // 1番目の写真以外は非表示
    $("#carousel-inner li:not(:first-child)").hide();

    //ボタン設置
    for ( var i = 1 ; i <= count ; i++ ){
        //ナビボタンの作成
        $("#btn-navbox").append('<button value="'+i+'"><span class="sr-only">'+i+'枚目</span></button>');
    }
    $("#btn-navbox button:first-child").addClass('target');//先頭のボタンの色を変える

    // 変数intervalの値ごとにslideTimer関数を実行
    timer = setInterval(slideTimer, interval);

	// slideTimer関数
	function slideTimer(){
        $('#carousel').addClass('btnOff');
		
		$("#carousel-inner li:nth-child(+" + current + ")").removeClass('active');
		$("#carousel-inner li:nth-child(+" + next + ")").addClass('active');
		$("#carousel-inner li:nth-child(+" + current + ")").fadeOut('slow');
		$("#carousel-inner li:nth-child(+" + next + ")").fadeIn('slow',function(){
			$('#carousel').removeClass('btnOff');
		});

		current = next;
		next = ++next;

		if(next > count){
			next = 1;
		}

		$("#btn-navbox button").removeClass("target");
		$("#btn-navbox button:nth-child("+ current +")").addClass("target");
	}

    //ナビボタン
    $("#btn-navbox button").click(function(){
        if (!$(this).hasClass('target')){
            next = $(this).val();
            clearInterval(timer);
            timer = setInterval(slideTimer, interval);
            slideTimer();
        }
    });

    //画像にマウスオーバー時は、切り替えを停止させる
    $('#carousel-inner').hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(slideTimer, interval);
    });
});
