// FetchでPOST送信
// fetch('ajax.php', 
// 	{
// 	method: 'POST',
// 	headers: {
// 	  'Content-Type': 'application/json'
// 	},
// 	body: JSON.stringify({
// 	  name: 'Hubot',
// 	  login: 'hubot',
// 	})
//   }).then(function(response) {
// 	// レスポンス結果
// 	console.log('response');
//   }, function(error) {
// 	// エラー内容
//   });


fetch('ajax.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify({
			name: 'Hubot',
			login: 'hubot',
		})
    })
    .then(response => response.text()) 
    .then(data => { 
		console.log(data);
	})