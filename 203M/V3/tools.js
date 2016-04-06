zoom = -3

function absMax(array){
	var max = Math.abs(array[0])
	for (var i = array.length - 1; i > 0; i--) {
		if (Math.abs(array[i]) > max) {
			max = Math.abs(array[i])
		}
	}
	return max
}

function absMin(array){
	var min = Math.abs(array[0])
	for (var i = array.length - 1; i > 0; i--) {
		if (Math.abs(array[i]) < min) {
			min = Math.abs(array[i])
		}
	}
	return min
}

function randomColor(){
    return vec4(
        Math.random(),
        Math.random(),
        Math.random()
        )
}

function coinToss(){
	x = Math.random()
	if (x < 0.5) {
		return -1
	}
	return 1
}

function between(value, min, max){
	if (value >= min && value <= max) {
		return true
	}
	return false
}

function rotate(tt){
    var mv = lookAt( vec3(0.0, 0, zoom), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

	return mult(mv,tt)
}	

function boxIndices(indiceArray, indiceMarker){
	array = [0,1,5,4,0,2,3,1,3,7,5,7,6,4,6,2,0,0,1,3,2]
	place = indiceMarker.length - 1
	begin = indiceMarker[place][2]
	shift = indiceMarker[place][1]
	end = indiceMarker[place][0]
	for (var i = 0; i < array.length; i++) {
		indiceArray.push(array[i] + shift)
	}
	indiceMarker.push(vec3(begin + end, shift + 8, 21))
}

function boxVertices(verticeArray, x, y, z, xshift, yshift, zshift){
	vertices = [
		vec3(-x+xshift,-y+yshift,-z+zshift),
	    vec3( x+xshift,-y+yshift,-z+zshift),
	    vec3(-x+xshift, y+yshift,-z+zshift),
	    vec3( x+xshift, y+yshift,-z+zshift),
	    vec3(-x+xshift,-y+yshift, z+zshift),
	    vec3( x+xshift,-y+yshift, z+zshift),
	    vec3(-x+xshift, y+yshift, z+zshift),
	    vec3( x+xshift, y+yshift, z+zshift),
    ]

    for (var i = 0; i < vertices.length; i++) {
    	verticeArray.push(vertices[i])
    }
}

function rectangleIndices(indiceArray, indiceMarker){
	array = [0, 1, 2, 3]
	place = indiceMarker.length - 1
	begin = indiceMarker[place][2]
	shift = indiceMarker[place][1]
	end = indiceMarker[place][0]
	for (var i = 0; i < array.length; i++) {
		indiceArray.push(array[i] + shift)
	}
	indiceMarker.push(vec3(begin + end, shift + 4, 4))	
}

function rectangleVertices(verticeArray, x, y, z, xshift, yshift, zshift ){
	vertices = [
		vec3(-x+xshift, y+yshift,-z+zshift),
		vec3(-x+xshift, y+yshift, z+zshift),
		vec3( x+xshift, y+yshift, z+zshift),
		vec3( x+xshift, y+yshift,-z+zshift),
	]
    for (var i = 0; i < vertices.length; i++) {
    	verticeArray.push(vertices[i])
    }	
}