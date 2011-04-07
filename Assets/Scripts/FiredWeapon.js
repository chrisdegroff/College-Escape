function OnCollisionEnter(collision : Collision) {
	if(collision.collider.tag == 'Floor') {
		Destroy(gameObject);
	}
}