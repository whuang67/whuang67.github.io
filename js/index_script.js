$("#home").click(function(){
	$(this).addClass("selected");
	$("#aboutMe").removeClass("selected");
	$("#sampleWork").removeClass("selected");
	$("#contact").removeClass("selected");
	
	$("#homePanel").css("display", "block");
	$("#aboutMePanel").css("display", "none");
	$("#sampleWorkPanel").css("display", "none");
	$("#contactPanel").css("display", "none");
});

$("#aboutMe").click(function(){
	$("#home").removeClass("selected");
	$(this).addClass("selected");
	$("#sampleWork").removeClass("selected");
	$("#contact").removeClass("selected");
	
	$("#homePanel").css("display", "none");
	$("#aboutMePanel").css("display", "block");
	$("#sampleWorkPanel").css("display", "none");
	$("#contactPanel").css("display", "none");
});

$("#sampleWork").click(function(){
	$("#home").removeClass("selected");
	$("#aboutMe").removeClass("selected");
	$(this).addClass("selected");
	$("#contact").removeClass("selected");
	
	$("#homePanel").css("display", "none");
	$("#aboutMePanel").css("display", "none");
	$("#sampleWorkPanel").css("display", "block");
	$("#contactPanel").css("display", "none");
});

$("#contact").click(function(){
	$("#home").removeClass("selected");
	$("#aboutMe").removeClass("selected");
	$("#sampleWork").removeClass("selected");
	$(this).addClass("selected");
	
	$("#homePanel").css("display", "none");
	$("#aboutMePanel").css("display", "none");
	$("#sampleWorkPanel").css("display", "none");
	$("#contactPanel").css("display", "block");
});

$("#moreNewsBtn").click(function(){
	$(this).addClass("notShowing");
	$(".moreNews").removeClass("notShowing");
	$("#lessNewsBtn").removeClass("notShowing");
});

$("#lessNewsBtn").click(function(){
	$("#moreNewsBtn").removeClass("notShowing");
	$(".moreNews").addClass("notShowing");
	$(this).addClass("notShowing");
});