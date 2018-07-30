var count=$("#counter").text();
var counter = setInterval(timer, 1000);
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

$(document).keypress(function(){
  clearInterval(counter);
}).click(function(){
  clearInterval(counter);
});