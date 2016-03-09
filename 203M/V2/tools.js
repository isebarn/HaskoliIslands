zoom = -3

function randomColor(){
    return vec4(
        Math.random(),
        Math.random(),
        Math.random()
        )
}

function rotate(tt){
    var mv = lookAt( vec3(0.0, 0, zoom), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

	return mult(mv,tt)
}	