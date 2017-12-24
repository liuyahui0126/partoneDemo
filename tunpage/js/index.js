var osilderPage = document.getElementById('sp');
var oLeftBtn = document.getElementById('lBtn');
var oRightBtn = document.getElementById('rBtn');
var oIArry = document.getElementsByTagName('i');
var delayTime = null;
// 几张图片在轮播
var len = osilderPage.children.length - 1;
//可以记录li的真实宽度
var moveWidth = osilderPage.children[0].offsetWidth;
//记录当前播放是第几张
var index = 0;
var lock = true;

//默认方向 '<-' 'rightToleft'
//LeftBtn '->' 'leftToright'

oLeftBtn.onclick = function(){
	controlMove('leftToright');
}
oRightBtn.onclick = function(){
	controlMove('rightToleft');
}

function controlMove(direction){
	if(lock){
		lock = false;
		clearTimeout(delayTime);
		if(!direction || direction == 'rightToleft'){
			// 2->1
			index++;
			startMove(osilderPage,{left:osilderPage.offsetLeft -moveWidth},function(){
				//是否到最后一张
				if(osilderPage.offsetLeft == -len*moveWidth){
					osilderPage.style.left = '0px';
					index = 0;
				}
				changeIndex();
				delayTime = setTimeout(controlMove,1500);
				lock = true;
			});
		}else if(direction == 'leftToright'){
			// 1->2
			//直接跳到最后一张
			if(osilderPage.offsetLeft == 0){
				osilderPage.style.left = -len*moveWidth + 'px';
				index = len;
			}
			index--;
			startMove(osilderPage,{left:osilderPage.offsetLeft +600},function(){
				changeIndex();
				delayTime = setTimeout(controlMove,1500);
				lock = true;
			});
			delayTime = setTimeout(controlMove,1500);
		}
	}
}
function changeIndex(){
	for(var i = 0;i< oIArry.length;i++){
		oIArry[i].className = '';
	}
	oIArry[index].className = 'active';
}
//闭包
for(var i = 0;i< oIArry.length;i++){
	(function(thisindex){
		oIArry[i].onclick = function(){
			// alert(thisindex);
			index = thisindex ;
			lock = false;
			clearTimeout(delayTime);
			startMove(osilderPage,{left:-index * moveWidth},function(){
				lock = true;
				delayTime = setTimeout(controlMove,1500);
				changeIndex();
			});
		}
	})(i)
}

delayTime = setTimeout(controlMove,1500);
