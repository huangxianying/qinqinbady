
$(function(){
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
			return true;
		}else{
			$read.parent().next().css("visibility","visible");
			return false;
		}
	}
})