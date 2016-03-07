function flock(flockSize){
	this.butterflies = []
	this.size = flockSize

	this.createFlock = function(){
		for (var i = 0; i < this.size; i++) {
		    this.butterflies.push(new butterfly())
		}
	}

	this.separation = function(i,j,d){
		var dx = this.butterflies[i].position.x - this.butterflies[j].position.x
		var dy = this.butterflies[i].position.y - this.butterflies[j].position.y
		var dz = this.butterflies[i].position.z - this.butterflies[j].position.z
		var r = Math.sqrt(dx*dx+dy*dy+dz*dz)
		var theta = 0.01
		var phi = 0.01
		if (dx != 0) {
			theta = Math.atan(dy/dx) * 180 / Math.PI*0.1
		}
		else if(r != 0){
			phi = Math.acos(dz/r) * 180 / Math.PI*0.1
		}

		this.butterflies[i].theta += theta * 0.0001
		this.butterflies[i].phi += phi * 0.0001
	}

	this.alignment = function(i,count){
		this.butterflies[i].speed /= count
		this.butterflies[i].theta /= count
		this.butterflies[i].phi /= count
				
	}

	this.cohesion = function(j, avgplace, count){
		for (var i = avgplace.length - 1; i >= 0; i--) {
			avgplace[i] /= count
		}
		var dx = avgplace[0] - this.butterflies[j].position.x
		var dy = avgplace[1] - this.butterflies[j].position.y
		var dz = avgplace[2] - this.butterflies[j].position.z
		var r = Math.sqrt(dx*dx+dy*dy+dz*dz)
		var theta = 0.01
		var phi = 0.01
		if (dx != 0) {
			theta = Math.atan(dy/dx) * 180 / Math.PI*0.1
		}
		else if(r != 0){
			phi = Math.acos(dz/r) * 180 / Math.PI*0.1
		}

		this.butterflies[j].theta += theta * 0.0001
		this.butterflies[j].phi += phi * 0.0001

	}

	this.findDistance = function(){
		for (var i = 0; i < this.size; i++) {
			var xi = this.butterflies[i].position.x
			var yi = this.butterflies[i].position.y
			var zi = this.butterflies[i].position.z

			var count = 1
			var avgplace = vec3()

			for (var j = i+1; j < this.size; j++) {
				var xj = this.butterflies[j].position.x
				var yj = this.butterflies[j].position.y
				var zj = this.butterflies[j].position.z	
				var d = Math.sqrt(Math.pow(xi-xj,2)+Math.pow(yi-yj,2)+Math.pow(zi-zj,2))
				if (d < 0.2) {
					this.butterflies[i].speed += this.butterflies[j].speed
					this.butterflies[i].theta += this.butterflies[j].theta
					this.butterflies[i].phi += this.butterflies[j].phi
				}		
				if (d < 0.1) {
					this.separation(i,j,d)
				}	
				if (d < 0.3) {
					count += 1
					avgplace[0] += xj
					avgplace[1] += yj
					avgplace[2] += zj
				}	
			}
			if (count > 1) {
				this.separation(i,count)
				this.cohesion(i, avgplace, count)
				this.butterflies[i].close = true

			}
			else{
				this.butterflies[i].close = false
			}
		}
	}

	this.createFlock()

}