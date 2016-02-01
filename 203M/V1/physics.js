function gravity(object,gravity){
	object.speedY += gravity


	if (object.position.y <= object.position.ground) {
		object.land()
	};
}