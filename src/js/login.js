/*
   模拟登陆
   */
  $(function(){
  	//请输入用户名；
  	$("#yzusername").on("blur",function(){
  		loginNameTake();
  		$(this).css("color","#000");
  	}).on("focus",function(){
  		$(this).val("");
  		$(this).css("color","#000");
  	})
  	
  	//请输入密码验证；
  	$("#pass").on("blur",function(){
  		loginPassTake();
  		$(this).css("color","#000");
  	}).on("focus",function(){
  		$(this).css("color","#000");
  	})
  	
  	
  	//用户名验证
  	function loginNameTake(){
  		var $this = $("#yzusername");
  		if($this.val() == ""){
  			$this.css("border-color","#f20266");
  			$this.parent().next().css("color","#f20266");
			return true;
  		}
  		else if(/^1(3|5|8|4|7)[0-9]{9}$/.test($this.val())){
  			$this.css({"border-color":"#bfbdbf"});
  			$this.parent().next().css("visibility","hidden");
			return false;
  		}else{
  			$this.css("border-color","#f20266");
			$this.parent().next().html("请输入正确的手机号码").css({"visibility":"visible","color":"#f20266"});
			return true;
  		}
  	}
  	//密码验证；
  	function loginPassTake(){
  		var $this = $("#pass");
  		if($this.val() == ""){
			$this.css("border-color","#f20266");
			$this.parent().next().css({"visibility":"visible"});
			return true;
		}
		else if(/[a-zA-Z0-9]{6,20}/.test($this.val())){
			$this.css({"border-color":"#bfbdbf","color":"#000"});
			$this.parent().next().css("visibility","hidden");
			return false;
		}
		else{
			$this.css("border-color","#f20266");
			$this.parent().next().html("请输入6到20位字母和数字的组合的密码").css({"visibility":"visible","color":"#f20266"});
			return true;
		}
  	}  	
  	
  })
