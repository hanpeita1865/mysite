//通常
const links = document.querySelectorAll(".link");

links.forEach(function(elm) {
    elm.addEventListener('click',function(e){
        console.log(e.target);//span要素が指定される
        console.log(e.target.closest('a'));//a要素が指定される
        console.log(this);//a要素が指定される
    }); 
});
               

//アロー関数を使用した場合
const awLinks = document.querySelectorAll(".arrow-link");

awLinks.forEach(function(elm) {
    elm.addEventListener('click', (e) => {
        console.log(e.target);//span要素が指定される
        console.log(e.currentTarget);
        //console.log(this);//エラーになる
    });
});