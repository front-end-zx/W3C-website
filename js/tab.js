/**
 * tab选项卡
 */
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