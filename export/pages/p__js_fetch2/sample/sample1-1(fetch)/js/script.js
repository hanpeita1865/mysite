const todaySc = document.getElementById('result');

fetch('files/today/20220730.txt')
	.then((response) => {
		if (!response.ok) {
			throw new Error();
		}
		return response;
	})
	.then(response => response.text()) // (2) レスポンスデータを取得
	.then(data => { // (3)レスポンスデータを処理
		console.log('成功');
		todaySc.innerHTML = data;
	})
	.catch((reason) => {
		console.log('エラー');
	});