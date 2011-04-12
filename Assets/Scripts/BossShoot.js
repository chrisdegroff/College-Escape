var speed = 4.0;
var bossAmmo0Prefab : Transform;
var bossAmmo1Prefab : Transform;
var lastAttackTime;
var elapsed = 0;
var modNumber = 0;
var bossMachineGun : AudioSource;
var bossMachineGunPlayed = false;

function Awake() {
 	lastAttackTime = Time.time;
}

function calcTime() {
	elapsed = Time.time - lastAttackTime;
	if(elapsed > 4) {
		elapsed = 0;
		lastAttackTime = Time.time;
		bossMachineGunPlayed = false;
	}
}

function Update () {
	modNumber += 1;
	if(LikeABoss.shoot == true) {
		calcTime();
		if(elapsed > 2.5) {
			if(!bossMachineGunPlayed) {
				bossMachineGunPlayed = true;
				bossMachineGun.Play();
			}
			var ammo;
			if(modNumber % 2 == 0) {
				ammo = Instantiate(bossAmmo0Prefab,transform.position,Quaternion.identity);			
			}
			else {
				ammo = Instantiate(bossAmmo1Prefab,transform.position,Quaternion.identity);			
			}
			ammo.rigidbody.AddForce(transform.forward * 2000);
		}
	}
}

