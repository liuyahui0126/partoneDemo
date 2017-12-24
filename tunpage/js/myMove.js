function getStyle(dom,attr,func){
			if(!dom || !attr){return null;}
			if(window.getComputedStyle){
				return window.getComputedStyle(dom,null)[attr];
			}else{
				return dom.currentStyle[attr];
			}
		}

function startMove(dom,targetobj,func){
	clearInterval(dom.timer);
	var speed = 0;
	var alpha;
	dom.timer = setInterval(function(){
		var bstop = true;
		for(var attr in targetobj){
			if(attr === 'opacity'){
				alpha = parseFloat(getStyle(dom,attr)) * 100;
			}else{
				alpha = parseInt(getStyle(dom,attr));
			}
			speed = (targetobj[attr] - alpha ) / 6;
			speed = speed> 0 ? Math.ceil(speed) : Math.floor(speed); 
			if(attr === 'opacity'){
					dom.style[attr] = (alpha + speed)/100;
			}else{
					dom.style[attr] = alpha + speed + 'px';
				}
			if(targetobj[attr] != alpha){
				bstop = false;
			}
		}
		if(bstop){
			clearInterval(dom.timer);
			func && func();
		}
	},30);
}