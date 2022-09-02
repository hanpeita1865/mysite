fetch('files/news/sample.txt') 
.then(response => response.text()) 
.then(data => { 
    contents.innerHTML = data;

    redraw_elements = document.querySelectorAll('#csv > li');

    const current_step_update= 1;//初期ページ表示設定

    create_page_counter(redraw_elements);
    split_page(current_step_update);

    document.querySelectorAll('.page_number').forEach((element, index) => {
        element.addEventListener('click', function(e) {
            current_step = Number(element.getAttribute('data-counter-id'));
            split_page(current_step, redraw_elements);
            page_counter_change(current_step);
        })
    });
});