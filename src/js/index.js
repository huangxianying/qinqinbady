jQuery(function($){
			//文字轮播
			$("#link").imgscroll({
				speed: 40,
				amount: 0,
				width: 1,
				dir: "left"
			});
			//图片轮播；
			$(".homemain").find(".phone_inner").xcarousel({
				width:236,
				height:421,
				page:true,//是否显示页码
				autoPlay:true,//是否自动轮播
				type:'x',//动画类型：水平滚动x, 垂直滚动y, 渐现效果fade
				buttons:false,//是否显示前后按钮
				speed:1500,//轮播图速度
			})
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
			})
			
			//获取cookie添加到登录名下；
			if($.cookie("loginCk")){
				$("#user").html($.cookie("loginCk"));
			}else{
				$("#user").html("登录");
			}
		})