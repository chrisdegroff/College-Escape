function OnCollisionEnter(collision : Collision) {
	if(	collision.collider.tag == 'Floor' || 
		collision.collider.tag == 'Wall' || 
		collision.collider.tag == 'BossAmmo' || 
		collision.collider.tag == 'CD' || 
		collision.collider.tag == 'ZipDisk') {
		Destroy(gameObject);
	}
}