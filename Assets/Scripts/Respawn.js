var objectPrefab : Transform;
static var RESPAWN_MEDKIT = false;

function Update () {
//print('Respawn running, RESPAWN_MEDKIT: ' + RESPAWN_MEDKIT);
//print('Respawn running, gameObject.tag: ' + gameObject.tag);
//print('Respawn running, gameObject.active: ' + gameObject.active);
//	var medkit = GameObject.Find('MedKitRespawn');
//	if(medkit == null) {
//		medkit = GameObject.Find('TempMedKitRespawn(Clone)');
//		if(medkit == null) {
//			respawn(5);
//		}
//	}
//	print('Respawn running, medkit.tag: ' + medkit.tag);
//	print('Respawn running, medkit.name: ' + medkit.name);
//	print('Respawn running, medkit.active: ' + medkit.active);
	
	if(RESPAWN_MEDKIT) {
		respawn(5);
		RESPAWN_MEDKIT = false;
	}
}


function respawn(seconds: float) {
	//disabling the renderer should disable the collider and its visibility
	renderer.enabled = false;
	
	//just to be sure you won't run into it, you can also set the isTrigger property
	collider.isTrigger = true; 
	
	//wait for so many seconds before enabling the object again
	yield WaitForSeconds(seconds);
	
	renderer.enabled = true;
	collider.isTrigger = false;
}
