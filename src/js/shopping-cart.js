jQuery(function(){

		//读取cookie信息加入到购物车；
		//获取元素相关的属性及元素；
		var $cartLi = $(".goods-li");
		var $goodsPic = $(".goods-pic").children("a").children("img");//获取图片的src的属性值；
		var $goodsInfor = $("#txt2");//商品信息；
		var $goodsTp = $(".goods-type");//商品类型
		var $nowPrice = $(".nowprice");//商品价格
		var $orgnPrice = $(".nowprice").next();//商品原价
		var $pre = $(".price");//计算价格
		var $buyNum = $(".buynum");//购买数量
		var $fr = $(".fr-price").html();//快递费用
		var $goodsPri = $(".goods-pr");//商品应付金钱；
		var $sumPr = $(".sum-pr");//商品总应付金额；
		var $goodsMoney = $(".goods-price-money");//商品金额；
		var $copeMoney = $(".lijiman").find(".p1").children(".lijiman-money");
		var $p = null;
		var $p2 = null;
		var $p3 = null;
		//用each遍历对象并添加内容
//		alert("goods");
		if($.cookie("goods")){		
			//获取cookies（字符串）转换成对象；
		var $goodsCk = JSON.parse($.cookie("goods"));
		
		$.each($goodsCk,function(idx,item){
			$goodsInfor.html(item.gds);//获取商品信息
			$goodsTp.html(item.xh + item.xhcont);//获取商品型号；
			$nowPrice.html(item.price);//获取商品现在价格；
			$orgnPrice.html(item.delpri);//获取商品原价；
			$buyNum.val(item.goodsnum);//商品购买数量；
			//给定一个变量，将价格转换成字符串，在同过“￥”进行拆分，等到对象数组；
			var a = item.price;
			JSON.stringify(a);
			var b = a.split("￥");
			//价格计算；
			$pre.html("￥"+(parseFloat(b[1])*parseFloat(item.goodsnum)).toFixed(2));//商品小计；
			$goodsPri.html((parseFloat(b[1])*parseFloat(item.goodsnum)).toFixed(2));//商品应付金额
			$sumPr.html((parseFloat(b[1])*parseFloat(item.goodsnum)+parseFloat($fr)).toFixed(2));//商品总价；
			 
			//应付金额；
			$goodsMoney.html((parseFloat(b[1])*parseFloat(item.goodsnum)).toFixed(2));
			$copeMoney.html((parseFloat(b[1])*parseFloat(item.goodsnum)+parseFloat($fr)).toFixed(2));
			
			//创建复选框；
			$("<input />").attr({"type":"checkbox"}).addClass("checkdel").appendTo(".goods-checked");
			//创建图片；
			$("<img/>").attr({"src":item.imgurl}).appendTo(".goods-pic").children("a");
			//创建商品数量按钮；
			var $numBtn = $("<div />").addClass("content-main-sl");
			var $numBtn2 = $("<div />").addClass("content-main-sl-1").appendTo($numBtn);
			var $spanLf = $("<span/>").html("-").addClass("low").css({
				"float" : "left",
				"display" : "inline",
				"cursor" : "pointer",
				"background" : "#e3e3e3"
			}).appendTo($numBtn2);
			var $input = $("<input/>").attr({
				"size":"3",
				"value" : item.goodsnum,
				"type" : "text"
			}).html(item.goodsnum).addClass("buynum").appendTo($numBtn2);
			var $spanRt = $("<span/>").addClass("up").html("+").appendTo($numBtn2);
			//将$numbtn 加到li；
			$numBtn.appendTo($cartLi.children("li").eq(4));
			//创建删除
			$("<a/>").attr({"href":"#"}).html("删除").addClass("del-goods").appendTo(".lastLi");
		})
		
	}else{
		alert("未加载到cookie");
	};
			//删除选中全选中的商品
		var $checkAll = $("#checkall");
		var $checkUl = $(".checkdel");
		var $alldel = $("#delall");
		var $delgoods = $(".del-goods");
		$checkAll.on("click",function(){
			if($checkAll.is(":checked")){
				//当全部选中时，点击删除所有；
				$checkUl.prop("checked",true);
				//选中删除
				$alldel.on("click",function(){
					$checkUl.parent().parent().remove();
				});
				//否则不选中
			}else{
				$checkUl.prop("checked",false);
			}
		});
		//删除选中的商品；
		$delgoods.on("click",function(){
			$(this).parent().parent().remove();
		});
	

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
		
			
})
