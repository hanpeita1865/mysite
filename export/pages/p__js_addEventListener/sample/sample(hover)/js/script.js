let navItem = document.querySelectorAll(".nav-item");

navItem.forEach(function(target) {

	target.addEventListener('mouseover', function(e){
    e.target.style.background = '#000000';
	}, false);

	//マウスが要素上から離れた時
	target.addEventListener('mouseleave',function(e){
    e.target.style.background = '#0091EA';
	}, false);
});