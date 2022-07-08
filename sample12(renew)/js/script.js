//--------------------------//
// 最近の項目設定            //
//-------------------------//

const listNum = 5;//履歴表示数
const cookiePath = 'Path=/test/sample12(nws_renew)';//有効範囲
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

	//histelem.innerHTML = "";//履歴のボックスの中身を空にする
	/*histArray.map(function( value ) {
		histelem.insertAdjacentHTML('afterbegin','<li><a href="'+value.url+'">'+value.title+'</a></li>');
	});*/

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
		document.cookie = nameList.name +'=; max-age=0'+ ';' + cookiePath;
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
		document.cookie = 'url' + date2 + '='+ 'url=' + pageUrl + '&title=' + pageTitle + '&datetime=' + dateTime + ';' + cookieMaxage + ';'+cookiePath;

	//}
}


//cookieの値を削除
function cookieDelete(){
	let cookieArray = document.cookie.split(';');
	let urlList = cookieArray.filter(value => value.split('=')[0].match(/url/));
	let urlKey;

	urlList.map(function( value ) {
		urlKey = value.split('=')[0].trim();
		document.cookie = urlKey+'=; max-age=0'+ ';' + cookiePath;
	});

	histelem.innerHTML = '';

	alert('項目を削除しました。');
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


//-----------------------------//
// ボックスのDnDでの並べ替え設定 //
//----------------------------//

let itemData = {item1:'',item2:'',item3:''};
let orderArray = [];

const elemBox = document.getElementById("sidebar-right");
const elemItem1 = document.getElementById("item1");
const elemItem2 = document.getElementById("item2");
const elemItem3 = document.getElementById("item3");

cookieSortGet();//cookieの値を取得

boxSortOrder();//メニュー作成

//ボックス並び作成
function boxSortOrder() {

    for (var i = 0; i < orderArray.length; i++) {
        switch(orderArray[i]){
            case 'item1' :
                elemBox.appendChild(elemItem1);
                break;
            
            case 'item2' :
                elemBox.appendChild(elemItem2);
                break;
    
            case 'item3' :
                elemBox.appendChild(elemItem3);
                break;
        }
    }


	elemBox.classList.add('side-show');

	document.querySelectorAll('.side-box div').forEach (elm => {
		elm.ondragstart = function (e) {
			e.dataTransfer.setData('text/plain', e.target.id);
		};

		elm.ondragover = function (e) {
			e.preventDefault();
			let rect = this.getBoundingClientRect();
			if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
				//マウスカーソルの位置が要素の半分より上
				this.style.borderTop = '2px solid blue';
				this.style.borderBottom = '';
			} else {
				//マウスカーソルの位置が要素の半分より下
				this.style.borderTop = '';
				this.style.borderBottom = '2px solid blue';
			}
		};

		elm.ondragleave = function () {
			this.style.borderTop = '';
			this.style.borderBottom = '';
		};

		elm.ondrop = function (e) {
			e.preventDefault();
			let id = e.dataTransfer.getData('text/plain');
			let elm_drag = document.getElementById(id);
	
			let rect = this.getBoundingClientRect();
			if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
				//マウスカーソルの位置が要素の半分より上
				this.parentNode.insertBefore(elm_drag, this);
			} else {
				//マウスカーソルの位置が要素の半分より下
				this.parentNode.insertBefore(elm_drag, this.nextSibling);
			}
			this.style.borderTop = '';
			this.style.borderBottom = '';

			cookieSortSet();//並べ替え確定
		};
	});
}


//--Cookieの設定--//
let item1Num, item2Num, item3Num;

//cookieに値を格納
function cookieSortSet(){
	/*item1Num = $('#item1').index() + 1;
	item2Num = $('#item2').index() + 1;
	item3Num = $('#item3').index() + 1;

	document.cookie = 'item1=' + item1Num;
	document.cookie = 'item2=' + item2Num;
	document.cookie = 'item3=' + item3Num;*/

	let items = document.getElementsByClassName( "box-item" );
	let arrayMenus = Array.prototype.slice.call(items);

	let itemIdArray = ['item1','item2','item3'];
	let sort = itemIdArray.map(function( value ) {
		let target = document.getElementById(value);
		let index = arrayMenus.indexOf(target);

		return index;
	});

	item1Num = sort[0] + 1;
	item2Num = sort[1] + 1;
	item3Num = sort[2] + 1;

	document.cookie = 'item1=' + item1Num;
	document.cookie = 'item2=' + item2Num;
	document.cookie = 'item3=' + item3Num;


	//alert('cookieに並び順を格納しました。');
}


//cookieの値を取得
function cookieSortGet() {

	//データを1つずつに分ける
	let cookieArray = document.cookie.split(';');

	cookieArray.forEach(function (value) {

		//cookie名と値に分ける
		let content = value.split('=');

		switch (content[0].trim()) {

			case 'item1':
                orderArray[Number(content[1]-1)]='item1';
				break;

			case 'item2':
                orderArray[Number(content[1]-1)]='item2';
				break;

			case 'item3':
                orderArray[Number(content[1]-1)]='item3';
				break;
		}
	});

    return orderArray;
}


//cookieの値を削除
function cookieSortDel(){
	document.cookie = 'item1=; max-age=0';
	document.cookie = 'item2=; max-age=0';
	document.cookie = 'item3=; max-age=0';

	orderArray = ['item1','item2','item3'];
	boxSortOrder();
	alert('itemの値を削除しました。');
}