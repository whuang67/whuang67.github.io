var count=$("#counter").text(), counter=setInterval(timer, 1000);
function timer(){
  count-=1;
  $("#counter").text(count);
  if(count==1){
    $("#counter").next().text(" second");
  } else if(count<=0){
    clearInterval(counter);
    window.location.href="https://github.com/whuang67";
  }
}

// To make sure the message only show once
const initLength = $("div.container").children().length;

$(document).on("keypress click", function(){
  // or using a dictionary
  clearInterval(counter);
  if($("div.container").children().length===initLength){

    $("div.container")
      .append($("<span id='auto-disappear'>The countdown has been stopped. Will not redirect to Wenke's <a href='https://github.com/whuang67'><i class='fab fa-github'></i> GitHub</a> page automatically.</span>")
        .css({
          "visibility": "visible",
          "background-color": "RGB(225, 225, 234)",
          "border": "1px solid #131F33",
          "padding": "1px 5px", 
          "margin-left": "5px",
          "border-radius": "10px",
          "z-index": "1",
          "position": "absolute"
        }))
      .delay(5000)
      .queue(function(next){
        $(this).children().last().css("visibility", "hidden");
        // Choose not to remove because of the IF statement at the start (make sure only run ONLY once)
        next();
      });
  }
});