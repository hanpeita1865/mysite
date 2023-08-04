$(function(){
    //prev、nextボタン設置
	$('.modal-origin').append('<button id="prevBtn" class="slick-arrow slick-prev"><span class="sr-only">前へ</span></button>');
	$('.modal-origin').append('<button id="nextBtn" class="slick-arrow slick-next"><span class="sr-only">次へ</span></button>');
  
    // サムネール画像をクリック
    $('ul.modal li a').click(function(e,data){
        
		var triggerData = $.isEmptyObject(data);

		if (triggerData===true){//prev,next以外
			// オーバーレイ用の要素を追加
			$('body').append('<div class="modal-overlay"></div>');
			// オーバーレイをフェードイン
			$('.modal-overlay').show();
		}

        // モーダルコンテンツのIDを取得
        var modal = $(this).attr('href');
         // モーダルコンテンツフェードイン
        $(modal).fadeIn('slow');    
        // モーダルコンテンツの表示位置を設定
        modalResize();

        // 「.modal-overlay」あるいは「.modal-close」をクリック
        //$('.modal-overlay, .modal-close').off().click(function(){
		$('.modal-overlay, .modal-close').click(function(){
			// モーダルコンテンツとオーバーレイをフェードアウト
			$('.modal-origin').fadeOut('slow');   
			$('.modal-overlay').fadeOut('fast',function(){               
				$('.modal-overlay').remove();// オーバーレイを削除
			});

			$('a[href="'+modal+'"]').focus();//フォーカスをサムネイル画像に戻す

			return false;
        });

		// リサイズしたら表示位置を再取得
		$(window).on('resize', function(){
			modalResize();
		});

		// モーダルコンテンツの表示位置を設定する関数
		function modalResize(){
			// ウィンドウの横幅、高さを取得
			var winW = $(window).width();
			var winH = $(window).height();

			// モーダルコンテンツの表示位置を取得
			var x = (winW - $(modal).outerWidth(true)) / 2;
			var y = (winH - $(modal).outerHeight(true)) / 2;

			// モーダルコンテンツの表示位置を設定
			$(modal).css({'left': x + 'px','top': y + 'px'});
		}

		$('.modal-close').focus(); //フォーカスを閉じるボタンに移動	  

		return false;

    });
    
    
	//prevボタンをクリック
	$('.modal-origin').on('click', '#prevBtn', function() {
		$(this).parent('.modal-origin').css('z-index','9');
		$(this).parent('.modal-origin').fadeOut('fast',function(){
			$(this).css('z-index','');
            var order = $(this).attr('id');
            var orderList = order.split('_');
            var num = Number(orderList[1]);
            num--
            var modalId = '#'+ orderList[0] + '_'+ num;
            $('[href="'+modalId+'"]').trigger('click',['prev']);
		});
	})
	//nextボタンをクリック
	$('.modal-origin').on('click', '#nextBtn', function() {
		$(this).parent('.modal-origin').fadeOut('fast',function(){
            var order = $(this).attr('id');
            var orderList = order.split('_');
            var num = Number(orderList[1]);
            num++
            var modalId = '#'+ orderList[0] + '_'+ num;
            $('[href="'+modalId+'"]').trigger('click',['next']);            
        });
	})
});
