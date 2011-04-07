static var CD_AMMO = 0;
static var ZIP_DISK_AMMO = 0;
static var PLAYER_HEALTH = 100;
static var PLAYER_LIVES = 3;
static var BERSERK = false;
static var ZIP_CANNON = false;
var berserkTime;
var ellapsed;
static var Health_Display : String = "Health: " + PLAYER_HEALTH;
static var CD_Display : String = "CD: " + CD_AMMO;
static var Display_ZIP : String = "Zip Disk: " + ZIP_DISK_AMMO;
static var Paused : boolean = false;

function Start ()
{
	berserkTime=Time.time;
}

function LateUpdate()
{
	if(Input.GetKeyDown("escape")){
		if(Paused == false){
			Time.timeScale = 0;
			Paused = true;
		}
		else{
			Time.timeScale = 1;
			Paused = false;
		}
	}
}

function OnGUI ()
{ 
	Health_Display = GUI.TextArea(Rect ( 10, 10, 75, 25), Health_Display, 50);
	CD_Display = GUI.TextArea(Rect ( 90, 10, 75, 25), CD_Display, 50);
	Display_ZIP = GUI.TextArea(Rect ( 10, 40, 100, 25), Display_ZIP, 100);
}

function Update ()
{
	ellapsed=Time.time-berserkTime;
	if(ellapsed >= 60 && BERSERK == true) {
		BERSERK = false;
	}
	Health_Display = "Health: " + PLAYER_HEALTH;
	CD_Display = "CD: " + CD_AMMO;
	Display_ZIP = "Zip Disk: " + ZIP_DISK_AMMO;
	
	if(PLAYER_HEALTH <= 0) {
		die();
	}
}

function die() {
	print('you = dead');
	PLAYER_HEALTH = 100;
	PLAYER_LIVES -= 1;
	
	if(PLAYER_LIVES > 0) {
		Application.LoadLevel(Application.loadedLevel);
	}
	else {
		Application.LoadLevel(0);
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
	else if (hit.gameObject.tag == "SeeUs") {
		print('OUCH!');
		PLAYER_HEALTH -= 20;
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