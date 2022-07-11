//-----------------------------//
// ボックスのDnDでの並べ替え設定 //
//----------------------------//

//let itemData = {itemR1:'',itemR2:'',itemR3:''};
let orderArrayL = [];
let orderArrayR = [];

let orderArray = [];


//let histArray = [];//履歴まとめ

const elemBoxL = document.getElementById("sidebar-left");
const elemitem1 = document.getElementById("item1");
const elemitem2 = document.getElementById("item2");
const elemitem3 = document.getElementById("item3");

const elemBoxR = document.getElementById("sidebar-right");
const elemitem4 = document.getElementById("item4");
const elemitem5 = document.getElementById("item5");
const elemitem6 = document.getElementById("item6");



//--Cookieの設定--//
let item1Num, item2Num, item3Num, item4Num, item5Num, item6Num;

//cookieSortSetL();
//cookieSortSetR();

//cookieに値を格納（左サイドバー）
function cookieSortSetL(){

	let leftBox = document.getElementById('sidebar-left');
	let items = leftBox.getElementsByClassName( "box-item" );
	let arrayMenus = Array.prototype.slice.call(items);

	let itemL = arrayMenus.map(function( value ) {
		return value.id;
	});

	itemL.map(function( value ) {
		let target = document.getElementById(value);
		let index = arrayMenus.indexOf(target) + 1;

		document.cookie = value + '='+ 'order=' + index + '&side=Left;';

	});
}


//cookieに値を格納（右サイドバー）
function cookieSortSetR(){

	let rightBox = document.getElementById('sidebar-right');
	let items = rightBox.getElementsByClassName( "box-item" );
	let arrayMenus = Array.prototype.slice.call(items);

	let itemR = arrayMenus.map(function( value ) {
		return value.id;
	});

	itemR.map(function( value ) {
		let target = document.getElementById(value);
		let index = arrayMenus.indexOf(target) + 1;

		document.cookie = value + '='+ 'order=' + index + '&side=Right;';

	});
}

cookieSortGet()

//cookieの値を取得
function cookieSortGet() {

	//データを1つずつに分ける
	let cookieArray = document.cookie.split(';');
	//urlが付くキーのデータだけ抜き取る
	let itemList = cookieArray.filter(value => value.split('=')[0].match(/item/));

	console.log(itemList);

	let data,data1,data2,data3;

	itemList.map(function( value ) {
		let objData = {};//オブジェクト
		data = value.split('=');
		urlKey = data[0].trim();
		data1 = value.replace(data[0]+'=','');

		data2 = data1.split('&');

		objData['name'] = urlKey;

		data2.filter( function( value ) {
			data3 = value.split('=');
			key = data3[0];
			objData[key] = data3[1];
		});

		orderArray.push(objData);
	});

	console.log(orderArray);

	for (var i = 0; i < orderArray.length; i++) {

		console.log(orderArray[i]['side']);

        /*switch(orderArray[i]){
            case 'itemR1' :
                elemBoxR.appendChild(elemitemR1);
                break;
            
            case 'itemR2' :
                elemBoxR.appendChild(elemitemR2);
                break;
    
            case 'itemR3' :
                elemBoxR.appendChild(elemitemR3);
                break;
        }*/

	}

	//データを1つずつに分ける
	/*let cookieArray = document.cookie.split(';');

	cookieArray.forEach(function (value) {

		//cookie名と値に分ける
		let content = value.split('=');

		switch (content[0].trim()) {

			case 'item1':
                orderArrayR[Number(content[1]-1)]='itemR1';
				break;

			case 'item2':
                orderArrayR[Number(content[1]-1)]='itemR2';
				break;

			case 'item3':
                orderArrayR[Number(content[1]-1)]='itemR3';
				break;

			case 'item4':
				orderArrayL[Number(content[1]-1)]='itemL1';
				break;

			case 'item5':
				orderArrayL[Number(content[1]-1)]='itemL2';
				break;

			case 'item6':
				orderArrayL[Number(content[1]-1)]='itemL3';
				break;
		}
	});*/
}




//cookieSortGet();//cookieの値を取得

//boxSortOrder();//メニュー作成

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

let navItem = document.querySelectorAll(".nav-item");

navItem.forEach(function(target) {

	target.addEventListener('mouseover', function(e){
		e.target.querySelector('div.hover-list-bg').classList.add('show');
	}, false);

	//マウスが要素上から離れた時
	target.addEventListener('mouseleave',function(e){
		e.target.querySelector('div.hover-list-bg').classList.remove('show');
	}, false);
});
