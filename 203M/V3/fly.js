function fly(){
	this.indiceLocation = 0
	this.x = 0
	this.y = -1.0
	this.z = 0.0
	this.age = -1


	this.createFly = function(){
		boxVertices(vv, 0.05,0.05,0.05, 0, 0, -10)
		boxIndices(indices, indiceTrack)
		this.indiceLocation = indiceTrack.length - 1
	}

	this.draw = function(frog){
		this.age += 1
		if (this.age == 0) {
			this.z = frog.z + (Math.floor(Math.random()*15)+5)*0.21
			this.x = coinToss()*(Math.floor(Math.random()*6))*0.21
			
		}
		if (this.age > 50) {
			this.age = -1
		}

		lane = Math.floor(this.z/0.21)

		if (werk.color[4][lane] == werk.water) {
			this.y = -0.8
		}
		else{
			this.y = -1
		}

		x = []

	    ctm = mat4()
	    ctm = camera
	    ctm = mult(ctm, rotateY(-spinY)) 
	    ctm = mult(ctm, rotateX(spinX))
		gl.uniform4fv(locrcolor, flatten(vec4(1,0,0)))
	    
	    x.push(ctm)

	    ctm = mult(ctm, translate(this.x,this.y,this.z))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );

		ctm = x.pop()
		ctm = mult(ctm, rotateZ(180))
	    ctm = mult(ctm, translate(-this.x,-this.y,this.z))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );

	    
	}

	this.createFly()		
}