static var patrol = true;
function Update () {
	if(patrol) {
		animation.Play();
	}
	else {
		animation.Stop();
	}
}