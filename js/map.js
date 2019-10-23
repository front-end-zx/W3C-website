/**
 * 轮播图简单的封装
 * 
 */

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