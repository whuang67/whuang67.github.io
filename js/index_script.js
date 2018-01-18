$("#moreNewsBtn").click(function(){
	$(this).css("display", "none");
	$(".moreNews").css("display", "list-item");;
	$("#lessNewsBtn").css("display", "block");;
});

$("#lessNewsBtn").click(function(){
	$("#moreNewsBtn").css("display", "block");
	$(".moreNews").css("display", "none");
	$(this).css("display", "none");
});