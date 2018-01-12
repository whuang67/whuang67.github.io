var homeBtn = document.getElementById("home");
var homePanel = document.getElementById("homePanel");
var aboutMeBtn = document.getElementById("aboutMe");
var aboutMePanel = document.getElementById("aboutMePanel");
var sampleWorkBtn = document.getElementById("sampleWork");
var sampleWorkPanel = document.getElementById("sampleWorkPanel");
var contactBtn = document.getElementById("contact");
var contactPanel = document.getElementById("contactPanel");

var moreNewsBtn = document.getElementById("moreNewsBtn");
var lessNewsBtn = document.getElementById("lessNewsBtn");
var moreNews = document.querySelectorAll(".moreNews");


homeBtn.addEventListener("click", function(){
	this.classList.add("selected");
	aboutMeBtn.classList.remove("selected");
	sampleWorkBtn.classList.remove("selected");
	contactBtn.classList.remove("selected");
	
	homePanel.style.display = "block";
	aboutMePanel.style.display = "none";
	sampleWorkPanel.style.display = "none";
	contactPanel.style.display = "none";
});

aboutMeBtn.addEventListener("click", function(){
	homeBtn.classList.remove("selected");
	this.classList.add("selected");
	sampleWorkBtn.classList.remove("selected");
	contactBtn.classList.remove("selected");
	
	homePanel.style.display = "none";
	aboutMePanel.style.display = "block";
	sampleWorkPanel.style.display = "none";
	contactPanel.style.display = "none";
});

sampleWorkBtn.addEventListener("click", function(){
	homeBtn.classList.remove("selected");
	aboutMeBtn.classList.remove("selected");
	this.classList.add("selected");
	contactBtn.classList.remove("selected");
	
	homePanel.style.display = "none";
	aboutMePanel.style.display = "none";
	sampleWorkPanel.style.display = "block";
	contactPanel.style.display = "none";
});

contactBtn.addEventListener("click", function(){
	homeBtn.classList.remove("selected");
	aboutMeBtn.classList.remove("selected");
	sampleWorkBtn.classList.remove("selected");
	this.classList.add("selected");
	
	homePanel.style.display = "none";
	aboutMePanel.style.display = "none";
	sampleWorkPanel.style.display = "none";
	contactPanel.style.display = "block";
});


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