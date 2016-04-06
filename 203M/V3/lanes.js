function lane(sections){
	this.velocity = []
	this.free = []
	this.direction = []
	this.lanes = []	

	this.create = function(){
		for (var i = 0; i <= sections.length/2; i += 2) {
			for (var j = sections[i]+1; j <= sections[i+1]+1; j++) {
			    this.lanes.push(j)
			    this.free.push(true)
			    if (j%2 == 0) {
			        this.velocity.push(0.01*(1 + Math.floor(Math.random()*3)))
			        this.direction.push(1)
			    }
			    else{
			        this.velocity.push(0.01*(1 + Math.floor(Math.random()*3))*-1)
			        this.direction.push(-1)
			    }				
			}
		}
	}

	this.create()
}