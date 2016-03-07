/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Jörðin (sem teningur!) snýst um sólina (stærri teningur!)
//
//    Hjálmtýr Hafsteinsson, febrúar 2016
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var numVertices  = 36;

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var flap = 0;
var stroke = -2
var matrixLoc;


//LITIR
var red = vec4(1, 0, 0);
var blue = vec4(0, 0, 1);


// the 8 vertices of the cube
var vertices = [
    vec3( -0.1, -0.1,  0.1 ),
    vec3( -0.1,  0.1,  0.1 ),
    vec3(  0.1,  0.1,  0.1 ),
    vec3(  0.1, -0.1,  0.1 ),
    vec3( -0.1, -0.1, -0.1 ),
    vec3( -0.1,  0.1, -0.1 ),
    vec3(  0.1,  0.1, -0.1 ),
    vec3(  0.1, -0.1, -0.1 )
];

var vertices2 = [
    vec3( 0, 0,  0 ), // 8
    vec3(0.1,0.001,-0.1), // 9
    vec3(0.1,-0.001,-0.1), // 10
    vec3(0.1,0.001,0.1), // 11
    vec3(0.1,-0.001,0.1), // 12
];

var vertices3 = [
    vec3( 0, 0,  0 ), // 8
    vec3(-0.1,0.001,-0.1), // 9
    vec3(-0.1,-0.001,-0.1), // 10
    vec3(-0.1,0.001,0.1), // 11
    vec3(-0.1,-0.001,0.1), // 12
];

var vv = []

var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 1.0, 1.0 )   // white
];

// indices of the 12 triangles that compise the cube
var indices = [
   1,0,3,
   3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5,
    8,9,11,
    11,12,8,
    8,10,12,
    8,9,10
   ,13   ,14   ,16
   ,16   ,17   ,13
   ,13   ,15   ,17
   ,13   ,14   ,15   
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // array element buffer
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // color array attribute buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    /*var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );*/
    locrcolor = gl.getUniformLocation(program, "rcolor")
    vv = []
    for (var i = 0; i < vertices.length; i++) {
        vv.push(vertices[i])
    }
    for (var i = 0; i < vertices2.length; i++) {
        vv.push(vertices2[i])
    }    
    for (var i = 0; i < vertices3.length; i++) {
        vv.push(vertices3[i])
    }  

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vv), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    matrixLoc = gl.getUniformLocation( program, "rotation" );

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (e.offsetX - origX) ) % 360;
            spinX = ( spinX + (e.offsetY - origY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );

    render();
}



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var ctm = mat4();
    gl.uniform4fv(locrcolor, flatten(red))

    ctm = mult(scalem(0.2,0.2,1.0), ctm)
    ctm = mult(  rotateY(spinY),ctm );
    ctm = mult(  rotateX(spinX),ctm );

    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
    gl.drawElements( gl.TRIANGLES, indices.length-24, gl.UNSIGNED_BYTE, 0 );

    var ctm = mat4();
    gl.uniform4fv(locrcolor, flatten(blue))
    ctm = mult( rotateZ(flap),ctm)
    ctm = mult(translate(0.03,0.0,0.0), ctm);
    ctm = mult(  rotateY(spinY),ctm );
    ctm = mult(  rotateX(spinX),ctm );
    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
    gl.drawElements( gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, indices.length-24);
    
    var ctm = mat4();
    gl.uniform4fv(locrcolor, flatten(blue))
    ctm = mult( rotateZ(-flap),ctm)
    ctm = mult(translate(-0.03,0.0,0.0), ctm);
    ctm = mult(  rotateY(spinY),ctm );
    ctm = mult(  rotateX(spinX),ctm );
    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
    gl.drawElements( gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, indices.length-12);

    flap += stroke
    if (Math.abs(flap) == 30) {
        stroke *= -1
    }

    requestAnimFrame( render );
}

