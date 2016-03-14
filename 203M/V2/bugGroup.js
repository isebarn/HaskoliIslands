function bugGroup(sizeOfGroup){
	this.bugs = []
	this.size = sizeOfGroup

	this.createFlock = function(){
		for (var i = 0; i < this.size; i++) {
			this.bugs.push(new bug())
		}
	}

	this.groupFly = function () {

    	this.alignment()
    	this.cohesion()
    	this.separation()		
		for (var i = this.bugs.length - 1; i >= 0; i--) {
			this.bugs[i].fly()
		}
	}

	this.alignment = function(){
		for (var i = this.bugs.length - 1; i >= 0; i--) {
			count = 0
			this.bugs[i].groupVelocity = vec3()

			for (var j = 0; j < this.bugs.length; j++) {
				if (i != j && length(subtract(this.bugs[i].position, this.bugs[j].position)) < alignment/10) {
					this.bugs[i].groupVelocity = add(this.bugs[i].groupVelocity,this.bugs[j].velocity)  
					count += 1
				}
			}

			if (count > 0) {
				for (var k = 0; k < this.bugs[i].groupVelocity.length; k++) {
					this.bugs[i].groupVelocity[k] *= 0.05/count
				}
			}

		}
	}

	this.cohesion = function(){
		for (var i = this.bugs.length - 1; i >= 0; i--) {
			count = 0
			this.bugs[i].groupLocation = vec3()

			for (var j = 0; j < this.bugs.length; j++) {
				if (i != j && length(subtract(this.bugs[i].position, this.bugs[j].position)) < cohesion/10 && length(subtract(this.bugs[i].position, this.bugs[j].position)) > 0.1) {
					this.bugs[i].groupLocation = add(this.bugs[i].groupLocation,this.bugs[j].position)  
					count += 1
				}
			}

			if (count > 0) {
				
				for (var k = 0; k < this.bugs[i].groupLocation.length; k++) {
					this.bugs[i].groupLocation[k] *= 1/count
				}
				
				this.bugs[i].groupLocation = subtract(this.bugs[i].groupLocation,this.bugs[i].position)
				
				for (var k = 0; k < this.bugs[i].groupLocation.length; k++) {
					this.bugs[i].groupLocation[k] *= 0.05
				}				
			}
		}
	}

	this.separation = function(){
		for (var i = this.bugs.length - 1; i >= 0; i--) {
			place = i
			minimumDistance = separation/10
			this.bugs[i].groupSpace = vec3()

			for (var j = 0; j < this.bugs.length; j++) {
				distance = length(subtract(this.bugs[i].position, this.bugs[j].position))
				if (i != j && distance < minimumDistance ) {
					place = j
					minimumDistance = distance
				}
			}

			if (place != i) {
				this.bugs[i].groupSpace = subtract(this.bugs[i].position,this.bugs[place].position)
			}
		}
	}

	this.createFlock()
}