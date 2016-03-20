/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Jörðin (sem teningur!) snýst um sólina (stærri teningur!)
//
//    Hjálmtýr Hafsteinsson, febrúar 2016
/////////////////////////////////////////////////////////////////
var canvas;
var gl;


var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var separation = 1;
var alignment = 2;
var cohesion = 2;

var matrixLoc;
var vv = []

var fly = new bugGroup(10)

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
   ,13,14,16
   ,16,17,13
   ,13,15,17
   ,13,14,15, 
     18,19,23,22,18,20,21,19,21,25,23,25,24,22,24,20,18, 
     18,19,21,20

];

window.onload = function init(){
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
    for (var i = 0; i < body.length; i++) {
        vv.push(body[i])
    }
   
    for (var i = 0; i < leftTriangle.length; i++) {
        vv.push(leftTriangle[i])
    }

    for (var i = 0; i < rightTriangle.length; i++) {
        vv.push(rightTriangle[i])
    } 

    for (var i = 0; i < universe.length; i++) {
        vv.push(universe[i])
    }        


    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vv), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    proLoc = gl.getUniformLocation( program, "projection" );
    matrixLoc = gl.getUniformLocation( program, "rotation" );
    var proj = perspective( 90.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
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

    window.addEventListener("keydown", function(e){
               if (e.keyCode == 38 && zoom < -2) {
                    zoom += 0.2
               }             
               if (e.keyCode == 40 && zoom > -5) {
                    zoom -= 0.2
               }                            
            } );    

    document.getElementById("separation").value = separation;
    document.getElementById("alignment").value = alignment;
    document.getElementById("cohesion").value = cohesion;
    document.getElementById("separation").onchange = function(){
        separation = this.value;
    };    
    document.getElementById("alignment").onchange = function(){
        alignment = this.value;
    };
    document.getElementById("cohesion").onchange = function(){
        cohesion = this.value;
    };
    render();
}

flap = 0
stroke = -20

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform4fv(locrcolor, flatten(vec4(1,0,0)))

    ctm = mat4()
    ctm = rotate(ctm)   
    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));
    gl.drawElements(gl.LINE_LOOP, 16, gl.UNSIGNED_BYTE, 60 );



    fly.groupFly()
    requestAnimFrame( render );
}

