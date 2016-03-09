function bug(){
	this.position = vec3()
	this.position[0] = (Math.random() - 0.5)*2
	this.position[1] = (Math.random() - 0.5)*2
	this.velocity = vec3()
	this.speed = 0.005
	this.groupVelocity = vec3()
	this.groupLocation = vec3()
	this.groupSpace = vec3()
	this.flap = 0
	this.stroke = 5
	this.size = 1
	this.theta = Math.floor(Math.random()*90)
	this.phi = Math.floor(Math.random()*180)

	this.bodyColor = randomColor()
	this.wingColor = randomColor()

	this.flaps = function(){
	    this.flap += this.stroke

	    if(this.flap < -85 || this.flap > 10){
	        this.stroke *= -1
	    }		
	}

	this.direction = function(){
        this.phi += (Math.random()-0.5)*3
        this.theta += (Math.random()-0.5)*3	

        this.velocity[0] += Math.sin(radians(this.theta))*Math.cos(radians(this.phi))
        this.velocity[1] += Math.sin(radians(this.theta))*Math.sin(radians(this.phi))
        this.velocity[2] += Math.cos(radians(this.theta)) 
        this.velocity = add(this.velocity,this.groupVelocity)
        this.velocity = add(this.velocity,this.groupLocation)
        this.velocity = add(this.velocity,this.groupSpace)
        this.velocity = normalize(this.velocity)



        this.theta = (Math.acos(this.velocity[2]/length(this.velocity)))*180/Math.PI
        if (this.velocity[0] != 0 && this.velocity[1] != 0) {
        	this.phi =180* (Math.atan(this.velocity[1]/this.velocity[0]))/Math.PI
        }

		for (var i = this.position.length - 1; i >= 0; i--) {
			this.position[i] += this.velocity[i]*this.speed
		}                	
	}

	this.fix = function(){
		for (var i = this.position.length - 1; i >= 0; i--) {
			if (Math.abs(this.position[i]) > 1) {
				this.position[i] *= -0.95
			}
				
		}
	}

	this.draw = function(){
		this.direction()

		gl.uniform4fv(locrcolor, flatten(this.bodyColor))
    	gl.uniformMatrix4fv(matrixLoc, false, flatten(this.body()));
    	gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0 );

        gl.uniform4fv(locrcolor, flatten(this.wingColor))
        gl.uniformMatrix4fv(matrixLoc, false, flatten(this.wingR()));
        gl.drawElements( gl.TRIANGLES,12, gl.UNSIGNED_BYTE, 36);
    
        gl.uniformMatrix4fv(matrixLoc, false, flatten(this.wingL()));
        gl.drawElements( gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, 48);	   	
	}

	this.body = function(i){
		ctm = mat4()
		ctm = mult(rotateY(this.theta),ctm)
		ctm = mult(rotateZ(-this.phi),ctm)
		ctm = mult(translate(this.position),ctm)
		ctm = rotate(ctm)
		return ctm		
	}

	this.wingR = function(){
		ctm = mat4()
		ctm = mult(rotateZ(this.flap),ctm)
		ctm = mult(rotateY(this.theta),ctm)
		ctm = mult(rotateZ(-this.phi),ctm)
		ctm = mult(translate(this.position),ctm)
		ctm = rotate(ctm)
		return ctm	
	}

	this.wingL = function(){
		ctm = mat4()
		ctm = mult(rotateZ(-this.flap),ctm)
		ctm = mult(rotateY(this.theta),ctm)
		ctm = mult(rotateZ(-this.phi),ctm)
		ctm = mult(translate(this.position),ctm)
		ctm = rotate(ctm)
		return ctm	
	}

	this.fly = function(){
		this.flaps()
		this.draw()
		this.fix()
	}

}