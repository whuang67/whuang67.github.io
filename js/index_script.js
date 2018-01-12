var home = document.getElementById("home");
var aboutMe = document.getElementById("aboutMe");
var sampleWork = document.getElementById("sampleWork");
var contact = document.getElementById("contact");


home.addEventListener("click", function(){
	this.classList.add("selected");
	aboutMe.classList.remove("selected");
	sampleWork.classList.remove("selected");
	contact.classList.remove("selected");
});

aboutMe.addEventListener("click", function(){
	this.classList.add("selected");
	home.classList.remove("selected");
	sampleWork.classList.remove("selected");
	contact.classList.remove("selected");
});

sampleWork.addEventListener("click", function(){
	this.classList.add("selected");
	aboutMe.classList.remove("selected");
	home.classList.remove("selected");
	contact.classList.remove("selected");
});

contact.addEventListener("click", function(){
	this.classList.add("selected");
	aboutMe.classList.remove("selected");
	sampleWork.classList.remove("selected");
	home.classList.remove("selected");
});