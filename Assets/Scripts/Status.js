var health = 0;
var cdExplosionPrefab : Transform;
var hitByWeaponArray = new Array();


function indexof(v: int){
   for(var i = hitByWeaponArray.length; i-- && hitByWeaponArray[i] != v;);
     return i;
}


function Awake() {
	if(gameObject.tag == 'SeeUs') {
		health = 20;
	}
	if(gameObject.tag == 'Boss'){
		health = 500;
	}
	if(gameObject.tag == 'Mouse'){
		health = 10;
		}
}

function ApplyDamage(damage: float) {
	health -= damage;
	if(health <= 0) {
		if(gameObject.tag == 'SeeUs') {
			Collisions.SCORE += 20;
		}
		if(gameObject.tag == 'Boss') {
			Collisions.SCORE += 100;
			Collisions.SCORE += ((2 + (Collisions.Countdown_time / 60 ) ) * Collisions.Countdown_time);
			Application.LoadLevel(4);
		}
		if(gameObject.tag == 'Mouse'){
			Collisions.SCORE += 10;
		}
		Destroy(gameObject);
	}
}

function Update () {
}

function OnControllerColliderHit ( hit : ControllerColliderHit) {
	var id = hit.gameObject.GetInstanceID();
	if(indexof(id) < 0) {
		hitByWeaponArray.Add(hit.gameObject.GetInstanceID());
		var damage = UtilScript.GetDamageBasedOnCharacterAndWeaponType(gameObject, hit.gameObject);
		ApplyDamage(damage);
		var pos = hit.transform.position;
	}
	if(hit.gameObject.tag == 'CD') {
		Instantiate(cdExplosionPrefab, pos, Quaternion.identity);
		Destroy(hit.gameObject);
	}
	else if(hit.gameObject.tag == 'ZipDisk') {
		Instantiate(cdExplosionPrefab, pos, Quaternion.identity);
		Destroy(hit.gameObject);
	}
}
