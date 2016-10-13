jQuery(function($) {
			//获取cookie添加到登录名下；

			if($.cookie("loginCk")){
				$("#user").html($.cookie("loginCk"));
			}else{
				$("#user").html("登录");
			}
			//文字轮播
			$("#link").imgscroll({
				speed: 40,
				amount: 0,
				width: 1,
				dir: "left"
			});
			//显示隐藏小广告
			$(document).scroll(function(){
				var $scrollTop = $(window).scrollTop();
				if($scrollTop == 0){
					$(".ablet").fadeOut("slow");
				}else if($scrollTop > 0){
					$(".ablet").fadeIn("slow");
				}
			});
				//回到顶部；
			$("#goBack").on("click",function(){
				$(document).scrollTop("0");
			});
			//放大镜
			$(".jqzoom").jqueryzoom({
				xzoom: 368, //放大图的宽度(默认是 200)
				yzoom: 368, //放大图的高度(默认是 200)
				offset: 10, //离原图的距离(默认是 10)
				position: "right", //放大图的定位(默认是 "right")
				preload: 1
			});
	
	//点击增加或减少数量
	var $addnum = $(".content-main-sl");
	var $num = $addnum.find(".buynum");
	var _index = 1;
	var idx = 1;
	//初始化；
	$num.val(1);
	$addnum.on("click",".up", function() {
		    idx = ++_index;
			$num.val(idx);
			$num.attr("value",idx);
			$addnum.find(".low").css({
				"background": "#fff"
			});
	}).on("click", ".low", function() {
			if(_index > 0) {
				$num.val(--_index);
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
			return this.src;
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
		
		
		//添加点击事件；
		$btn.on("click",function(){
			$pay.show();
			//蒙层的显示；
			$("#fullbg").show();
			$("#fullbg").css({
				"width":$bodyWidth,
				"height":$bodyHeight
			});
				//获取商品信息传递到cookie；
			var $imgUrl = $("#imgurl").attr("src");//商品图片路径
			var $gds = $(".content-main-dpp span:nth-child(1)").children("h1").html();//商品信息；
			var $xh = $(".content-main-xh-1").html();//商品型号；
			var $xhCont = $(".content-main-xh-2").children(".milk-xh").text();//型号信息；
			var $goodsNum = $(".buynum").val();//商品数量；
			var $goodsPri = $(".content-main-zk-1").text();//商品现价；
			var $delPri = $(".content-main-zk-3 span:nth-child(2)").html();//商品原价；
			console.log($goodsNum);
			//创建一个空的对象；
			var $goodsObj = [];
			$goodsObj.push({imgurl:$imgUrl,gds:$gds,xh:$xh,xhcont:$xhCont,goodsnum:$goodsNum,price:$goodsPri,delpri:$delPri});
			//将对象转换成字符串；
			var $goodsStr = JSON.stringify($goodsObj);
			//将商品信息加入到cookie；
			$.cookie("goods",$goodsStr,{expries:7,path:"/"});
			
		});
		
		//点击关闭支付窗口
		$pay.on("click",".closewindow",function(){
			$pay.hide();
			$("#fullbg").hide();
			location.href = "shopping-cart.html";
		});
		
})