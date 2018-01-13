var gameOver = false;
var playerOneScore = 0;
var playerTwoScore = 0;
var winningScore = 5;
var playerOneWin = 0;
var playerTwoWin = 0;

$("#playerOne").on("click", function(){
	if(!gameOver){
		playerOneScore++;
		if(playerOneScore === winningScore){
            $("#firstRecord").css("display", "none");
			gameOver = true;
			playerOneWin++;
			$("#p1Display").css("color", "red");
			$(".results").append("<li>Round "+(playerOneWin+playerTwoWin)+": <strong>Player 1</strong> won!</li>");
			$("h3 span").text(playerOneWin+" to "+playerTwoWin);
		}
		$("#p1Display").text(playerOneScore);
	} else {
		gameOver = true;
	}
});
$("#playerTwo").on("click", function(){
	if(!gameOver){
		playerTwoScore++;
		if(playerTwoScore === winningScore){
			$("#firstRecord").css("display", "none");
			gameOver = true;
			playerTwoWin++;
			$("#p2Display").css("color", "red");
			$(".results").append("<li>Round "+(playerOneWin+playerTwoWin)+": <strong>Player 2</strong> won!</li>");
			$("h3 span").text(playerOneWin+" to "+playerTwoWin);
		}
		$("#p2Display").text(playerTwoScore);
	} else {
		gameOver = true;
	}
});



function reset(){
	gameOver = false;
	playerOneScore = 0;
	playerTwoScore = 0;
	$("#p1Display").text(0);
	$("#p2Display").text(0);
	$("#p1Display").css("color", "white");;
	$("#p2Display").css("color", "white");;
}
$("#reset").on("click", reset);

$("input[type='number']").on("change", function(){
	$("p span").text($(this).val());
	winningScore = Number($(this).val());
	reset();
});