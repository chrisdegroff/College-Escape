var speed = 4.0;
var cdPrefab : Transform;
function Update () {
			if(LikeABoss.shoot == true){
				var cd = Instantiate(cdPrefab,transform.position,Quaternion.identity);			
				cd.rigidbody.AddForce(transform.forward * 2000);
				}
}