var health = 0;
var cdExplosionPrefab : Transform;
var hitByWeaponArray = new Array();


function indexof(v: int){
   for(var i = hitByWeaponArray.length; i-- && hitByWeaponArray[i] != v;);
     return i;
}


function Awake() {
	if(gameObject.tag == 'SeeUs') {
	print('yes we\'re SeeUs');
		health = 20;
	}
}

function ApplyDamage(damage: float) {
	health -= damage;
	if(health <= 0) {
		Destroy(gameObject);
	}
}

function Update () {
}

function OnControllerColliderHit ( hit : ControllerColliderHit) {
	print('hit.gameobject.GetInstanceID' + hit.gameObject.GetInstanceID());
	var id = hit.gameObject.GetInstanceID();
	if(indexof(id) < 0) {
print('not in array');
		hitByWeaponArray.Add(hit.gameObject.GetInstanceID());
		var damage = UtilScript.GetDamageBasedOnCharacterAndWeaponType(gameObject, hit.gameObject);
		ApplyDamage(damage);
		var pos = hit.transform.position;
	}
	if(hit.gameObject.tag == 'CD') {
		Instantiate(cdExplosionPrefab, pos, Quaternion.identity);
		Destroy(hit.gameObject);
	}
}
