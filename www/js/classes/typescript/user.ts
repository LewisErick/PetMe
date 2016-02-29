class User {
	username: string;
	password: string;
	key: number;
	pets = [];
	petKey = 1;

	constructor(theUser, thePassword, theKey) {
		this.username = theUser;
		this.password = thePassword;
		this.key = theKey;
	}

	addPet(theName: string, theImage: string, theSex: string, theAge: number) {
		var pet = new Pet(theName, theImage, theSex, theAge);
		pet.setId(this.petKey);
		this.pets.push(pet);
	}
}