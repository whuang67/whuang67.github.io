var moreNewsBtn = document.getElementById("moreNewsBtn");
var lessNewsBtn = document.getElementById("lessNewsBtn");
var moreNews = document.querySelectorAll(".moreNews");

moreNewsBtn.addEventListener("click", function(){
	this.style.display = "none";
	lessNewsBtn.style.display = "block";
	for(var i = 0; i < moreNews.length; i++){
		moreNews[i].style.display = "list-item";
	}
});

lessNewsBtn.addEventListener("click", function(){
	this.style.display = "none";
	moreNewsBtn.style.display = "block";
	for(var i = 0; i < moreNews.length; i++){
		moreNews[i].style.display = "none";
	}
});