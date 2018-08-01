function mouseOver2(e){
	e.css({
		"cursor": "pointer",
		"text-decoration-line": "underline",
		"color": "RGB(50, 132, 191)"
	});
}
function mouseLeave2(e){
	e.css({
		"cursor": "auto",
		"text-decoration-line": "none",
		"color": "RGB(19, 41, 75)"
	});
	// For #usps, nothing is following so the following step won't run.
}
function mouseLeaveDisappear(e){
	e.next().delay(2000).queue(function(next){
		$(this).css("visibility", "hidden");
		next();
	});
}
$("a").attr("target", "_blank");

console.log("Greetings travelor!");		

$("#email").hover(function(){
	mouseOver2($(this));
}, function(){
	mouseLeave2($(this));
	mouseLeaveDisappear($(this));
}).click(function(){
	var $tmp=$("<input>"), replaceMap = {" /":"", " AT ":"@", " DOT ":"."};
	$("body").append($tmp);
	$tmp.val($(this).text().replace(/ \/| AT | DOT /g, function(m){
		return replaceMap[m];
	})).select();
	document.execCommand("copy");
	$tmp.remove();
	$(this).next().css("visibility", "visible");
});

$(".TA").hover(function(){
	$(this).css("cursor", "pointer").next().css("visibility", "visible");
}, function(){
	$(this).css("cursor", "auto").next().css("visibility", "hidden");
});

$("a, #usps, #more").hover(function(){
	mouseOver2($(this));
}, function(){
	mouseLeave2($(this));
});

$("#more").click(function(){
	$(".more-proj").removeClass("more-proj");
	$(this).css("display", "none").removeAttr("id", "more").next().css({
		"font-weight": "500",
		"color": "RGB(19, 41, 75)"
	});
});

window.onscroll = function(){
  if($(document).scrollTop()>50){
    $("#back-to-top").fadeIn(1000);
  } else{
    $("#back-to-top").fadeOut(1000);
  }
};
$("#back-to-top").hover(function(){
  $(this).css("cursor", "pointer").find("i").css("display", "none").next().fadeIn(500);
}, function(){
  $(this).css("cursor", "auto").find("div.back-to-top2").css("display", "none").prev().fadeIn(500);
}).click(function(){
  //console.log($(document).scrollTop());
  $("html").animate({scrollTop: 0}, $(document).scrollTop()*2/3);
});