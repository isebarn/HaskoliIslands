function group(size,car){
	this.xPos = []
	this.lane = null
	this.size = size
	this.car = car

	this.create = function(){
		for (var i = 0; i < size; i++) {
			this.xPos.push(-1.3 + i)
		}
		this.lane = Math.floor(Math.random()*street.free.length)
		this.findLane()
	}

	this.draw = function(){
		if (this.car.draw(this.lane, this.xPos)) {
			this.findLane()
		} 
	}

	this.findLane = function(){
		newlane = false
		test = 0
		street.free[this.lane] = true
		while(!newlane){
			test = Math.floor(Math.random()*street.free.length)
			newlane = street.free[test]
		}
		street.free[test] = false
		this.lane = test
		street.velocity[test] = 0.01*(1 + Math.floor(Math.random()*street.free.length))*street.direction[test]
	}

	this.create()

}