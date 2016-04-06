function world(){
	this.road = []
	this.indiceLocation = 0

	this.color = []

	this.createRoad = function(){
	    rectangleVertices(vv, 0.1, 0.1, 0.1, 0, -1.2, -10)
	    rectangleIndices(indices, indiceTrack)	
	    this.indiceLocation = indiceTrack.length - 1

		for (var i = 0; i <= 10; i++) {
			this.road[i] = new Array(100)
			this.color[i] = new Array(100)
		}
	}



	this.colors = function(){
		this.street = vec4(0.043,0.043,0.043)
		this.grass = vec4(0.043,0.141,0.031)
		this.water = vec4(0.224,0.071,0.714)

		for (var i = 0; i < this.color.length; i++) {
			for (var j = 0; j < this.color[i].length; j++) {
				if (between(j,0,2)) {this.color[i][j] = this.grass}
				if (between(j,3,10)) {this.color[i][j] = this.street}
				if (between(j,11,12)) {this.color[i][j] = this.grass}
				if (between(j,13,20)) {this.color[i][j] = this.street}
				if (between(j,21,45)) {this.color[i][j] = this.water}
				if (between(j,46,56)) {this.color[i][j] = this.street}
				if (between(j,57,67)) {this.color[i][j] = this.grass}
				if (between(j,68,78)) {this.color[i][j] = this.water}
				if (between(j,79,97)) {this.color[i][j] = this.street}
				if (between(j,98,100)) {this.color[i][j] = this.grass}
			}
		}
	}

	this.draw = function(){
		
		ctm = mat4()
		ctm = camera
	    ctm = mult(ctm, rotateY(-spinY)) 
	    ctm = mult(ctm, rotateX(spinX)) 

	    x = []

		ctm = mult(ctm, translate(-0.21*6,0,0))
	    for (var i = this.road.length - 1; i >= 0; i--) {
			ctm = mult(ctm, translate(0.21,0,0))
			x.push(ctm)
	    	for (var j = 0; j < this.road[i].length; j++) {
	    		gl.uniform4fv(locrcolor, flatten(this.color[i][j]))
				ctm = mult(ctm, translate(0,0,0.21))
	    		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
				gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );	    		
	    	}
	    	ctm = x.pop()
	    }
	}

	this.createRoad()
	this.colors()
}