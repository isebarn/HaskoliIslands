/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Einföld útgáfa af mynsturvörpun.  Tvívítt spjald
//     skilgreint og varpað á það mynd sem er lesin inn.
//     Hægt að snúa spjaldinu og færa til.
//
//    Hjálmtýr Hafsteinsson, mars 2016
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var numVertices  = 6;

var program;

var pointsArray = [];
var colorsArray = [];
var texCoordsArray = [];

var texture;

var movement = false;
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = 5.0;

var proLoc;
var mvLoc;

// Tveir þríhyrningar sem mynda spjald í z=0 planinu
var vertices = [
    vec4( -1.0, -1.0, 0.0, 1.0 ),
    vec4(  4.0, -1.0, 0.0, 1.0 ),
    vec4(  4.0,  1.0, 0.0, 1.0 ),
    vec4(  4.0,  1.0, 0.0, 1.0 ),
    vec4( -1.0,  1.0, 0.0, 1.0 ),
    vec4( -1.0, -1.0, 0.0, 1.0 ),
    
    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(0.5,-0.5,-0.5, 1.0 ),
    vec4(0.5,0.5,-0.5, 1.0 ),
    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(-0.5,0.5,-0.5, 1.0 ),
    vec4(0.5,0.5,-0.5, 1.0 ),

    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(-0.5,-0.5,0.5, 1.0 ),
    vec4(-0.5,0.5,0.5, 1.0 ),
    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(-0.5,0.5,-0.5, 1.0 ),
    vec4(-0.5,0.5,0.5, 1.0 ),

    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(0.5,-0.5,-0.5, 1.0 ),
    vec4(0.5,-0.5,0.5, 1.0 ),
    vec4(-0.5,-0.5,-0.5, 1.0 ),
    vec4(-0.5,-0.5,0.5, 1.0 ),
    vec4(0.5,-0.5,0.5, 1.0 ),
  
    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(-0.5,0.5,0.5, 1.0 ),
    vec4(-0.5,-0.5,0.5, 1.0 ),
    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(0.5,-0.5,0.5, 1.0 ),
    vec4(-0.5,-0.5,0.5, 1.0 ),

    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(0.5,0.5,-0.5, 1.0 ),
    vec4(0.5,-0.5,-0.5, 1.0 ),
    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(0.5,-0.5,0.5, 1.0 ),
    vec4(0.5,-0.5,-0.5, 1.0 ),
    
    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(-0.5,0.5,0.5, 1.0 ),
    vec4(-0.5,0.5,-0.5, 1.0 ),
    vec4(0.5,0.5,0.5, 1.0 ),
    vec4(0.5,0.5,-0.5, 1.0 ),
    vec4(-0.5,0.5,-0.5, 1.0 ),   
];

// Mynsturhnit fyrir spjaldið
var texCoords = [
    vec2( 0.0, 0.0 ),
    vec2( 1.0, 0.0 ),
    vec2( 1.0, 0.5 ),
    vec2( 1.0, 0.5 ),
    vec2( 0.0, 0.5 ),
    vec2( 0.0, 0.0 ),


    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),

    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),

    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),

    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),

    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),

    vec2( 0.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 1.0, 1.0 ),
    vec2( 0.0, 1.0 ),
    vec2( 0.0, 1.0 ),



];


function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );


    var image = document.getElementById("texImage");
    configureTexture( image );


    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.clientX;
        origY = e.clientY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
              spinY = ( spinY + (origX - e.clientX) ) % 360;
            spinX = ( spinX + (origY - e.clientY) ) % 360;
            origX = e.clientX;
            origY = e.clientY;
        }
    } );
    
    // Event listener for keyboard
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 38:    // upp ör
                zDist += 0.1;
                break;
            case 40:    // niður ör
                zDist -= 0.1;
                break;
         }
     }  );  

    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zDist += 0.2;
         } else {
             zDist -= 0.2;
         }
     }  );  
       
    render();
 
}

var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var save = []

    // staðsetja áhorfanda og meðhöndla músarhreyfingu
    var mv = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX( spinX ) );
    mv = mult( mv, rotateY( spinY ) );
    save.push(mv)
    mv = mult(mv, scalem(0.3,0.3,1))
    mv = mult(mv,translate(1.2,3.7,0))
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, 6 );

    mv = save.pop()
    mv = mult(mv, scalem(0.04,3,0.04))
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 6, 36 );    





    requestAnimFrame(render);
}
