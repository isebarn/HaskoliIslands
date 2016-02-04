var left = 37;
var up = 38;
var right = 39
var down = 40;

function keyDown(object,direction) { 
	if (direction == left) {				
		if (!object.jumping && !object.leaping && !object.crashing && !object.falling) {
			if (object.orientation == 1) {
				object.reverse()
			}
			else {
				object.run()
			}
		};
	};

	if (direction == right) {
		if (!object.jumping && !object.leaping && !object.crashing && !object.falling) {
			if(object.orientation == -1) {
				object.reverse();
			}
			else {
				object.run()
			}				
		};
	};

	if (direction == up && !object.jumping && !object.falling && !object.leaping) {
		if (object.running) {
			object.leap(object.jumpStrength)
		}
		else {
			object.jump(object.jumpStrength);
		}
	};
}


function keyUp(object,direction) { 
	if (direction == left ) {
		if (!object.jumping && !object.leaping && !object.crashing && !object.falling) {
			object.stop();
		}
		if (object.crashing) {
			object.crashing = false
		};
	};

	if (direction == right ) {
		if (!object.jumping && !object.leaping && !object.crashing && !object.falling) {
			object.stop();
		}
		if (object.crashing) {
			object.crashing = false
		};		
	};	
}