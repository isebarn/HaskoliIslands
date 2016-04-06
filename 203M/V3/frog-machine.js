var canvas;
var gl;


var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;
var inside = -11.5

var camera = lookAt(vec3(0,0,inside), vec3(0,0,100), vec3(0,1,0)) 

var indiceTrack = [
    vec3(0,0,0)
]

var matrixLoc;
var vv = [
]

var indices = [
];

street = new lane([3,10,13,20,46,56,79,97])
river = new lane([21,45,68,78])

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


var werk = new world()
var groop = []
var loog = []
var caar = new car()
var tre = new tree()
var fregg = new frog()
var flies = new fly()

var well = new wall()
console.log(river.velocity.length)

for (var i = 0; i < street.velocity.length-3; i++) {
    groop.push(new group((Math.floor(Math.random()*5 + 1)),caar))
}

for (var i = 0; i < river.velocity.length; i++) {
    loog.push(new log(3, tre,i))
}
/*
for (var i = groop.length - 1; i >= 0; i--) {
    groop[i].create()
}*/

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
        fregg.y = -1

        fregg.up = false
        if (e.keyCode == 37) {
            fregg.x += 0.21
        }             
        if (e.keyCode == 38 ) {
            fregg.z += 0.21
            inside += 0.21
        }   
        if (e.keyCode == 39 ) {
            fregg.x += -0.21
        } 
        if (e.keyCode == 40 ) {
            fregg.z += -0.21
            inside += -0.21
        }                                                            
    } );       

   

    render();
}


function render()
{
    document.getElementById("lives").innerHTML = "Lives:" + fregg.lives
    document.getElementById("score").innerHTML = "Score:" + Math.ceil(fregg.score)
    document.getElementById("flies").innerHTML = "Flies:" + fregg.flies
    document.getElementById("highscore").innerHTML = "Highscore:" + fregg.highscore
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    camera = lookAt(vec3(0,0,inside), vec3(0,0,100), vec3(0,1,0)) 
    ctm = mat4()
    ctm = camera
    ctm = mult(ctm, rotateY(-spinY)) 
    ctm = mult(ctm, rotateX(spinX)) 
    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));


    
    well.draw()
    werk.draw()

    flies.draw(fregg)
    fregg.drawFrog()
    

    for (var i = groop.length - 1; i >= 0; i--) {
        groop[i].draw()
    }

    for (var i = loog.length - 1; i >= 0; i--) {
        loog[i].draw()
    }



    requestAnimFrame( render );
}

