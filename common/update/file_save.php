<?php
    //一時的保存にファイルがあるか確認
    //if (is_uploaded_file($_FILES['hoge']['tmp_name'])) {
	if (!empty($_FILES['hoge']['tmp_name'])) {

        //保存用のフォルダがなければ作成する
        if(!file_exists($_POST['folder'].'upload')){
            mkdir($_POST['folder'].'upload');
        }

        //保存先のファイルのパスを変数に取得。
        $file = $_POST['folder'].'upload/'.basename($_FILES['hoge']['name']);

        //フォルダにファイルを一時的保存から移動して格納
        move_uploaded_file($_FILES['hoge']['tmp_name'], $file);
		
		//更新日付順表示
		$sort_by_lastmod = function($a, $b) {
			return  filemtime($a) - filemtime($b);
		};

		$files = glob($_POST['folder'].'upload/*');
		usort( $files, $sort_by_lastmod );		

		//保存ファイルのリストを表示
		foreach ($files as $item) {
			$file_name = basename($item);//ファイル名だけを抜き出す
			$fileClass ='';
			$photo = false;

			switch (1) {
				//エクセル
				case preg_match('/.xlsx$|.xls$|.xlsm$|.xlsb$|.xltx$|.xltm$|.xlt$|.xls$|.xml$|.xml$|.xlam$|.xla$|.xlw$|.xlr$/',$file_name):
					$fileClass = 'file_icon excel-icon';
					break;
				//テキスト
				case preg_match('/.txt$/',$file_name):
					$fileClass = 'file_icon text-icon';
					break;
				//ワード
				case preg_match('/.doc$|.docm$|.docx$|.dot$|.dotx$/',$file_name):
					$fileClass = 'file_icon word-icon';
					break;
				//パワーポイント
				case preg_match('/.pptx$/',$file_name):
					$fileClass = 'file_icon pptx-icon';
					break;
				//zipファイル
				case preg_match('/.zip$/',$file_name):
					$fileClass = 'file_icon zip-icon';
					break;
				//PDFファイル
				case preg_match('/.pdf$/',$file_name):
					$fileClass = 'file_icon pdf-icon';
					break;
				//画像
				case preg_match('/.png$|.PNG$|.jpg$|.jpeg$|.JPG$|.JPEG$|.svg$|.svgz$|.gif$/',$file_name):
					$photo = true;
					break;
			}

			if(!$photo == true){
				echo '<li><span class="filename '.$fileClass.'">'.$file_name.'</span><button class="fileDelete">削除</button><button class="fileInsert">挿入</button></li>';
			}else{
				echo '<li class="photo-list"><span class="filename">'.$file_name.'</span><img src="'.$_POST["folder"].'/upload/'.$file_name.'" alt=""><button class="fileDelete">削除</button><button class="fileInsert">挿入</button></li>';
			}
		}
    }
