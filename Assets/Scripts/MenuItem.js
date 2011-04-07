var isQuitBTN = false;
var isHowToPlayBTN = false;
var isHowToBackBTN = false;
var isHowToControlsBTN = false;
var isControlsBackBTN = false;

function OnMouseEnter() {
	renderer.material.color = Color.black;
}

function OnMouseExit() {
	renderer.material.color = Color.white;
}

function OnMouseUp() {
	if(isQuitBTN) {
		Application.Quit();
	}
	else if(isHowToPlayBTN || isControlsBackBTN) {
		Application.LoadLevel(1);
	}
	else if(isHowToBackBTN) {
		Application.LoadLevel(0);
	}
	else if(isHowToControlsBTN) {
		Application.LoadLevel(2);
	}
	else {
		Application.LoadLevel(3);
	}
}