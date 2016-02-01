function platform(center, width, height) {
    this.position = new Object();
    this.position.x = center[0]
    this.position.y = center[1]


    this.width = width;
    this.height = height;

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
            if (clampX(object,this)) {
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
        /*if (object.running) {
            object.front()
            if (clampX(object,this)) {
                if (locationDifferenceY(object,this,0.1)) {
                    object.crash()
                };
            };
            object.back()
        };*/


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