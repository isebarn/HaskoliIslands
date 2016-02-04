function gateway(){
	this.position = new Object()
	this.position.x = platforms[platforms.length - 1].position.x
	this.position.y = platforms[platforms.length - 1].position.y
	this.radius = 0.09
    this.width = this.radius
    this.height = this.radius
    this.color = vec4(0.24,0,0, 1.0 )

    this.leave = function() {
    	if (this.position.y.toFixed(1) == jack.position.y.toFixed(1)) {
    		if (this.position.x + this.radius >= jack.position.x) {
    			if (this.position.x - this.radius <= jack.position.x) {
    				this.position.y = 1.0
    				changeLevel()
    			};
    		jack.front()
    		if (this.position.x + this.radius >= jack.position.x) {
				if (this.position.x - this.radius <= jack.position.x) {
    				this.position.y = 1.0
    				changeLevel()
				};    			
    		};	
    		jack.back()    		
    		};

    	};
    }

	this.createStructure = function() {
		this.pathway = createCirclePoints([this.position.x,this.position.y + 0.1], this.radius, 27)
	}

	this.createStructure()
}