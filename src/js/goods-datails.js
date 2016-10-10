jQuery(function($) {
	//点击增加或减少数量
	var $addnum = $(".content-main-sl");
	var $num = $addnum.find(".buynum");
	var index = 1;
	$addnum.on("click", ".up", function() {
			$num.val(index++);
			$addnum.find(".low").css({
				"background": "#fff"
			});
		}).on("click", ".low", function() {
			if(index > 0) {
				$num.val(index--);
			} else if($num.val() == 1) {
				$addnum.find(".low").css({
					"background": "#e3e3e3"
				});
			}
		});
		
		//点击切换小图对应大图$index = $(this).index();
	var $smallPic = $(".datalis_sm");
	var $smallUl = $($smallPic).children();
	$smallUl.on("mouseenter", "li", function() {
		var $index = $(this).index();
		$(this).css({
			"border": "1px solid #0cc"
		}).siblings().css("border-color", "#cdcdcd");
		$(".jqzoom").children("img").attr({
			"src": "../img/goods-datails/big-pic0" + ($index + 1) + ".jpg"
		})
		$(".jqzoom").children("img").attr("jqimg", function() {
			return this.src
		});
	});
	//跟随滚动切换菜单
	var $nav = $(".content-xp-nav");
	var $floor = $(".content-xp-main .Louti")
	$(document).on("scroll",function(){
		var $scrollTop = $(window).scrollTop();
		var $sumHeight = $(".commonhead").height()+$(".topshow").height()+$(".content").height();
		if($scrollTop >= $sumHeight){
			$nav.addClass("nav-active");
		}else if($scrollTop < $sumHeight){
			$nav.removeClass("nav-active")
			$nav.addClass(".content-xp-nav");
		}
		//目的 主要来找到index；
		$floor.each(function(idx,ele){
			if($scrollTop >= $(ele).offset().top-80 && $scrollTop <= $(ele).offset().top + $(ele).outerHeight()-160){
				$nav.find("li").children("a").removeClass("xuanz").eq(idx).addClass("xuanz");
				return false;
			}
		})
	});
	//给导航添加点击事件；
		$nav.on("click","li",function(){
			var $index = $(this).index();
			var _scrollTop = $floor.eq($index).offset().top;
			$("html body").animate({scrollTop:_scrollTop-40});
		})
	//手机扫码支付商品
		//初始化；
		var $pay = $(".paywindow");
		var $btn = $(".content-main-addshop");
		//先隐藏支付窗口；
			$pay.hide();
		//获取可是窗口的高和宽
		var $bodyHeight = $(document).height();
		var $bodyWidth = $(window).width();
		$btn.on("click",function(){
			$pay.show();
			//蒙层的显示；
			$("#fullbg").show();
			$("#fullbg").css({
				"width":$bodyWidth,
				"height":$bodyHeight
			})
		});
		$pay.on("click",".closewindow",function(){
			$pay.hide();
			$("#fullbg").hide();
		});
		
})