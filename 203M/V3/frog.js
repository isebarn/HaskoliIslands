function frog(){
	this.indiceLocation = 0
	this.x = 0.0
	this.y = -1.0
	this.z = 0
	this.up = false
	this.float = false
	this.score = 3000
	this.lives = 3
	this.age = 0
	this.flies = 0
	this.highscore = this.score

	this.createFrog = function(){
		boxVertices(vv, 0.1,0.1,0.1, 0, 0, -10)
		boxIndices(indices, indiceTrack)
		this.indiceLocation = indiceTrack.length - 1
	}

	this.drawFrog = function(){
		if (this.score > this.highscore) {
			this.highscore = this.score
		}
		if (this.z/0.21 > 100) {
			this.lives += 3
			this.highscore += this.score
			this.home()
		}

		this.age += 1
		this.score = 1000 + 1000 * this.lives - this.age
		if (Math.abs(this.x) >= 1.26) {
			this.home()
		}

	    lane = Math.floor(this.z/0.21-1)
		if (werk.color[4][lane] == werk.street) {
			for (var i = groop.length - 1; i >= 0; i--) {
				if (lane + 1 == street.lanes[groop[i].lane]) {
					for (var j = 0; j < groop[i].xPos.length; j++) {
						if (Math.abs(groop[i].xPos[j] - this.x) < 0.2) {
							this.home()
						}
					}
				}
			}
		}

		if (werk.color[4][lane] == werk.water) {
			for (var i = loog.length - 1; i >= 0; i--) {
				if (lane + 1== river.lanes[loog[i].lane]) {
					for (var j = 0; j < loog[i].xPos.length; j++) {
						if (Math.abs(loog[i].xPos[j]-this.x) < 0.6) {
							this.float = true
							this.y = -0.8
							this.x = loog[i].xPos[j]
						}
					}
				}
			}
		}
		if (werk.color[4][lane] == werk.water && !this.float) {
			this.home()
		}

		if (Math.abs(flies.z - this.z) < 0.1) {
			if (Math.abs(flies.x - this.x) < 0.1) {
				this.lives += 1
				flies.age = -1
				this.flies += 1
			}
		}

	    gl.uniform4fv(locrcolor, flatten(vec4(0.259,0.067,0.729)))

	    ctm = mat4()
	    ctm = camera
	    ctm = mult(ctm, rotateY(-spinY)) 
	    ctm = mult(ctm, rotateX(spinX)) 

	    x = []
	    x.push(ctm)
	    ctm = mult(ctm, translate(this.x, this.y, this.z))
	    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
	    gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );
		
		ctm = x.pop()
		ctm = mult(ctm, rotateZ(180))
	    ctm = mult(ctm, translate(-this.x,-this.y,this.z))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
		gl.drawElements(gl.TRIANGLE_FAN, indiceTrack[this.indiceLocation][2], gl.UNSIGNED_BYTE, indiceTrack[this.indiceLocation][0] );



		this.float = false
		this.y = -1

		if (this.score < 0) {
			this.score = 3000
			this.lives = 3
			this.age = 0
			this.flies = 0
		}


	}

	this.home = function(){
		this.x = 0
		this.z = 0
		inside = -11.5
		this.lives -= 1
	}



	this.createFrog()
}