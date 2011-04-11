function OnCollisionEnter(collision : Collision) {
	if(collision.collider.tag == 'Floor' || collision.collider.tag == 'Wall') {
		Destroy(gameObject);
	}
}