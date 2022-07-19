// 表示要素 DOM操作用定数
const contents = document.getElementById('csv');

// ページネーション DOM操作用の定数
const total_el = document.querySelector('.total_counter');
const page_counter = document.querySelector('.page_counter');
const prev_btn = document.querySelector('.prev');
const next_btn = document.querySelector('.next');
const count = 10;//表示する1ページの項目件数

// グローバル変数
let redraw_elements;//項目(#csv > li)要素
let total_length;//項目要素のトータル数
let current_step;//現在表示しているページ番号
let index_start;//表示しているページの先頭項目のインデックス番号
let index_end;//表示しているページの最後尾項目のインデックス番号
let pager_inner;//番号ボタンオブジェクト
let ellipsisFlag = false;//省略記号なし(初期値)
let total_step;//ページ数


// ページ数を算出
function split_page(current_step_update) {

    //prec、next非活性設定（番号1か最終番号の時）
    btn_disable(current_step_update);

    total_el.textContent = current_step + '/' + total_step;
    redraw(redraw_elements, redraw_elements.length, total_step, current_step, count);

    //currentクラスを取る
    Array.prototype.slice.call(pager_inner).forEach(function( value ) {
        value.classList.remove('current');
    });

    //番号にcurrentクラスを設置
    let pager_current = document.querySelector('[data-counter-id="'+current_step_update+'"]');
    pager_current.classList.add('current');
}

// DOMの描画
function redraw(redraw_elements, total, total_step, current_step, count) {
    // 現在の表示indexを割り出す
    index_start = current_step * count - count;
    index_end = current_step * count - 1;
    let index_array = [];

    for (let i = index_start; i < index_end + 1; i++) {
        index_array.push(i);
    }

    // 一時削除
    while( contents.lastChild ) {
        contents.lastChild.remove();
    }

    // 再描画
    redraw_elements.forEach((element, index) => {
        if(index_array.indexOf(index) != -1) {
            contents.appendChild(element);
        }
    });
}


// ページカウンターの作成（初期設定）
function create_page_counter(redraw_elements) {
    total_step = Math.ceil(redraw_elements.length/count);//ページ数
    total_one_before = total_step-1;

    current_step_update = 1;//仮 番号1

    if(total_step > 10){

        if(current_step_update <= 7){//番号が8以下の場合
            btn_before_set();
    
        }else if(total_step-3 <= current_step_update){//番号がトータルから3つ前以降の場合
            btn_after_set();
    
        }else{//番号が、5～(total-4)の場合
            btn_middle_set(current_step_update);
        }

    }else{
        btn_base_set(current_step_update);  
    }

    pager_inner = document.querySelectorAll('.page_counter > li');
    pager_current = document.querySelector('[data-counter-id="'+current_step_update+'"]');
    pager_current.classList.add('current');

    btn_disable();
}

//ページ移動時のページボタンのカレント変更
function page_counter_change(current_step_update){

    // 一時削除
    while( page_counter.lastChild ) {
        page_counter.lastChild.remove();
    }

    if(total_step > 10){
        
        if(current_step_update <= 7){//番号が8以下の場合
            btn_before_set();

        }else if(total_step-6 <= current_step_update){//番号がトータルから3つ前以降の場合
            btn_after_set();

        }else{//番号が、5～(total-4)の場合
            btn_middle_set(current_step_update);
        }

    }else{
        btn_base_set(current_step_update);
    }

    pager_current = document.querySelector('[data-counter-id="'+current_step_update+'"]');
    pager_current.classList.add('current');

    document.querySelectorAll('.page_number').forEach((element, index) => {
        element.addEventListener('click', function(e) {
            current_step = Number(element.getAttribute('data-counter-id'));
            split_page(current_step, redraw_elements);
            page_counter_change(current_step);//省略記号ある時に実行
        })
    });
}


// イベント処理
prev_btn.addEventListener('click', () => {
    split_page(current_step -= 1, redraw_elements);
    page_counter_change(current_step);
});

next_btn.addEventListener('click', () => {
    split_page(current_step += 1, redraw_elements);
    page_counter_change(current_step);
});

//prev、next 非活性設定
function btn_disable(current_step_update){
    if( current_step_update === undefined || current_step === 1) {
        current_step = 1;
        next_btn_disable(); 
        prev_btn_active();
    } else if( current_step_update === total_step ) {
        next_btn_active(); 
        prev_btn_disable();
    } else {
        current_step = current_step_update;
        next_btn_disable(); 
        prev_btn_disable();
    }
}


// class付与・削除関数
prev_btn_active = () => {
    prev_btn.classList.add('disable');
}
prev_btn_disable = () => {
    prev_btn.classList.remove('disable');
}
next_btn_disable = () => {
    next_btn.classList.remove('disable');
}
next_btn_active = () => {
    next_btn.classList.add('disable');
}

btn_base_set = (current_step_update) => {
    for (let i = 1; i < Math.ceil(redraw_elements.length / count) + 1; i++) {
        let count_list = document.createElement('li');
        count_list.setAttribute('data-counter-id', i);
        count_list.classList.add('page_number');
        count_list.textContent = i;
        page_counter.appendChild(count_list);
    }     
}


//番号と省略記号を後ろに挿入
btn_before_set = () => {
    let pager_current;
    total_one_before = total_step-1;
    total_two_before = total_step-2;

    for (let i = 1; i < 10; i++) {
        let count_list = document.createElement('li');
        count_list.setAttribute('data-counter-id', i);
        count_list.classList.add('page_number');
        count_list.textContent = i;
        page_counter.appendChild(count_list);
    }

    let listArray = [
        {class: 'ellipsis', data: '…'},
        {class: 'page_number', data: total_one_before},
        {class: 'page_number', data: total_step},
    ]

    list_set(listArray, page_counter);
}


//番号と省略記号を前に挿入
btn_after_set = () => {

    let listArray = [
        {class: 'page_number', data: 1},
        {class: 'page_number', data: 2},
        {class: 'ellipsis', data: '…'},
    ]

    list_set(listArray, page_counter);

    for (let i = total_step-8; i <= total_step ; i++) {
        let count_list = document.createElement('li');
        count_list.setAttribute('data-counter-id', i);
        count_list.classList.add('page_number');
        count_list.textContent = i;
        page_counter.appendChild(count_list);
    }
}


//番号と省略記号を前後に挿入
btn_middle_set = (current_step_update) => {

    let listArray1 = [
        {class: 'page_number', data: 1},
        {class: 'page_number', data: 2},
        {class: 'ellipsis', data: '…'},
    ]

    list_set(listArray1, page_counter);

    for (let i = current_step_update-3; i <= current_step_update+3 ; i++) {
        let count_list = document.createElement('li');
        count_list.setAttribute('data-counter-id', i);
        count_list.classList.add('page_number');
        count_list.textContent = i;
        page_counter.appendChild(count_list);
    }

    let listArray2 = [
        {class: 'ellipsis', data: '…'},
        {class: 'page_number', data: total_one_before},
        {class: 'page_number', data: total_step},
    ]

    list_set(listArray2, page_counter);
}


//省略記号含む先頭と後ろのリスト生成
function list_set(listArray, page_counter){
    listArray.forEach(function(value){
        let count_list = document.createElement('li');
        if(value.class==='page_number'){
            count_list.setAttribute('data-counter-id', value.data);
        }
        count_list.classList.add(value.class);
        count_list.textContent = value.data;
        page_counter.appendChild(count_list);
    });
}