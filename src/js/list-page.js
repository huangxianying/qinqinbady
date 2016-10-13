jQuery(function($){
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
			//显示隐藏菜单；
			//绑定事件；
			$("#btn1").on("click","span",function(){
				var $oDd = $(this).parent().prev();
				if($oDd.hasClass("listchoose")){
					$oDd.removeClass("listchoose");
					$(this).html("隐藏↑")
				}else{
					$oDd.addClass("listchoose");
					$(this).html("显示↓");
				}
			})
			$(".brand>dl>dd").children().slice(21).hide();
			$("#btn2").on("click","span",function(){
				var $oDd = $(this).parent().prev();
				if($oDd.hasClass("listchoose")){
					$oDd.removeClass("listchoose");
					$(this).html("隐藏↑")
					$(".brand>dl>dd").children().slice(21).hide();
				}else{
					$oDd.addClass("listchoose");
					$(this).html("显示↓");
					$(".brand>dl>dd").children().slice(21).show();
				}
			})
			//通过ajaxa模拟获取数据生成商品列表
			
			$.ajaxSetup({
				url:"../../data/goodslist.json",
				dataType:"json",
				data:{pageNo:1},
				success:function(res){

					$.each(res, function(idx,item) {
						//创建li、div.prowp
						var $li = $("<li/>");
						var $prowp = $("<div/>").addClass("prowp");
						var $proimg = $("<div/>").addClass("pro-img");
						var $dl = $("<dl/>");
						var $dt = $("<dt/>");
						var $dd = $("<dd/>");
						var $p = $("<p/>").addClass("ptxt");
						//创建图片
						var $showimg = ("<img src='"+item.showimgurl+"'/>");
						var $hideimg = ("<img src='"+item.hideimgurl+"'/>");
						var $a = $("<a/>").attr({href:item.ahref,target:"_blank"});
						$a.html($showimg+$hideimg).appendTo($proimg);
						$proimg.appendTo($prowp);
						//创建商品标题
						var $pa = $("<a/>").attr({href:item.ahref,target:"_blank"}).html(item.brand+"<font style='color: #f00;font-weight: bold;'>"+item.keyword+"</font>"+item.title).css({"color":"#666"}).appendTo($p);
						$p.appendTo($prowp);
						//创建价格；
						var $pricec1 = $("<div/>").addClass("price");
						var $price = (item.price*item.off).toFixed(2);
						var $delprice = item.price.toFixed(2);
						$("<span/>").html("<b>"+"&yen;"+$price+"<b/>"+"("+item.off*10+"折"+")").appendTo($pricec1);
						$("<del/>").html("&yen;"+$delprice).appendTo($pricec1);
						$pricec1.appendTo($prowp);
						//添加到ul；
						$prowp.appendTo($li);
						$li.appendTo("#proactive");
					});
					
					//图片效果
					$("#proactive li").hover(function(){
			            $(this).addClass("active");
			            $(this).find(".prowp").addClass("prowpactive");
			        },function(){
			            $(this).removeClass("active");
			            $(this).find(".prowp").removeClass("prowpactive");
			        })
			
			        $("#proactive li .pro-img").hover(function(){
			            $(this).find("img").eq(1).show().siblings().hide();
			        },function(){
			            $(this).find("img").eq(0).show().siblings().hide();
			        })//图片效果结束
			        
				}
				
			});//获取商品数据结束
			$.ajax();
			// 懒加载效果
			// 给window绑定scroll事件，当差不多滚动到底部是加载更多内容
			$(window).on("scroll",function(){
				var $scrollTop = $(window).scrollTop();
				if($scrollTop >= $(document).height()-$(window).height()-100){
					$.ajax();
				}
			});
			
			//获取cookie添加到登录名下；
			if($.cookie("loginCk")){
				$("#userN").html($.cookie("loginCk"));
			}else{
				$("#userN").html("登录");
			}

		})