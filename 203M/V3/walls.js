function wall(){
	this.road = []
	this.indiceLocation = 0

	this.createWall = function(){
	    rectangleVertices(vv, 2, 0, 11, 0, 0, 0)
	    rectangleIndices(indices, indiceTrack)	
	    this.indiceLocation = indiceTrack.length - 1
	}

	this.draw = function(){
	    gl.uniform4fv(locrcolor, flatten(vec4(0,0,0)))
		ctm = mat4()
		ctm = camera
	    ctm = mult(ctm, rotateY(-spinY)) 
	    ctm = mult(ctm, rotateX(spinX)) 

	    ctm = mult(ctm, translate(0,3,0))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );	    			    
	    
	    ctm = mult(ctm, translate(0,-6,0))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );	    			    

	    ctm = mult(ctm, translate(0,+3,0))

	    ctm = mult(ctm, rotateZ(90))
	    ctm = mult(ctm, translate(0,1.155,0))

	    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );	    		
	    ctm = mult(ctm, translate(0,-1.155,0))
	    ctm = mult(ctm, translate(0,-1.155,0))
	    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );	    		

	}

	this.createWall()
}