function jack(direction, startingPosition){
    this.orientation = direction;
    this.position = new Object();
    this.position.x = startingPosition[0];
    this.position.y = startingPosition[1];
    this.nose = 0.1
    this.head = 0.1
    this.position.ground = platforms[0].position.y;
    this.structure = [];
    this.coins = 0;
    this.falling = true;
    this.jumping = false;
    this.running = false;
    this.turning = false;
    this.landing = false
    this.leaping = false;
    this.crashing = false;
    this.speedY = 0.0
    this.speedX = 0.0
    this.runStrength = 0.03
    this.jumpStrength = 0.09
    this.floor = 0;
    this.grounded = false;

    this.front = function(){
        this.position.x += this.orientation*this.nose
    }
    this.back = function(){
        this.position.x -= this.orientation*this.nose
    }    

    this.crash = function() {
        this.false();
        this.crashing = true
        this.position.x -= this.orientation*this.runStrength
        this.crashing = false
    }

    this.false = function(){
        this.falling = false;
        this.jumping = false;
        this.running = false;
        this.turning = false;
        this.landing = false
        this.leaping = false;
        this.grounded = false
    }

    this.fall = function() {
        this.position.ground = platforms[0].position.y;
        this.false();
        this.grounded = false
        this.falling = true;
    }

    this.land = function() {
        this.false();
        this.landing = true;
        this.ground()
        this.position.y = this.position.ground


        this.speedY = 0.0
        this.createStructure()
        this.landing = false;

    }

    this.jump = function(jumpSpeed) {
        this.false()
        this.jumping = true;
        this.speedY = jumpSpeed
    }

    this.leap = function(jumpSpeed){  
        this.false()
        this.leaping = true;
        this.speedY = jumpSpeed
    }

    this.run = function() {
        this.false()
        this.running = true;
    }

    this.moveX = function(runSpeed){
        this.position.x += runSpeed*this.orientation;
        if (!clampX(this, platforms[this.floor]) && this.running) {
            //this.front()
            this.fall()
        };
    }

    this.moveY = function(jumpSpeed) {

        if (jumpSpeed <= 0.0 && this.jumping) {
            this.fall()
        };

        this.position.y += jumpSpeed
    }

    this.stop = function() {
        this.running = false;
        this.leaping = false
    }

    this.ground = function(){
        this.grounded = true;
    }

    this.contact = function(){
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].contact(this, i);
        };
/*
        for (var i = 0; i < coins.coinArray.length; i++) {
            coins.coinArray[i].contact(this,i)
        };*/

    }

    this.redraw = function() { 
        gl.bufferData(gl.ARRAY_BUFFER, flatten(jack.structure), gl.STATIC_DRAW); 
            gl.drawArrays( gl.TRIANGLES, 0, 3);
       
    }

    this.reverse = function() {
        this.turning = true;
        this.orientation *= -1;
        this.createStructure();
        this.contact();
        this.turning = false;
    }

    this.createStructure = function(){
        this.structure = [
            vec2(this.position.x, this.position.y),
            vec2(this.position.x, this.position.y+0.1),
            vec2(this.position.x + 0.1*this.orientation, this.position.y + 0.05)
            ]; 
    }
    this.createStructure();

    
} 