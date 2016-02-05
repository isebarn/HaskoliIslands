/* 
Use:    gun(target, bullet)
After:  object that follows a target-object

Arguements:
    target - The object that the gun follows
    bullet - The object the gun fires at its target

Functions:
    createStructure() - Creates the gun's coordinates
    move()            - moves the gun around, following its target
*/
function gun(target, bullet) {
    this.position = new Object()
    this.position.x = -0.8
    this.position.y = 1.0
    this.width = 0.1
    this.height = 0.1
    this.speed = 0.006*(level + 1)
    this.color = vec4(0.24,0.22,0,1)

    this.createStructure = function() {
        this.structure = [
            vec2(this.position.x-this.width, this.position.y),
            vec2(this.position.x+this.width, this.position.y),
            vec2(this.position.x+this.width, this.position.y-this.height),
            vec2(this.position.x-this.width, this.position.y-this.height)
            ]
    }  

    this.move = function() {
        if (target.position.x > this.position.x) {
            this.position.x += this.speed
            if (!bullet.fired) {
                bullet.position.x += this.speed
            };
        }
        else if (target.position.x < this.position.x){
            this.position.x -= this.speed
            if (!bullet.fired) {
                bullet.position.x -= this.speed
            };
        }
        if (target.position.x.toFixed(1) == this.position.x.toFixed(1)) {
            bullet.fire()
        };
        bullet.createStructure()
        this.createStructure()
    }
    this.createStructure()
}

/* 
Use:    bullet(target)
After:  object that moves at a certain speed vertically across the screen

Arguements: 
    target - the object the bullet is fired at by the gun
Functions:
    fire()            - Initiates the objects movement across the screen
    hit()             - Checks if the object has hit its object
    createStructure() - Creates the objects coordinates
    contact()         - Checks if the bullet has hit its target
*/
function bullet(target){
	this.position = new Object()
	this.position.x = -0.8
	this.position.y = 0.9;
	this.radius = 0.05
    this.width = this.radius
    this.height = this.radius	
    this.speed = 0.02 + level*0.01
    this.fired = false;
    this.color = vec4(0.08,0.01,0.16,1)

    this.fire = function() {
        this.fired = true
    	this.position.y -= this.speed
    	this.createStructure()
    	if (this.position.y < -1.1) {
    		this.position.y = 0.9
    		this.position.x = gun.position.x
            this.fired = false;
    	};
    	this.hit()
    }

    this.hit = function() {
    	if (this.position.y.toFixed(1) == target.position.y.toFixed(1)) {
    		if (this.position.x + this.radius >= target.position.x) {
    			if (this.position.x - this.radius <= target.position.x) {
    				this.position.y = 0.9
    				target.hurt()
    			};
    		target.front()
    		if (this.position.x + this.radius >= target.position.x) {
				if (this.position.x - this.radius <= target.position.x) {
    				this.position.y = 0.9
    				target.hurt()
				};    			
    		};	
    		target.back()    		
    		};

    	};
    }

    this.createStructure = function(){
		this.bullet = createCirclePoints([this.position.x,this.position.y], this.radius, 27)
    }

    this.contact = function(object) {
        if (clampX(object, this)) {
            if (locationDifferenceY(object,this,0.1)) {
            	console.log(1)
            };
        };
    }

    this.createStructure()	
}