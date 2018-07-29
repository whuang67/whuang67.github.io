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
	e.next().delay(1950).queue(function(next){
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