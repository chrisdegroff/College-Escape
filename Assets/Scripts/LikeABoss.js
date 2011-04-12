var target : Transform; //the enemy's target
var moveSpeed = 3.5; //move speed
var rotationSpeed = 4; //speed of turning
var range = 20.0;
//var comehere : AudioSource;
var playedComeHere = false;
var applyDamage : AudioSource;
var myTransform : Transform; //current transform data of this enemy
var lastAttackTime;
var lastThrowTime;
static var shoot = false;
//Things to do:
//The Boss isn't Patroling from his patrol script
//Can't fire on people either like he should be able to do
//Boss doesn't reset as well, which could be interesting gameplay
function Awake() {
    myTransform = transform; //cache transform data for easy access/preformance
	lastAttackTime = Time.time;
	lastThrowTime = Time.time;
}

static function reset() {
	shoot = false;
	BossPatrol.patrol = true;
}

function Start() {
	 target = GameObject.FindWithTag("Player").transform; //target the player
}

function waiting() {
	if(Time.time - lastAttackTime > .35) {
		return false;
	}
	return true;
}

function Update () {
	if(target && CanAttackTarget()) {
		if(!waiting()) {
			//if(!playedComeHere) {
			//	comehere.Play();
			//	playedComeHere = true;
			//}
			BossPatrol.patrol = false;
			shoot = true;
			//rotate to look at the player
			myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
			Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
			var walkForward = myTransform.TransformDirection(Vector3.forward);
			var characterController : CharacterController;
			characterController = GetComponent(CharacterController);
			//move towards the player
			characterController.SimpleMove(walkForward*moveSpeed);
			
			var hit : RaycastHit;
	
			//Shoot the player with a cd, I hope
//			if((Time.time - lastThrowTime) > 5){
//				shoot = true;
//				}
//			else{
//				shoot = false;
//			}
			// Check if there's collision between SEEUS and target
			if(Physics.Linecast(transform.position, target.position, hit)) {
				if(hit.collider.gameObject.tag == 'Player' && hit.distance <= 1) {
					applyDamage.Play();
					Collisions.ApplyDamageFromEnemy(30);
					lastAttackTime = Time.time;
				}		
			}
		}
	}
	else {
		playedComeHere = false;
		BossPatrol.patrol = true;
		shoot = false;
	}
}

function CanAttackTarget() {
	// check if target is close enough
	if(Vector3.Distance(transform.position, target.position) > range) {
		
		return false;
	}
	
	var hit : RaycastHit;

	// Check if there's collision between SEEUS and target
	if(Physics.Linecast(transform.position, target.position, hit)) {
		if(hit.collider.gameObject.tag != 'Player') {
			return false;
		}
		else {
			return true;
		}		
	}

	return true;
}