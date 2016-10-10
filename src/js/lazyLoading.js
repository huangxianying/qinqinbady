 /*
    simon  add  start
    函数
  */  
  function go(page){
		
        var page=page;
        var url=location.href;
        /* var num=url.indexOf('page');
        url=url.substr(0,num);    

        
        var reg=/\?|\=|\&/g;
        if(num>0){
        	url=url.replace(reg,"/");
            window.location.href=url+'page/'+page;
        }else{
            var url=location.href;
           // url=url.replace(reg,"/");
			//判断是否有地址栏参数
            console.log("###:"+url);
            window.location.href=url+"/page/"+page;
        } */

       var para = GetQueryString('page');

       if(para == null){
       
           var url=location.href;

           if(url.indexOf('?')==-1){

               if(url.indexOf('/page/')==-1){
           
            	   window.location.href=url+"/page/"+page;
               }else{
            	   var num=url.indexOf('/page/')
            	   var str=url.substr(0,num); 	

            	  
            	   window.location.href=str+"/page/"+page;
               }
        	   
           }else{
        	   window.location.href=url+"&page="+page;
           }
           
       }else{

    	   var num=url.indexOf('page')
    	   var str=url.substr(num+1); 


        	url = url.replace("page="+para, "page="+page);
    	   window.location.href=url;
       }
    
  } 


    function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }   
  /*
  simon add end
  */  
//图片懒加载
function lazyloadimg(){
	  //图片异步加载
	  var imgs = new Array();
		$("#proactive .pro-img").each(function(index, element) {
			var obj = new Object();
			obj.top = $(element).offset().top;
			obj.img1 = $(element).find("img:eq(0)");
			obj.img2 = $(element).find("img:eq(1)");
			imgs.push(obj)
		});
		var len = imgs.length
		console.log(len);
		var imgplay = function(){
			var cuurtop = $(window).scrollTop();
			var winheight = $(window).height();
			for(var i=0;i<len;i++){
				var img = imgs[i];
				if (img.top<=cuurtop+winheight && !img.img1.attr("src")){
					
					var loadimg = function(imgobj,show){
						var imgtmp = new Image();
						imgtmp.src = imgobj.attr("datasrc");
						var timer = setInterval(function(){
							if(imgtmp.complete){
								clearInterval(timer)
								imgobj.attr("src",imgtmp.src);
								show && imgobj.fadeIn();
								imgtmp = null;
							}
						},300)
						
					}
					loadimg(img.img1,true)
					loadimg(img.img2,false)
				}
			}
		}
		$(window).scroll(function(){
			imgplay();
		}).trigger("scroll");       
  }