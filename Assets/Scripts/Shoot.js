var speed = 4.0;
var cdPrefab : Transform;
var zipDiskPrefab : Transform;

function Update () {
	//find out if fire button is pressed
	if(Input.GetButtonDown("Fire1")) {
		if(Collisions.CD_AMMO > 0 ) {
			//create the prefab
			var cd = Instantiate(cdPrefab,transform.position,Quaternion.identity);
			
			//add force to prefab
			cd.rigidbody.AddForce(transform.forward * 2000);
			Collisions.CD_AMMO -= 1;
			print('CD Count' + Collisions.CD_AMMO);
		}
	}

	if(Input.GetMouseButton(0)) {
		if(Collisions.ZIP_DISK_AMMO > 0 ) {
			//create the prefab
			var zipDisk = Instantiate(zipDiskPrefab,transform.position,Quaternion.identity);
			
			//add force to prefab
			zipDisk.rigidbody.AddForce(transform.forward * 2000);
			Collisions.ZIP_DISK_AMMO -= 1;
			print('ZIP_DISK_AMMO Count' + Collisions.ZIP_DISK_AMMO);
		}
	}
}

