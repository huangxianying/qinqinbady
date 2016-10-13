var res = 0;
var json = {};

function logingetName() {
	var Oname = true;
	var Othis = $(".login-usename input");
	json['username'] = Othis.val();

	if(Othis.val() == '') {
		Othis.css("border-color", "#f20266"); //input框变色
		Othis.parent().next().text("请输入您的登录名").css({"visibility": "visible","color":"#f20266"}).addClass("login-error"); //更改提示信息
		return 1;
	} else if(Oname) {
		Othis.css({"border-color":"#bfbdbf","margin-bottom":"18px","color":"#000"}); //input框变色
		Othis.parent().next().css("visibility", "hidden").removeClass("login-error"); //隐藏显示框
		
		return 0;
	} else {
		Othis.css("border-color", "#f20266");
		Othis.parent().next().text("你输入的用户名已注册").css({"visibility": "visible","color":"#f20266"});
		return 1;
	}
}
//验证密码

function logingetPassword() {
	var Opassword = true; //模拟ajax返回数据
	var Othis = $(".loginget-password input");
	json['password'] = Othis.val();
	if(Othis.val() == '') {
		Othis.css("border-color", "#f20266");
		Othis.parent().next().text("请输入您的密码").css({"visibility": "visible","color":"#f20266"});
		return 1;
	} else if(Opassword) {
		Othis.css({"border-color": "#bfbdbf","color":"#000"});
		Othis.parent().next().css("visibility", "hidden");
		return 0;
	} else {
		Othis.css("border-color", "#f20266");
		Othis.parent().next().html("你输入的密码不正确").css({"visibility": "visible","color":"#f20266"});
		return 1;
	}
}
//验证 验证码
function logingetIdentifying() {
	var Othis = $(".login-identifying input");
	var signup_verify_code = $(".loginget-identifying input").val();
	var flag = false;
	$.ajax({
		url: "/passport/checkvCode",
		data: "login_verify_code=" + signup_verify_code,
		type: "post",
		async: false,
		success: function(msg) {
			if(msg == 1) {
				flag = true;
			}
		}
	});
	if(Othis.val() == '') {
		Othis.css("border-color", "#f20266");
		Othis.parent().next().text("请输入验证码").css({
			"visibility": "visible",
			"font-size": "12px"
		}).attr("class", "login-error");
		return 1;
	} else if(flag && signup_verify_code != "") {
		Othis.css("border-color", "#bfbdbf");
		Othis.parent().next().css("visibility", "hidden");
		return 0;
	} else {
		Othis.css("border-color", "#f20266");
		Othis.parent().next().html("验证码输入错误").css({
			"visibility": "visible",
			"font-size": "12px",
		}).attr("class", "login-error");
		return 1;
	}
}
//执行验证方法
	$(function() {
		//        //初始化
		$(".loginget-identifying").hide(); //验证码不显示
		//验证用户名
		$("#yzusername").on("blur", function() {
				logingetName();
			}).on("focus",function(){
				$(this).val("")
			})
			//验证密码
		$(".loginget-password input").on("blur", function() {
				logingetPassword();
			}).on("focus",function(){
				$(this).val("")
			})
			//验证  验证码
		$(".login-identifying input").on("blur", function() {
				logingetIdentifying();
			})
			//点击登录按钮触发验证及视觉效果
		$(".login-submit input").on("click", function() {
			login();
		})

		$(document).keydown(function(e) {
			var code;
			if(!e) {
				var e = window.event;
			}
			if(e.keyCode) {
				code = e.keyCode;
			} else if(e.which) {
				code = e.which;
			}
			if(code == 13) {
				login();
			}
		})

		$(".login-submit input").on("mousedown", function() {
			$(this).parent().addClass("login-submit-click");
		}).on("mouseup", function() {
			var Ohandler = 0; //判断句柄，判断是否通过验证
			var Ohandler1 = 0; //判断句柄，判断是否通过验证
			if($(".login-identifying").is(":visible")) {
				var Om1 = logingetName() + logingetPassword() + logingetIdentifying();
				if(Om1 > 0) {
					Ohandler++;
				}
			} else {
				var Om = logingetName() + logingetPassword();
				if(Om > 0) {
					Ohandler1++;
				}
			}
			if(Ohandler + Ohandler1 == 0) {
				$(this).parent().addClass("login-submit-active");
			} else {
				$(this).parent().removeClass("login-submit-click");
				return false;
			}
		})
	})

function focus() {

	$('.login-input').each(function() {
		if($(this).val()) {
			$(this).next().addClass('hide');
		}
	});

	$('.login-input').focus(function() {
		$(this).next().addClass('hide');
	}).blur(function() {
		if(!$(this).val()) {
			$(this).next().removeClass('hide');
			$(this).css("background", 'none');
		} else {

			$(this).next().addClass('hide');
		}

	});

}
focus();

//执行登录
function login() {

	var Ohandler = 0; //判断句柄，判断是否通过验证
	var Ohandler1 = 0; //判断句柄，判断是否通过验证
	if($(".login-identifying").is(":visible")) {
		var Om1 = logingetName() + logingetPassword() + logingetIdentifying();
		if(Om1 > 0) {
			Ohandler++;
		}
	} else {
		var Om = logingetName() + logingetPassword();
		if(Om > 0) {
			Ohandler1++;
		}
	}
	if(Ohandler + Ohandler1 == 0) {

		//选择是否记住用户名
		var member2 = $("#member");
		if(member2.attr("checked")) {
			var member = $("#member").val();
			json['member'] = member;
		}

		//执行登录
		$.ajax({
			url: "/passport/logdo",
			data: json,
			type: "post",
			async: false,
			success: function(msg) {
//				console.log(msg)
//				if(msg.data) {
//					$("#jump").html(msg.data);
//				}

				if(msg.status == 1) {
					var reffer2 = "";
					$(".login-submit input").val("");
					var url = "/passport/index.html";
					var search = window.location.search;
					var reg = /(\?|	&)referer=(.*)$/gi;
					var arr = reg.exec(search);
					setTimeout(function() {
						if((arr !== null) && arr[2]) {
							var referer = decodeURIComponent(arr[2]);
							window.location.href = referer;
						} else {
							window.location.href = reffer2;
						}
					}, 1500);
				} else if(msg.status == 2) {
					var url = "http://www.qinqinbaby.com/home/passport/success?re=" + msg.info;

					setTimeout(function() {
						window.location.href = url;
					}, 1500);

				} else {
					if(msg.info == 'zhmicw') {
						res++;
						var Othis = $(".loginget-password input");
						Othis.css("border-color", "#f20266");
						Othis.parent().next().text("账户名或密码有误").css("visibility", "visible");
						$(".loginget-submit input").parent().removeClass("login-submit-active");
					}
				}
				if(res >= 4) {
					$(".login-identifying").show(); //验证码显示
				}
			}
		});
	} else {
		return false;
	}
}