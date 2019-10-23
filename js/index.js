$(function(){
	// 搜索栏
	$(".header-search").on("focus",function(){
		$(".hot").css("display","none");
		console.log(1);
		$(".search").css("borderBottom","1px solid #C81623");
	});
	$(".header-search").on("blur",function(){
		if($(".header-search").val()!==''){
			$(".hot").css("display","none");
			console.log($(".header-search").val());
		}else{
			$(".hot").css("display","block");
			$(".search").css("borderBottom","1px solid #D9DDE1");
		}
	});
});


// 返回顶部按钮
var btnTop = document.querySelector(".btn-top");
window.onscroll = function(){
	if(scroll().top>=676){
		btnTop.style.display = "block";
	}else{
		btnTop.style.display = "none";
	}
}
btnTop.onclick = function(){
	window.scrollTo(0,0);
}

// tab选项卡
tab("toolWrap");
 function tab(ele){
 	var ele = document.getElementById(ele);
 	var ul = ele.children[0];
 	var liArr = ul.children;
 	console.log(liArr);
 	var spanArr = ele.querySelectorAll(".tab");
 	console.log(spanArr);
 	for(var i=0;i<liArr.length;i++){
 		liArr[i].index = i;
 		liArr[i].onclick = function(){
 			for(var j=0;j<liArr.length;j++){
 				liArr[j].className = '';
 				spanArr[j].classList.remove('current');
 			}
 			this.className = 'active';
 			spanArr[this.index].classList.add('current');
 		}
 	}
 }
// 轮播图
map("map");
function map (ele){
	var wrap = document.getElementById(ele);
	var ul = wrap.children[0];
	var ol = wrap.children[1];
	var side = wrap.children[2];
	var spanArr = side.children;
	var imgWidth = wrap.offsetWidth;
	var newLi = ul.children[0].cloneNode(true);
	ul.appendChild(newLi);
	for(var i=0; i<ul.children.length-1; i++){
		var olliArr = document.createElement("li");
		ol.appendChild(olliArr);
	}
	var olArr = ol.children;
	olArr[0].className = "current";
	for(var i=0; i<olArr.length; i++){
		olArr[i].index = i; 
		olArr[i].onmouseover = function (){
			for(var j=0; j<olArr.length; j++){
				olArr[j].className = "";
			}
			this.className = "current";
			key = square = this.index;
			animate(ul,-this.index*imgWidth);
		}
	}
	var timer = setInterval(autoplay,3000);
	var key = 0;
	var square = 0;
	function autoplay(){
		key++;
		if(key>olArr.length){
			key = 1;
			ul.style.left = 0;
		}
		animate(ul,-key*imgWidth);
		square++;
		if(square>olArr.length-1){
			square = 0;
		}
		for(var i=0; i<olArr.length; i++){
			olArr[i].className = "";
		}
		olArr[square].className = "current";
	}
	wrap.onmouseover = function (){
		clearInterval(timer);
		side.style.display = "block";
	}
	wrap.onmouseout = function(){
		side.style.display = "none";
		timer = setInterval(autoplay,3000);
	}
	spanArr[0].onclick = function (){
		key--;
		if(key<0){
			ul.style.left = -olArr.length*imgWidth+"px";
			key = olArr.length-1;
		}
		animate(ul,-key*imgWidth);
		square--;
		if(square<0){
			square = olArr.length-1;
		}
		for(var i=0; i<olArr.length; i++){
			olArr[i].className = "";
		}
		olArr[square].className = "current";
	}
	spanArr[1].onclick = function (){
		autoplay();
	}
	function animate(ele,target){
		clearInterval(ele.timer);
		var speed = target>ele.offsetLeft?10:-10;
		ele.timer = setInterval(function(){
			var val = target-ele.offsetLeft;
			ele.style.left = ele.offsetLeft + speed + "px";
			if(Math.abs(val)<Math.abs(speed)){
				ele.style.left = target+"px";
				clearInterval(ele.timer);
			}
		},10)
	}
}
// 兼容性scroll方法
function scroll(){
	return {
		"top":document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset,
		"left":document.body.scrollLeft||document.documentElement.scrollLeft||window.pageXOffset
	}
}