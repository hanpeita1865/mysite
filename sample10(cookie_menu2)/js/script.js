
let itemData = {item1:'',item2:'',item3:''};
let orderArray = [];

const elemBox = document.getElementById("menu");
const elemItem1 = document.getElementById("item1");
const elemItem2 = document.getElementById("item2");
const elemItem3 = document.getElementById("item3");
const items = document.getElementsByClassName("box-item");
const itemIdArray = ['item1','item2','item3'];

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

	document.querySelectorAll('.side-link li').forEach (elm => {
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

	let arrayMenus = Array.prototype.slice.call(items);
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