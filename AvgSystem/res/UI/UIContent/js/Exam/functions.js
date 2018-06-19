$(document).ready(function() {
//						   
$(".nav > li > a").click(function() {
  $(this).toggleClass('expanded').toggleClass('collapsed').parent().find('> ul').slideToggle('medium');
});

//$(".subna > li > a").click(function() {  $(this).parent().parent().parent().find('#catalog').slideToggle('medium');});

$(".sbj_txt > a").click(function() {$(this).addClass('blank').siblings().removeClass('blank');});

$(".cr_list").click(function() {
							 $(this).parent().find('.kclist').slideToggle('medium');
							 var kkk = $(this).parent().find('#showandhide');
							 if(kkk.html() == "展开")
							    {kkk.html("收起");}
							 else if(kkk.html() == "收起")	
							    {kkk.html("展开");}
							 });


$(".title_box li").click(function(){
		$(this).addClass("now_focus"); 
		$(this).siblings().removeClass("now_focus");
		var $ebtrun = $(".title_box li").index(this);
		var $dangqian = $(".con_box").eq($ebtrun);
		$dangqian.addClass("Showbox");
		$dangqian.siblings().removeClass("Showbox");
		if ($ebtrun == 1) 
		{$(".title_box ul").addClass("e-bg");}
		else
		{$(".title_box ul").removeClass("e-bg");}
		$("div.course").fadeIn(300);
	});

$(".guide").hide();


});


function closereception(){
 $("#lctbox").slideUp("normal");
}

function setBoxPostion(tobj,obj)
{
	obj.hide();
	var o=tobj.offset();
	var scrX = o.left;
	var scrY = o.top;
	var oscrX = scrX+tobj.width()-60;
	var oscrY = scrY-obj.width()/2+50;
//	alert(scrX+'|'+scrY+'|'+oscrX+'|'+oscrY);
	obj.css("left",oscrX).css("top",oscrY);
	obj.fadeIn(300);
}