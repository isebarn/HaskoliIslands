/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Teningur sem hægt er að snúa með músinni og færa til með
//     upp- og niður-örvum (eða músarhjóli).  Notar lookAt og
//     perspective föll
//
//    Hjálmtýr Hafsteinsson, febrúar 2016
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -4.0;

var proLoc;
var mvLoc;

var pos = vec3()
var vel = vec3()
vel[0] = 0.01

var lengd = length(vel)

for (var i = vel.length - 1; i >= 0; i--) {
    vel[i] *= 0.01/lengd
}

var count = 0

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

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
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
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
             zDist += 0.1;
         } else {
             zDist -= 0.1;
         }
     }  );  

    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d) 
{
    var vertices = [
        vec3( -0.1, -0.1,  0.5 ),
        vec3( -0.1,  0.1,  0.5 ),
        vec3(  0.1,  0.1,  0.5 ),
        vec3(  0.1, -0.1,  0.5 ),
        vec3( -0.1, -0.1, -0.5 ),
        vec3( -0.1,  0.1, -0.5 ),
        vec3(  0.1,  0.1, -0.5 ),
        vec3(  0.1, -0.1, -0.5 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // black
        [ 0.0, 1.0, 0.0, 1.0 ],  // black
        [ 0.0, 0.0, 1.0, 1.0 ],  // black
        [ 1.0, 1.0, 0.0, 1.0 ],  // black
        [ 0.0, 1.0, 1.0, 1.0 ],  // black1
        [ 1.0, 0.0, 1.0, 1.0 ],  // black
        [ 1.0, 1.0, 1.0, 1.0 ],  // black

    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        colors.push(vertexColors[a]);
        
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var proj = perspective( 90.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    
    var tmp = vec3()
    for (var i = tmp.length - 2; i >= 0; i--) {
        tmp[i] += (Math.random() - 0.5)
    }

    tmp = normalize(tmp,true)

    for (var i = tmp.length - 2; i >= 0; i--) {
        tmp[i] *= 0.001
    }

    //vel = add(vel,tmp)
    vel[1] += (Math.random() - 0.5)*0.0002
    pos = add(pos,vel)

    var theta = Math.atan(vel[1]/vel[0])* 180 / Math.PI
    var phi = Math.acos(vel[2]/length(vel)) * 180 / Math.PI
    if (count == 100) {
        console.log(theta)
        count = 0
    }
    count += 1
    if (length(pos) > 3) {
        for (var i = pos.length - 1; i >= 0; i--) {
            pos[i] *= -0.9
        }
    }

    var ctm = lookAt( vec3(0.0, 0.0, -3 + pos[2]), vec3(pos), vec3(0.0, 1.0, 0.0) );
    ctm = mult( ctm, rotate( parseFloat(spinX), [1, 0, 0] ) );
    ctm = mult( ctm, rotate( parseFloat(spinY), [0, 1, 0] ) );
    ctm = mult(ctm, rotateZ(-theta))
    ctm = mult(ctm, rotateY(phi))
    
    gl.uniformMatrix4fv(mvLoc, false, flatten(ctm));

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}

