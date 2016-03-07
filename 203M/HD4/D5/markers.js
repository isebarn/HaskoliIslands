function markermaker(){
	var markers = mat4();

    markers = mult( markers, scalem( 0.05, 0.05, 0.05 ) );

    markers = mult(  translate( 0.6, 0.0, 0.0 ), markers );

    markers = mult(  rotateX(spinX), markers );

    for (var i = 0; i < 12; i++) {
    	markers = mult(  rotateY(spinY), markers );
    	markers = mult(  rotateX(spinX), markers );
    	gl.uniformMatrix4fv(matrixLoc, false, flatten(markers));
    	gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 ); 
    	markers = mult(  rotateX(-spinX), markers );
    	markers = mult(  rotateY(-spinY), markers );
    	markers = mult(  rotateZ( 30), markers );    	
    }


	
}