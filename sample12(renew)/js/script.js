//--------------------------//
// 最近の項目設定            //
//-------------------------//

const listNum = 5;//履歴表示数
//const cookiePath = 'Path=/test/sample12(nws_renew)';//有効範囲
const cookieMaxage = 'max-age=604800'//有効期限（秒単位）

let histArray = [];//履歴まとめ
const histelem = document.getElementById('history');

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
	if (window.confirm('最近使った項目のリストを削除していいですか')) {
		let cookieArray = document.cookie.split(';');
		let urlList = cookieArray.filter(value => value.split('=')[0].match(/url/));
		let urlKey;

		urlList.map(function( value ) {
			urlKey = value.split('=')[0].trim();
			document.cookie = urlKey+'=; max-age=0'+ ';';
		});

		histelem.innerHTML = '';
	}	
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

//let itemData = {itemR1:'',itemR2:'',itemR3:''};
let orderArrayR = [];
let orderArrayL = [];

const elemBoxR = document.getElementById("sidebar-right");
const elemitemR1 = document.getElementById("itemR1");
const elemitemR2 = document.getElementById("itemR2");
const elemitemR3 = document.getElementById("itemR3");

const elemBoxL = document.getElementById("sidebar-left");
const elemitemL1 = document.getElementById("itemL1");
const elemitemL2 = document.getElementById("itemL2");
const elemitemL3 = document.getElementById("itemL3");

cookieSortGet();//cookieの値を取得

boxSortOrder();//メニュー作成

//ボックス並び作成
function boxSortOrder() {
	//右サイドバー
    for (var i = 0; i < orderArrayR.length; i++) {
        switch(orderArrayR[i]){
            case 'itemR1' :
                elemBoxR.appendChild(elemitemR1);
                break;
            
            case 'itemR2' :
                elemBoxR.appendChild(elemitemR2);
                break;
    
            case 'itemR3' :
                elemBoxR.appendChild(elemitemR3);
                break;
        }
    }

	//左サイドバー
    for (var i = 0; i < orderArrayL.length; i++) {
        switch(orderArrayL[i]){
            case 'itemL1' :
                elemBoxL.appendChild(elemitemL1);
                break;
            
            case 'itemL2' :
                elemBoxL.appendChild(elemitemL2);
                break;
    
            case 'itemL3' :
                elemBoxL.appendChild(elemitemL3);
                break;
        }
    }


	elemBoxR.classList.add('side-show');
	elemBoxL.classList.add('side-show');

	let sideLeftElm = document.getElementById('sidebar-left');
	let sideRightElm = document.getElementById('sidebar-right');
	let startId;

	//左サイドドラッグ
	sideLeftElm.querySelectorAll('.side-box div.box-item').forEach (elm => {
		elm.ondragstart = function (e) {
			e.dataTransfer.setData('text/plain', e.target.id);
			startId = e.target.id;
		};

		elm.ondragover = function (e) {
			if(startId.match(/L/)){
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
			}
		};

		elm.ondragleave = function () {
			this.style.borderTop = '';
			this.style.borderBottom = '';
		};

		elm.ondrop = function (e) {

			e.preventDefault();
			let id = e.dataTransfer.getData('text/plain');

			if(id.match(/L/)){
				let elm_drag = document.getElementById(id);
	
				let rect = this.getBoundingClientRect();
	
				if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
					//マウスカーソルの位置が要素の半分より上
					this.parentNode.insertBefore(elm_drag, this);
				} else {
					//マウスカーソルの位置が要素の半分より下
					this.parentNode.insertBefore(elm_drag, this.nextSibling);
				}

				cookieSortSetL();//左サイドバー並べ替え確定
			}
			this.style.borderTop = '';
			this.style.borderBottom = '';
		};
	});

	//右サイドバードラッグ
	sideRightElm.querySelectorAll('.side-box div.box-item').forEach (elm => {

		elm.ondragstart = function (e) {
			e.dataTransfer.setData('text/plain', e.target.id);
			startId = e.target.id;
		};

		elm.ondragover = function (e) {
			e.preventDefault();
			if(startId.match(/R/)){
				let rect = this.getBoundingClientRect();
				if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
					//マウスカーソルの位置が要素の半分より上
					this.style.borderTop = '2px solid red';
					this.style.borderBottom = '';
				} else {
					//マウスカーソルの位置が要素の半分より下
					this.style.borderTop = '';
					this.style.borderBottom = '2px solid red';
				}
			}
		};

		elm.ondragleave = function () {
			this.style.borderTop = '';
			this.style.borderBottom = '';
		};

		elm.ondrop = function (e) {

			e.preventDefault();
			let id = e.dataTransfer.getData('text/plain');

			if(id.match(/R/)){
				let elm_drag = document.getElementById(id);
		
				let rect = this.getBoundingClientRect();

				if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
					//マウスカーソルの位置が要素の半分より上
					this.parentNode.insertBefore(elm_drag, this);
				} else {
					//マウスカーソルの位置が要素の半分より下
					this.parentNode.insertBefore(elm_drag, this.nextSibling);
				}

				cookieSortSetR();//右サイドバー並べ替え確定
			}
			this.style.borderTop = '';
			this.style.borderBottom = '';
		};
	});
}


