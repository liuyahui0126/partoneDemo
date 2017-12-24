(function (){
	var $slider = $('.slider');
	len = $slider.length;

	function init(){
		if(len> 1){
			var liStr = '';
				btnStr = '';
			for(var i = 0;i< len;i++){
				if(i == 0){
					liStr += '<li class="active"></li>'
				}else{
					liStr += '<li></li>'
				}
			}
			liStr = '<div class="slider-point"><ul>' + liStr + '</ul></div>';
			btnStr = '<div class="slider-btn">\
					<div class="prev"></div>\
					<div class="next"></div>\
					</div>'
			$('.wrapper').append(liStr).append(btnStr);
		}
	}
	init();

	var $prev = $('.prev');
	var $next = $('.next');
	var $li = $('li');
	var lock = true;
	var activeIndex = 0;
	var	lastIndex;

//注册点击事件
	$prev.on('click',function(){
		tool('prev');
	});
	$next.on('click',function(){
		tool('next');
	})
	$li.on('click',function(){
		var index = $(this).index();
		tool(index);
	})
	function tool(attr){
		if(lock){
			changeIndex(attr);
			if(lastIndex != activeIndex){
				lock = false;
				$slider.eq(lastIndex).trigger('go').end().eq(activeIndex).trigger('come');
				activeChange();
			}
		}
	}
//获取坐标值
	function changeIndex(direction){
		lastIndex = activeIndex;
		if(direction == 'prev' || direction == 'next'){
			if(direction == 'prev'){
				activeIndex  = activeIndex == 0 ? len-1 : activeIndex-1;
			}else{
				activeIndex  = activeIndex == len-1  ? 0 : activeIndex+1;
			}
		}else{
			activeIndex = direction;
		}
	}

	$slider.on('go',function(){
		$slider.eq(lastIndex).fadeOut(300).find('p').animate({fontSize:16})
		.end().find('.image').animate({width:'0%'});
	})
	$slider.on('come',function(){
		$slider.eq(activeIndex).delay(300).fadeIn(300).find('p').delay(600)
		.animate({fontSize:20}).end().find('.image').delay(600).animate({width:'40%'},function(){
			lock = true;
		});
	})

	function activeChange(){
		$('.active').removeClass('active');
		$li.eq(activeIndex).addClass('active');
	}
})()