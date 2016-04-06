function log(size,tree, lane){
	this.xPos = []
	this.lane = lane
	this.size = size
	this.tree = tree

	this.create = function(){

		for (var i = 0; i < size; i++) {
			this.xPos.push(-1.3 + i)
		}
		this.lane = this.lane
		this.findLane()
	}

	this.draw = function(lane, xPos){
		this.tree.draw(this.lane, this.xPos)
	}

	this.findLane = function(){
		river.velocity[lane] = 0.01*(1 + Math.floor(Math.random()*river.free.length))*river.direction[lane]
	}	

	this.create()


}