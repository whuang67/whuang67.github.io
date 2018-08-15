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
function swapDict(d){
  var out = {};
  for(var key in d){
    out[d[key]] = key;
  }
  return out;
}
$("a").attr("target", "_blank");

// There seems to be some bad/unnecessary escaping, which are useful for later regex use.
const replaceMap = {" AT ":"@", " DOT ":"\."},
      reverseReplaceMap = swapDict(replaceMap);

$("#email").hover(function(){
	mouseOver2($(this));
}, function(){
	mouseLeave2($(this));
	mouseLeaveDisappear($(this));
	$(this).delay(4000).queue(function(next){
	  $(this).html(" " + $(this).html().replace(/@|\./g, function(m){
	    return reverseReplaceMap[m];
	  }));
	  next();
	});

}).click(function(){
	var $tmp=$("<input>");

	$("body").append($tmp);
	$tmp.val($(this).text().replace(/ AT | DOT /g, function(m){
	  return replaceMap[m];
	}).trim()).select();
	document.execCommand("copy");
	$tmp.remove();
	
	$(this).html($(this).html().replace(/ AT | DOT /g, function(m){
	  return replaceMap[m];
	})).next().css("visibility", "visible");
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

if(!navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Blackberry)/)){
  window.onscroll = function(){
    if($(document).scrollTop()>100){
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
    $("html, body").animate({scrollTop: 0}, $(document).scrollTop()*2/3);
  });
} else {
  // console.log("Hello my mobile device friend!");
}