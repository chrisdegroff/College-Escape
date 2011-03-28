static var patrol = true;
function Update () {
print('patrol: ' + patrol);
	if(patrol) {
		animation.Play();
	}
	else {
		animation.Stop();
	}
}