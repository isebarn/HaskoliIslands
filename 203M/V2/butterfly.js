function butterfly(){
    this.position = new Object()
    this.position.x = (Math.random()-0.5)*2
    this.position.y = (Math.random()-0.5)*2
    this.position.z = (Math.random()-0.5)*2

    this.bodyColor = randomColor()
    this.wingColor = randomColor()

    this.flap = Math.floor(Math.random()*30)
    this.stroke = Math.floor(Math.random()*3+1)
    this.size = 1

    this.initialSpeed = this.stroke/300
    this.speed = this.initialSpeed*(this.size)
    this.theta = Math.floor(Math.random()*90)
    this.phi =  Math.floor(Math.random()*180)

    this.close = false

    this.boundaryCheck = function(){
        if(Math.abs(this.position.x) > 1){
            this.position.x *= -0.95
        }
        if(Math.abs(this.position.y) > 1){
            this.position.y *= -0.95
        }
        if(Math.abs(this.position.z) > 1){
            this.position.z *= -0.95
        } 
    }

    this.setDirection = function(){
        this.phi += (Math.random()-0.5)*3
        this.theta += (Math.random()-0.5)*3
    }

    this.setPosition = function(){
        this.position.x += this.speed*Math.sin(radians(this.theta))*Math.cos(radians(this.phi))
        this.position.y += this.speed*Math.sin(radians(this.theta))*Math.sin(radians(this.phi))
        this.position.z += this.speed*Math.cos(radians(this.theta)) 
        this.size = 1.2 + this.position.z
        this.speed = this.initialSpeed*this.size
    }

    this.setBody = function(){
        var ctm = mat4();
        if (this.close) {
            gl.uniform4fv(locrcolor, flatten(vec4(1,0,0)))
        }
        else{
            gl.uniform4fv(locrcolor, flatten(this.bodyColor))
        }
        ctm = mult(scalem(this.size,this.size,this.size), ctm)
        ctm = mult(  rotateY(spinY+this.theta),ctm );
        ctm = mult(  rotateX(spinX),ctm );

        ctm = mult(rotateZ(-this.phi),ctm)
        ctm = mult( translate(this.position.x, this.position.y, this.position.z), ctm)  
        return ctm      
    }

    this.setLeftWing = function(){
        var ctm = mat4();
        if (this.close) {
            gl.uniform4fv(locrcolor, flatten(vec4(1,0,0)))
        }
        else{
            gl.uniform4fv(locrcolor, flatten(this.wingColor))
        }
        ctm = mult(scalem(this.size,this.size,this.size), ctm)
        ctm = mult( rotateZ(this.flap),ctm)
        ctm = mult(translate(0.02,0.0,0.0), ctm);
        ctm = mult(  rotateY(spinY+this.theta),ctm );
        ctm = mult(  rotateX(spinX),ctm );

        ctm = mult(rotateZ(-this.phi),ctm)
        ctm = mult( translate(this.position.x, this.position.y, this.position.z), ctm)  
        
        return ctm      
    }

    this.setRightWing = function(){
        var ctm = mat4();
        if (this.close) {
            gl.uniform4fv(locrcolor, flatten(vec4(1,0,0)))
        }
        else{
            gl.uniform4fv(locrcolor, flatten(this.wingColor))
        }
            
        ctm = mult(scalem(this.size,this.size,this.size), ctm)
        ctm = mult( rotateZ(-this.flap),ctm)
        ctm = mult(translate(-0.02,0.0,0.0), ctm);
        ctm = mult(  rotateY(spinY+this.theta),ctm );
        ctm = mult(  rotateX(spinX),ctm );

        ctm = mult(rotateZ(-this.phi),ctm)
        ctm = mult( translate(this.position.x, this.position.y, this.position.z), ctm)

        return ctm        
    }

    this.flapWings = function(){
        this.flap += this.stroke
        if (Math.abs(this.flap) > 30) {
            this.stroke *= -1
        }
    }

    this.fly = function(){

        gl.uniformMatrix4fv(matrixLoc, false, flatten(this.setBody()));
        gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0 );

        gl.uniformMatrix4fv(matrixLoc, false, flatten(this.setLeftWing()));
        gl.drawElements( gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, 36);

        gl.uniformMatrix4fv(matrixLoc, false, flatten(this.setRightWing()));
        gl.drawElements( gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, 48);
        
        this.boundaryCheck()
        this.setDirection()
        this.setPosition()
        this.flapWings()
    }
}