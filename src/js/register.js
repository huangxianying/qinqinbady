
$(function(){
	
	//设置全局的变量标记；
	var flag1 = false;//标记用户；
	var flag2 = false;//标记密码；
	var flag3 = false;//标记重写密码；
	var flag4 = false;//标记阅读条文；
	var flag5 = false;//标记验证码；
	//用户名验证；
	$(".login-tel").on("blur",function(){
		registernNameTake();
	}).on("focus",function(){
		$(this).val("");
		$(this).css("color","#000");
	})
	//密码验证；
	$(".register-password").on("blur","input",function(){
		registerPswTake();
	})
	//确认密码验证；
	$(".register-password-again").on("blur","input",function(){
		registerPswAgTake();
	})
	//是否阅读注册条文验证；
	$(".checkbox-active").on("click",function(){
		registerReadTake();
	})
	

//注册验证；
//用户名验证 （手机或者邮箱）
function registernNameTake(){
	var $this = $(".login-form .login-tel");
	var name = $(".login-form .login-tel").val();
	var newurl = window.location.host;
	
	flag = false;
	$.ajax({
		url : "http://"+newurl+"/Home/Passport/checkName",
		data:"name="+name,
		type:"post",
		async:false,
		success:function(res){
			if(res == 0){
				flag = 1;
			}
		}
	});
	if($this.val() == ""){
		$this.css("border-color","#f20266");
		$this.parent().next().css("visibility","visible");
		return true;
	}else if(flag == 1 && name){
		$this.css("border-color","#f20266");
		$this.parent().next().html("该用户名已存在").css("visibility","visible");
		return true;
	}else if(/^1(3|5|8|4|7)[0-9]{9}$/.test($this.val())){
		$this.css("border-color","#bfbdbf");
		$this.parent().next().css("visibility","hidden");
		flag1 = true;
		return false;
	}else{
		$this.css("border-color","#f20266");
		$this.parent().next().html("请输入正确的手机号码").css("visibility","visible");
		return true;
	}
}

//密码验证(密码为字母和数字的组合长度是6-20)；
	function registerPswTake(){
		var $this = $(".register-password input");
		if($this.val() == ""){
			$this.css("border-color","#f20266");
			$this.parent().next().css("visibility","visible");
			return true;
		}
		else if(/[a-zA-Z0-9]{6,20}/.test($this.val())){
			$this.css("border-color","#bfbdbf");
			$this.parent().next().css("visibility","hidden");
			flag2 = true;
			return false;
		}
		else{
			$this.css("border-color","#f20266");
			$this.parent().next().html("请输入6到20位字母和数字的组合的密码");
			return true;
		}
	}
	//确认密码验证；
	function registerPswAgTake(){
		var $this = $(".register-password-again input");
		var $pswVal = $(".register-password input").val();
		if($this.val() == ""){
			$this.css("border-color","#f20266");
			$this.parent().next().css("visibility","visible");
			return true;
		}
		else if($this.val() == $pswVal){
			$this.css("border-color","#bfbdbf");
			$this.parent().next().css("visibility","hidden");
			flag3 = true;
			return false;
		}else{
			$this.css("border-color","#f20266");
			$this.parent().next().html("两次密码不一致，请重新输入");
			return true;
		}
	}
//阅读条文验证；
	function registerReadTake(){
		var $read = $(".checkbox-active");
		if($read.is(":checked")){
			$read.parent().next().css("visibility","hidden");
			flag4 = true;
			return true;
		}else{
			$read.parent().next().css("visibility","visible");
			return false;
		}
	};
	
	//插件验证码
	//js验证码；
	var inpTake = document.getElementById("pcode");
	var tiShi = document.getElementById("yantishi");
	var code = document.getElementById("verifyimage");
	var code1 = document.getElementById("huanyizhang");
	//调用函数；
	angin();

	function angin() {
		var c = new KinerCode({
			len: 4, //验证码长度；
			chars: [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			], //指定验证码词典，提供搜索；
			question: false, //经典模式选择false；
			copy: false, //是否允许复制；
			bgColor: "", //背景色【与背景图任选其一】
			bgImg: "../img/reg/yanzheng.jpg", //背景图，背景色会失效
			randomBg: false,
			inputArea: inpTake, //输入验证码的input对象绑定，
			codeArea: code, //验证码放置的区域【HTMLDivElement 】
			click2refresh: true, //是否点击验证码刷新验证码
			false2refresh: true, //在填错验证码后是否刷新验证码
			validateEven: "blur", //触发验证的方法名，如click，blur等
			validateFn: function(result, code) { //验证回调函数
				if(result) {
					tiShi.style.display = "none";
					flag5 = true;
				} else {
					tiShi.style.display = "block";
				}
			}
		})
	};

			//点注册按钮生成cookies信息；当所有标记都为ture是生成cookies并进行跳转到登录页面；
			$(".login-sprite-btn").on("click", function() {
				registernNameTake();
				registerPswTake();
				registerPswAgTake();
				registerReadTake();
				angin();
			var $usePhone = $(".login-tel").val();
			var $psw = $("#pass3").val();
			var $pswAg = $("#pass4").val();
			if(flag1 && flag2 && flag3 && flag4 && flag5){
				//设置cookie
				var oList = [];
				oList.push({
				user: $usePhone,
				psw: $psw
				});
				var userPass = JSON.stringify(oList);
				$.cookie("userpass", userPass, {expries: 7}, {path: "/"});
				alert("注册成功，请移步到登录页面登录");
				location.href = "login.html";
			}else{
				alert("填写信息有误");
			}
			//阻止submit提交；
			return false;
		});
		
		
})