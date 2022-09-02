
/*$(function () {
	//ホバー時
	$('.nav-item').hover(function () {
		$(this).children('.hover-list-bg').toggleClass('show');
	});
	
});*/

let navItem = document.querySelectorAll(".nav-item");

navItem.forEach(function(navlink) {

	navlink.addEventListener('mouseover', function(e){
		console.log(e.target);
		//e.target.querySelector('div.hover-list-bg').classList.add('show');
	}, false);

	//マウスが要素上から離れた時
	/*navlink.addEventListener('mouseleave',function(e){
		//console.log(e.target.id);
		e.target.querySelector('div.hover-list-bg').classList.remove('show');
	}, false);*/
});