//--Cookieの設定--//
let itemR1Num, itemR2Num, itemR3Num, itemL1Num, itemL2Num, itemL3Num;

//cookieに値を格納（右サイドバー）
function cookieSortSetR(){

	let rightBox = document.getElementById('sidebar-right');
	let items = rightBox.getElementsByClassName( "box-item" );
	let arrayMenus = Array.prototype.slice.call(items);

	let itemIdArray = ['itemR1','itemR2','itemR3'];
	let sort = itemIdArray.map(function( value ) {
		let target = document.getElementById(value);
		let index = arrayMenus.indexOf(target);

		return index;
	});

	itemR1Num = sort[0] + 1;
	itemR2Num = sort[1] + 1;
	itemR3Num = sort[2] + 1;

	document.cookie = 'itemR1=' + itemR1Num;
	document.cookie = 'itemR2=' + itemR2Num;
	document.cookie = 'itemR3=' + itemR3Num;
}

//cookieに値を格納（左サイドバー）
function cookieSortSetL(){

	let leftBox = document.getElementById('sidebar-left');
	let items = leftBox.getElementsByClassName( "box-item" );
	let arrayMenus = Array.prototype.slice.call(items);

	let itemIdArray = ['itemL1','itemL2','itemL3'];
	let sort = itemIdArray.map(function( value ) {
		let target = document.getElementById(value);
		let index = arrayMenus.indexOf(target);

		return index;
	});

	itemL1Num = sort[0] + 1;
	itemL2Num = sort[1] + 1;
	itemL3Num = sort[2] + 1;

	document.cookie = 'itemL1=' + itemL1Num;
	document.cookie = 'itemL2=' + itemL2Num;
	document.cookie = 'itemL3=' + itemL3Num;
}


//cookieの値を取得
function cookieSortGet() {

	//データを1つずつに分ける
	let cookieArray = document.cookie.split(';');

	cookieArray.forEach(function (value) {

		//cookie名と値に分ける
		let content = value.split('=');

		switch (content[0].trim()) {

			case 'itemR1':
                orderArrayR[Number(content[1]-1)]='itemR1';
				break;

			case 'itemR2':
                orderArrayR[Number(content[1]-1)]='itemR2';
				break;

			case 'itemR3':
                orderArrayR[Number(content[1]-1)]='itemR3';
				break;

			case 'itemL1':
				orderArrayL[Number(content[1]-1)]='itemL1';
				break;

			case 'itemL2':
				orderArrayL[Number(content[1]-1)]='itemL2';
				break;

			case 'itemL3':
				orderArrayL[Number(content[1]-1)]='itemL3';
				break;
		}
	});
}


//cookieの値を削除
function cookieSortDel(){
	if (window.confirm('並び順序をリセットしていいですか')) {
		document.cookie = 'itemR1=; max-age=0';
		document.cookie = 'itemR2=; max-age=0';
		document.cookie = 'itemR3=; max-age=0';
		document.cookie = 'itemL1=; max-age=0';
		document.cookie = 'itemL2=; max-age=0';
		document.cookie = 'itemL3=; max-age=0';

		orderArrayR = ['itemR1','itemR2','itemR3'];
		orderArrayL = ['itemL1','itemL2','itemL3'];
		boxSortOrder();
	}
}


$(function () {
	//ホバー時
	$('.nav-item').hover(function () {
		$(this).children('.hover-list-bg').toggleClass('show');
	});
	
});


/*let navItem = document.querySelectorAll(".nav-item");

navItem.forEach(function(target) {

	target.addEventListener('mouseover', function(e){
		e.target.querySelector('div.hover-list-bg').classList.add('show');
	}, false);

	//マウスが要素上から離れた時
	target.addEventListener('mouseleave',function(e){
		//console.log(e.target.id);
		e.target.querySelector('div.hover-list-bg').classList.remove('show');
	}, false);
});*/
