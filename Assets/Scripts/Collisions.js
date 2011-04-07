static var CD_AMMO = 0;
static var ZIP_DISK_AMMO = 0;
static var PLAYER_HEALTH = 100;
static var BERSERK = false;
static var ZIP_CANNON = false;
var berserkTime;
var ellapsed;

function Start ()
{
	berserkTime=Time.time;
}

function Update ()
{
	ellapsed=Time.time-berserkTime;
	if(ellapsed >= 60 && BERSERK == true) {
		BERSERK = false;
	}
}

function OnControllerColliderHit ( hit : ControllerColliderHit)
{
	if(hit.gameObject.tag == 'ZipDriveCannon') {
		ZIP_CANNON = true;
		Destroy(hit.gameObject);
	}
	if (hit.gameObject.tag == "Health" )
	{
		PLAYER_HEALTH += 10;
		print('PLAYER_HEALTH: ' + PLAYER_HEALTH);
		
		print('name: ' + hit.gameObject.name);
		if(hit.gameObject.name == 'MedkitRespawn') {
//			Respawn.RESPAWN_MEDKIT = true;
		}
		else {
			Destroy(hit.gameObject);
		}
	}
	else if (hit.gameObject.tag == "Berserk" )
	{
		BERSERK = true;
		print('BERSERK BABY!');
		Destroy(hit.gameObject);
		berserkTime = Time.time;
	}
	else if (hit.gameObject.tag == "CDAmmoPack" )
	{
		CD_AMMO += 20;
		if(CD_AMMO > 50) {
			CD_AMMO = 50;
		}
		print('CD_AMMO: ' + CD_AMMO);
		Destroy(hit.gameObject);
	}
	else if (hit.gameObject.tag == "ZIPAmmoPack" )
	{
		ZIP_DISK_AMMO += 20;
		if(ZIP_DISK_AMMO > 50) {
			ZIP_DISK_AMMO = 50;
		}
		print('ZIP_DISK_AMMO: ' + ZIP_DISK_AMMO);
		Destroy(hit.gameObject);
	}
}