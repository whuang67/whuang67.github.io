
var numOfSquares = 6;
var squares = document.querySelectorAll(".square");
var colors = generateRandomColors(numOfSquares);
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");


easyBtn.addEventListener("click", function(){
	this.classList.add("selected");
	hardBtn.classList.remove("selected");
	numOfSquares = 3;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;	
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		} else{
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click", function(){
	this.classList.add("selected");
	easyBtn.classList.remove("selected");
	numOfSquares = 6;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});

resetButton.addEventListener("click", function(){
	// generate new colors
	colors = generateRandomColors(numOfSquares	);
	// select a random color from the array
	pickedColor = pickColor();
	// change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	// change h1 to black
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	this.textContent = "New Colors";
});

colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){
	// Add initial colors to squares;
	squares[i].style.backgroundColor = colors[i];
	
	// Add click listener to squares;
	squares[i].addEventListener("click", function(){
		
		var clickedColor = this.style.backgroundColor;
		
		if(clickedColor !== pickedColor){
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
	    } else{
		    messageDisplay.textContent = "Correct!";
			changeColor(pickedColor);
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again?";
	    }
    });
}

function changeColor(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}