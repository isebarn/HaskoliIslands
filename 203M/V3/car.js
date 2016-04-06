function car(){
	this.indiceLocation = 0
	this.x = 0
	this.y = -1.0
	this.z = 0.0

	this.createCar = function(){
		boxVertices(vv, 0.1,0.1,0.1, 0, 0, -10)
		boxIndices(indices, indiceTrack)
		this.indiceLocation = indiceTrack.length - 1
	}

	this.draw = function(lane, xPos){
	    ctm = mat4()
	    ctm = camera
	    ctm = mult(ctm, rotateY(-spinY)) 
	    ctm = mult(ctm, rotateX(spinX)) 
	    

	    z = []
	    z.push(ctm)

	    for (var i = 0; i < xPos.length; i++) {
	    	gl.uniform4fv(locrcolor, flatten(vec4(1,0.851,0)))
	    	x = []
	    	x.push(ctm)

	    	z.push(ctm)
    		ctm = mult(ctm, translate(xPos[i],this.y,street.lanes[lane]*0.21))
	    	gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
	    	gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );
   
   			ctm = x.pop()
   			ctm = mult(ctm, rotateZ(180))
    		ctm = mult(ctm, translate(-xPos[i],-this.y,street.lanes[lane]*0.21))
	    	gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
	    	gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );




	    	gl.uniform4fv(locrcolor, flatten(vec4(1,0.901,0.365)))
   	    	gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
	    	gl.drawElements(gl.LINES, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );
    		



    		ctm = z.pop()
    		xPos[i] += street.velocity[lane]
	    }
	    
	    return this.outside(lane, xPos)
	}

	this.outside = function(lane, xPos){
		end = absMax(xPos)
		begin = absMin(xPos)
		if (begin > 2) {
			for (var i = 0; i < xPos.length; i++) {
				xPos[i] = (-1.3 - i)*street.direction[lane]
			}
			return true
		}
		return false
	}

	this.createCar()
}