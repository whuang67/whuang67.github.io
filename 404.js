var text = new PointText({
	point: view.center,
	justification: 'center',
	fontSize: 30,
	color: "white",
	content: "404"
});
var destination = Point.random()*view.size;

function onFrame(event){
    var vector = destination - text.position;
    text.position += vector/50;
    text.fontSize = Math.round(vector.length);
    if(vector.length < 50) {
        destination = Point.random()*view.size;
    }
}
console.log(view.size);