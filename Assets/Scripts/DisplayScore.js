
function Update () {
	var newtext = 'Your score is: ' + Collisions.SCORE;
	GetComponent.<TextMesh>().text = newtext;
}