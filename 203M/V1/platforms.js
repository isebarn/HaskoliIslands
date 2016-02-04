function platform(center, width, height,x,y, speed, moving) {
    this.position = new Object();
    this.position.x = center[0]
    this.position.y = center[1]
    this.moving = moving
    this.swing = new Object()
    this.swing.xStart = this.position.x
    this.swing.xEnd = x
    this.swing.yStart = this.position.y
    this.swing.yEnd = y
    this.speed = speed


    this.width = width;
    this.height = height;

    this.move = function(){
        this.construct()
        if (this.swing.xStart != this.swing.xEnd) {
            this.position.x += this.speed
        };

        if (this.swing.yStart != this.swing.yEnd) {
            this.position.y += this.speed
        };

        if (this.position.x.toFixed(2) == this.swing.xEnd.toFixed(2)) {
            this.speed *= -1
        };

        if (this.position.x.toFixed(2) == this.swing.xStart.toFixed(2)) {
            this.speed *= -1
        };

        if (this.position.y.toFixed(2) == this.swing.yEnd.toFixed(2)) {
            this.speed *= -1
        };

        if (this.position.y.toFixed(2) == this.swing.yStart.toFixed(2)) {
            this.speed *= -1
        };

        if (jack.passanger) {
            if (clampX(jack,this)) {
                jack.position.y = this.position.y
            };
        };
        //this.position.x += this.speed

    }

    this.contact = function(object,floor){
        if (object.falling) {
            if (clampX(object,this)) {
                if ((above(object,this))) {
                    if (this.position.y >= object.position.ground) {
                        object.position.ground = this.position.y
                        object.floor = floor
                        object.ground()
                    };
                };
            };
        };

        if (object.leaping) {
            if (clampX(object,this)) {
                if ((above(object,this)) && object.speedY <= 0.0) {
                    object.position.ground = this.position.y
                    object.floor = floor
                    
                };
            };

            //lines 32-40 are for solid walls
            if (object.level == 1) {
                object.front()
                if (clampX(object,this)) {
                    if (clampY(object,this) && !above(object,this)) {
                        object.crash()
                        object.fall()
                    };
                };
                object.back()            
            };

        };        

        if (object.running) {
            object.front()
            if (clampX(object,this) && !object.passanger) {
                if (object.level == 0 && clampY(object,this) && !above(object,this)) {
                    object.crash()
                };
                object.raise()
                if (object.level == 1 && clampY(object,this) && !above(object,this)) {
                    object.crash()
                };
                object.lower()
            };
            object.back()
        };

        if (object.landing) {
            object.raise()
            if (this.moving) {
                if (clampX(object,this)) {
                    if (above(object,this) && Math.abs(object.position.y - this.position.y) < 0.4) {
                        console.log(object.position.y - this.position.y)
                        object.ride()
                    };
                };
            };
            if (clampY(object,this) && !above(object,this)) {
                object.front()
                while (clampX(object,this)){
                    object.position.x -= object.orientation*0.01
                };
                object.back()
            };
            object.lower()
        };


    }

    this.construct = function() {
        this.structure = [
            vec2(this.position.x-this.width, this.position.y),
            vec2(this.position.x+this.width, this.position.y),
            vec2(this.position.x+this.width, this.position.y-this.height),
            vec2(this.position.x-this.width, this.position.y-this.height)
            ]
    }
    this.construct();
}