// used to get a random number
function getRandomInRange(min,max) {
    return Math.round(Math.random() * (max - min) + min)
}

// it should be called toRadians. I use this becouse Math.cos/sin
// takes radians as inputs
function toDegrees (angle) {
  return angle * 0.0174533;
} 

// creates a increment along the x-axis
function xDirection(){
    return Math.cos(angle);
}

// creates a increment along the y-axis
function yDirection(){
    return Math.sin(angle);
}

// creates a circle with radius rad with its center at cent and 
// resolution k
function createCirclePoints( cent, rad, k ){
    var dAngle = 2*Math.PI/k;
    points = []
    for( i=k; i>=0; i-- ) {
        a = i*dAngle;
        var p = vec2( rad*Math.sin(a) + cent[0], rad*Math.cos(a) + cent[1] );
        points.push(p);
    }
    return points;
}





function above(objectA,objectB){
	if (objectA.position.y >= objectB.position.y) {
		return true;
	};
}

function clampX(objectA, objectB) {
	if (objectA.position.x > objectB.position.x - objectB.width) {
		if (objectA.position.x < objectB.position.x + objectB.width) {
			return true;
		};
	};
	return false;
}

function locationDifferenceY (objectA, objectB, sensitivity) {
	if (objectA.position.y != objectB.position.y) {
		if ((Math.abs((objectA.position.y - objectB.position.y + objectB.height).toFixed(2))) <= sensitivity) {		
			return true
		};
	};
	return false
}






function clampY(objectA, objectB) {
	if (objectA.position.y > objectB.position.y - objectB.height) {
		if (objectA.position.y < objectB.position.y + objectB.height) {
			return true;
		};
	};
	return false;
}

function touch(objectA, objectB) {
	if (locationDifferenceX(objectA,objectB, 0.01)) {
		if (locationDifferenceY(objectA,objectB,0.1)) {
			return true
		};
	};
	return false
}

function locationDifferenceX(objectA, objectB, sensitivity) {
	if (objectA.orientation == 1 && objectB.width < 0.9) {
		if ((Math.abs((objectA.position.x + objectA.nose) - (objectB.position.x - objectB.width)).toFixed(3)) <= sensitivity) {
			return true
		};
	};

	if (objectA.orientation == -1 && objectB.width < 0.9) {
		if ((Math.abs((objectA.position.x - objectA.nose) - (objectB.position.x + objectB.width)).toFixed(3)) <= sensitivity) {
			return true
		};
	};	
	return false
}



