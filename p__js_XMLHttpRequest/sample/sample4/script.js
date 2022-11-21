// // (1)XMLHttpRequestオブジェクトを作成
// var xmlHttpRequest = new XMLHttpRequest();

// // (2)HTTPのPOSTメソッドとアクセスする場所を指定
// xmlHttpRequest.open('POST','ajax.php',true);

// // (3)送信する内容の形式を設定
// xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// // (4)HTTPリクエストを送信
// xmlHttpRequest.send('id=2&user_name=Mike');

// FetchでPOST送信
fetch('ajax.php', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify({
	  name: 'Hubot',
	  login: 'hubot',
	})
  }).then(function(response) {
	// レスポンス結果
  }, function(error) {
	// エラー内容
  });