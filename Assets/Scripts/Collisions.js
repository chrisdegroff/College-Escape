static var CD_AMMO = 0;
static var ZIP_DISK_AMMO = 0;
static var PLAYER_HEALTH = 100;
static var PLAYER_LIVES = 3;
static var BERSERK = false;
static var ZIP_CANNON = false;
static var WEAPON_INDEX = 1;
var berserkTime;
var ellapsed;
static var Health_Display : String = "Health: " + PLAYER_HEALTH;
static var AMMO_Display : String = "CD: " + CD_AMMO;
static var Display_Time_Remainng : String = "Time: " + Countdown_time;
static var Display_Score : String = "Score: " + SCORE;
static var Display_Lives : String = "Lives: " + PLAYER_LIVES;
static var SCORE = 0;
static var Paused : boolean = false;
static var Countdown_time = 0;
var weaponPickup : AudioSource;

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

function calcTime() {
	Countdown_time = 300 - (Time.timeSinceLevelLoad);
	Display_Time_Remainng = "Time: " + Countdown_time;
}

function OnGUI ()
{ 
	GUI.TextArea(Rect ( 10, 10, 75, 25), Health_Display, 50);
	GUI.TextArea(Rect ( 90, 10, 85, 25), AMMO_Display, 50);
	GUI.TextArea(Rect ( 185, 10, 80, 25), Display_Lives, 100);
	GUI.TextArea(Rect ( 10, 40, 100, 25), Display_Time_Remainng, 100);
	GUI.TextArea(Rect ( 120, 40, 100, 25), Display_Score, 100);
	
	if(BERSERK == true) {
		GUI.TextArea(Rect ( 10, 70, 180, 40), 'BERSERK! WEAPONS DOUBLED!', 100);
	}
	
}

function Update ()
{
	calcTime();
	ellapsed=Time.time-berserkTime;
	if(Input.GetKey(KeyCode.Alpha1)) {
		WEAPON_INDEX = 1;
	}
	else if(Input.GetKey(KeyCode.Alpha2)) {
		WEAPON_INDEX = 2;
	}
/*	else if(Input.GetKey(KeyCode.Alpha3)) {
		WEAPON_INDEX = 3;
	}
	else if(Input.GetKey(KeyCode.Alpha4)) {
		WEAPON_INDEX = 4;
	}
*/	
	if(ellapsed >= 60 && BERSERK == true) {
		BERSERK = false;
	}
	Health_Display = "Health: " + PLAYER_HEALTH;
	if(WEAPON_INDEX == 1) {
		AMMO_Display = "CD: " + CD_AMMO;
	}
	else if(WEAPON_INDEX == 2) {
		AMMO_Display = "Zip Disks: " + ZIP_DISK_AMMO;
	}
/*	else if(WEAPON_INDEX == 3) {
	}
	else if(WEAPON_INDEX == 4) {
	}
*/	
	
	if(PLAYER_HEALTH <= 0 || Countdown_time <= 0) {
		die();
	}
	Display_Score = "Score: " + SCORE;
}

function die() {
	PLAYER_HEALTH = 100;
	PLAYER_LIVES -= 1;
	Display_Lives = "Lives: " + PLAYER_LIVES;

	CD_AMMO = 0;
	ZIP_DISK_AMMO = 0;
	BERSERK = false;
	ZIP_CANNON = false;
	SCORE = 0;


	if(PLAYER_LIVES > 0) {
		Application.LoadLevel(Application.loadedLevel);
	}
	else {
		Application.LoadLevel(0);
	}
}

static function ApplyDamageFromEnemy(damage: int) {
	PLAYER_HEALTH -= damage;
}

function OnControllerColliderHit ( hit : ControllerColliderHit)
{
	if(hit.gameObject.tag == 'ZipDriveCannon') {
		ZIP_CANNON = true;
		print('playit');
		weaponPickup.Play();
		Destroy(hit.gameObject);
	}
	if (hit.gameObject.tag == "Health" )
	{
		PLAYER_HEALTH += 10;
		
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
		Destroy(hit.gameObject);
		berserkTime = Time.time;
	}
	else if (hit.gameObject.tag == "CDAmmoPack" && CD_AMMO < 50)
	{
		CD_AMMO += 10;
		if(CD_AMMO > 50) {
			CD_AMMO = 50;
		}
		Destroy(hit.gameObject);
	}
	else if (hit.gameObject.tag == "ZipAmmoPack" )
	{
		Destroy(hit.gameObject);
		ZIP_DISK_AMMO += 20;
		if(ZIP_DISK_AMMO > 200) {
			ZIP_DISK_AMMO = 200;
		}
	}
}