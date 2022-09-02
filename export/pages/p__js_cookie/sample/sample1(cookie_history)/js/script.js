//--Cookieの履歴設定--//

const listNum = 5;//履歴表示数
//const cookiePath = 'Path=/test/sample11(cookie_history)';//有効範囲
const cookieMaxage = 'max-age=604800'//有効期限（秒単位）

let histArray = [];//履歴まとめ
const histelem = document.getElementById('history');

//let menu = document.getElementsByClassName('h-link')
//let menus = Array.from(menu);

let menus = document.querySelectorAll(".h-link");

//リンクをクリックで履歴を保存
menus.forEach(function(target) {

	target.addEventListener('click',function(e){
		let href = e.target.getAttribute('href');
		let text = e.target.textContent;

		cookieSetting(href,text);
		//e.preventDefault();
	},false);
});

historyShow();

//閲覧履歴を表示
function historyShow(){

	histArray = cookieGet();

	//降順に並べ替え
	let histArray_desc = histArray.sort(function(a, b) {
		return (a.name > b.name) ? -1 : 1;
	});

	console.log(histArray_desc);

	for (var i = 0; i < histArray_desc.length; i++) {

		if (i == listNum) {
			break;
		}

		histelem.insertAdjacentHTML('beforeend','<li><a href="'+histArray_desc[i].url+'">'+histArray_desc[i].title+'</a></li>');
	}
}


//cookieに値を格納
function cookieSetting(href,text){
	//let pageUrl = location.href;
	let pageUrl = href;
	let pageTitle = text;

	pageUrl = pageUrl.replace('index.html','');//index.html削除
	pageUrl = pageUrl.replace(location.search,'');//クエリー情報削除
	pageUrl = pageUrl.replace(location.hash,'');//ハッシュ(ページ内リンク)削除

	histArray = cookieGet();

	//Cookieに同じURLのデータが存在するか判定
	let hasUrl = histArray.some(value => {
		return value.url === pageUrl;
	});

	//同じURLのデータを削除
	if(hasUrl==true){
		let nameList = histArray.find(value => value.url === pageUrl);
		document.cookie = nameList.name +'=; max-age=0'+ ';';
	}


	//if(hasUrl==false){
		const date1 = new Date();
		const date2 = ("00" + (date1.getMonth() + 1)).slice(-2)  + 
					("00" + (date1.getDate())).slice(-2) +
					("00" + (date1.getHours())).slice(-2) +
					("00" + (date1.getMinutes())).slice(-2) +
					("00" + (date1.getSeconds() + 1)).slice(-2) +
					("00" + (date1.getMilliseconds() + 1)).slice(-2);

		let dateTime = date1.toLocaleString();//表記 2020/2/1 20:49:28

		//cookieに登録
		document.cookie = 'url' + date2 + '='+ 'url=' + pageUrl + '&title=' + pageTitle + '&datetime=' + dateTime + ';' + cookieMaxage + ';';

	//}
}


//cookieの値を削除
function cookieDelete(){
	let cookieArray = document.cookie.split(';');
	let urlList = cookieArray.filter(value => value.split('=')[0].match(/url/));
	let urlKey;

	urlList.map(function( value ) {
		urlKey = value.split('=')[0].trim();
		document.cookie = urlKey+'=; max-age=0'+ ';';
	});

	histelem.innerHTML = '';

	alert('cookieの値を削除しました。');
}


//cookieの値を取得
function cookieGet() {
	//データを1つずつに分ける
	let cookieArray = document.cookie.split(';');
	//urlが付くキーのデータだけ抜き取る
	let urlList = cookieArray.filter(value => value.split('=')[0].match(/url/));

	let data,data1,data2,data3;

	urlList.map(function( value ) {
		let objData = {};//オブジェクト
		data = value.split('=');
		urlKey = data[0].trim();
		data1 = value.replace(data[0]+'=','');

		let data3 = data1.split('&');

		objData['name'] = urlKey;

		data3.filter( function( value ) {
			data2 = value.split('=');
			key = data2[0];
			objData[key] = data2[1];
		});

		histArray.push(objData);
	});

	return histArray;
}
