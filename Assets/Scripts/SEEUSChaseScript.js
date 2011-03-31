var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 3; //speed of turning
var range = 20.0;

var myTransform : Transform; //current transform data of this enemy

function Awake() {
    myTransform = transform; //cache transform data for easy access/preformance
}

function Start() {
	 target = GameObject.FindWithTag("Player").transform; //target the player
}

function Update () {
	if(target && CanAttackTarget()) {
		SEEUSPatrolScript.patrol = false;
     	//rotate to look at the player
		myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
		Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
		var walkForward = myTransform.TransformDirection(Vector3.forward);
		var characterController : CharacterController;
		characterController = GetComponent(CharacterController);
		//move towards the player
		characterController.SimpleMove(walkForward*moveSpeed);
//		myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
	}
	else {
		SEEUSPatrolScript.patrol = true;
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