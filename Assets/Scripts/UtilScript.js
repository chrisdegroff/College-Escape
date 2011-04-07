static function GetDamageBasedOnCharacterAndWeaponType(character: GameObject, weapon: GameObject) {
	var berserkMultiplier = 1;
	if(Collisions.BERSERK == true) {
		berserkMultiplier = 2;
	}

	if(character.tag == 'SeeUs') {
		if(weapon.tag == 'CD') {
			return 5 * berserkMultiplier;
		}
		else if(weapon.tag == 'ZipDisk') {
			return 10 * berserkMultiplier;
		}
		else if(weapon.tag == 'Broom') {
			return 3 * berserkMultiplier;
		}
	}
	else if(character.tag == 'Mouse') {
		if(weapon.tag == 'CD') {
			return 7 * berserkMultiplier;
		}
		else if(weapon.tag == 'ZipDisk') {
			return 10 * berserkMultiplier;
		}
		else if(weapon.tag == 'Broom') {
			return 5 * berserkMultiplier;
		}
	}
	else if(character.tag == 'Robot') {
		if(weapon.tag == 'CD') {
			return 5 * berserkMultiplier;
		}
		else if(weapon.tag == 'ZipDisk') {
			return 10 * berserkMultiplier;
		}
	}
	else if(character.tag == 'Boss') {
		if(weapon.tag == 'ZipDisk') {
			return 5 * berserkMultiplier;
		}
		else if(weapon.tag == 'Broom') {
			return 20 * berserkMultiplier;
		}
	}
	return 0;
}