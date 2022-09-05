const exitPath = 'exit/index.php';

let fileName = getTodaysString();
let filePath = 'files/today/' + fileName + '.txt';

let fd = new FormData();
fd.append('data', filePath);

//PHPでテキストファイルの存在チェック
fetch(exitPath, {
	method: 'post',
	body: fd,
	cache: "no-store"
})
	.then((response) => {
		if (!response.ok) {
			throw new Error();
		}
		return response;
	})
	.then(response => response.text())
	.then(data => {
		//console.log(data);
		//本日の予定のテキストファイルがある場合
		if (data == 1) {
			fileLoad(); //テキスト読み込み
		}
	})
	.catch(() => {
		console.log('php処理不可');
		fileLoad(); //テキスト読み込み
	})



//本日の予定 テキスト挿入
function fileLoad(){
	fetch(filePath, { cache: "no-store" })
	.then((response) => {
		if (!response.ok) {
			throw new Error();
		}
		return response;
	})
	.then(response => response.text())
	.then(data => { // 本日予定のtextがある
		if (data.trim() !== '') {
			console.log(data);
		}
	})
	.catch(() => {
		console.log('ファイルがありません。')
	})
}


//本日の日付生成
function getTodaysString() {
	let date = new Date();
	let formattedDate = [
		date.getFullYear(),
		('0' + (date.getMonth() + 1)).slice(-2),
		('0' + date.getDate()).slice(-2)
	].join('');
	return formattedDate;
}