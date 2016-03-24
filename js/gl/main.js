var canvas;
var gl;

var modelprop_Center=[0,0,0];

var modelprop_Radius=10;

var cubeVerticesBuffer;
var cubeVerticesColorBuffer;
var cubeVerticesIndexBuffer;


//This is a collection of all of the current meshes
var MeshCollection = [];

//Grid Variables
var GridMesh = new Mesh();

//var cubeVerticesIndexBuffer;
var numOfElements = 0;
var cubeRotationX = 45;
var cubeRotationY = 30;

var lastCubeUpdateTime = 0;

var Zoom = -100;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var perspectiveMatrix;
var elmntID;

//
// start
//
// Called when the canvas is created to get the ball rolling.
//
function start(elementID) {
  elmntID = elementID;
  canvas = document.getElementById(elmntID);

  log("Initializing WebGL");
  initWebGL(canvas);      // Initialize the GL context
  
  // Only continue if WebGL is available and working
  
  if (gl) {
    gl.clearColor(0.20, 0.20, 0.20, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
	
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    
    
  log("Setting Up Event Listerners");
    //var myimage = document.getElementById(elmntID);
    if (canvas.addEventListener) {
	    // IE9, Chrome, Safari, Opera
	    canvas.addEventListener("mousewheel", MouseWheelHandler, false);
	    // Firefox
	    canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    // IE 6/7/8
    else canvas.attachEvent("onmousewheel", MouseWheelHandler);
	
    // Initialize the shaders; this is where all the lighting for the
    // vertices and so forth is established.
    
  log("Initializing Shaders");
    initShaders();
    
    // Here's where we call the routine that builds all the objects
    // we'll be drawing.
    
  log("Initializing Buffers");
    initBuffers();
	
    // Set up to draw the scene periodically.
    
    setInterval(drawScene, 15);
  }
}

function loadTeapot() {
    var request = new XMLHttpRequest();
    //request.open("GET", "images/cubetexture.png");
    request.open("GET", "images/test.txt");
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        alert(request.responseText);
      }
    };
    request.send();
  }
  
  function initTextures() {
  cubeTexture = gl.createTexture();
  cubeImage = new Image();
  cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
  cubeImage.src = "images/cubetexture.png";
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

//
// initWebGL
//
// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
//
function initWebGL() {
  gl = null;
  
  try {
    gl = canvas.getContext("experimental-webgl", {antialias: true});
  }
  catch(e) {
  }
  
  // If we don't have a GL context, give up now
  
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional cube.
//
function initBuffers() {
  
  var gridSize = 100;

  numOfElements = 0;
  var temp_Normal = [0,0,0];
  //var temp_colour = [ 0.25, 0.25, 0.25, 1];  
  var temp_colour = [ 0.825, 0.825, 0.825, 1];     
  var count = 0;
  /* Load In Vertex and Colour Data */
  for(var i = -gridSize; i < gridSize+1; i+=10)
  {
    // First Point is (i, 0, -gridSize)
         GridMesh.vertices.push(i);
         GridMesh.vertices.push(0);
         GridMesh.vertices.push(-gridSize); 
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         
         GridMesh.vertices.push(i);
         GridMesh.vertices.push(0);
         GridMesh.vertices.push(gridSize); 
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         
         GridMesh.vertices.push(-gridSize); 
         GridMesh.vertices.push(0);
         GridMesh.vertices.push(i);
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         GridMesh.vertices.push(gridSize); 
         GridMesh.vertices.push(0);
         GridMesh.vertices.push(i);
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
        }
        
        GridMesh.InitialiseBuffers();
        GridMesh.meshType = MeshType.Lines;
}



 var mouseDown = false;
  var lastMouseX = null;
  var lastMouseY = null;

  function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  function handleMouseUp(event) {
    mouseDown = false;
    //log("set Rotation ("+ cubeRotationX + ", "+ cubeRotationY+")");
  }

  function handleMouseMove(event) {
    if (!mouseDown) {
      return;
    }
    var newX = event.clientX;
    var newY = event.clientY;

	cubeRotationX += newX - lastMouseX;
	cubeRotationY += newY - lastMouseY;

    lastMouseX = newX;
    lastMouseY = newY;
  }
  
  function ResetRotation() {
    cubeRotationY = 0;
    cubeRotationX = 0;
  }
  
  function MouseWheelHandler(e) {

	// cross-browser wheel delta
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	Zoom -= delta * (Zoom/10);
  //log("Set Zoom: " + Zoom);
	return false;
}

function drawGrid() {
  
  GridMesh.Draw();
  
}
  
//
// drawScene
//
// Draw the scene.
//
function drawScene() {
  // Clear the canvas before we start drawing on it.
/*
log('X:'+cubeRotationX);
log('Y:'+cubeRotationY);
log('z:'+Zoom);
  */
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Set the viewport to match
  gl.viewport(0, 0, canvas.width, canvas.height);
  
  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  
  perspectiveMatrix = makePerspective(45, canvas.width/canvas.height, 0.1, 10000.0);
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  
  loadIdentity();
  
  // Now move the drawing position a bit to where we want to start
  // drawing the cube.
  
  mvTranslate([-0.0, 0.0, Zoom]);
  
  // Save the current matrix, then rotate before we draw.
  
  mvPushMatrix();
  mvRotate(cubeRotationY, [1, 0, 0]);
  mvRotate(cubeRotationX, [0, 1, 0]);
  
  //Next Center the scene around the model
  mvTranslate(modelprop_Center);
  
  drawGrid();
  
  
  //New elegent Drawing code
  for(var i = 0; i < MeshCollection.length; i++)
  {
    MeshCollection[i].Draw();
  }
  
  //Old Drawing Code Supported by some importers stil
  if(numOfElements> 0)
  {
  // Draw the cube by binding the array buffer to the cube's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  
  
    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, numOfElements, gl.UNSIGNED_SHORT, 0);
  
  // Restore the original matrix
  }
  
  //New elegent Drawing code
  for(var i = 0; i < MeshCollection.length; i++)
  {
    MeshCollection[i].Draw();
  }
  
  mvPopMatrix();
}

//
// initShaders
//
// Initialize the shaders, so WebGL knows how to light our scene.
//
function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");
  
  // Create the shader program
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  // If creating the shader program failed, alert
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  
  gl.useProgram(shaderProgram);
  
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  
  vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);
  
  vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
  gl.enableVertexAttribArray(vertexColorAttribute);
}


//
// getShader
//
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  
  // Didn't find an element with the specified ID; abort.
  
  if (!shaderScript) {
    return null;
  }
  
  // Walk through the source element's children, building the
  // shader source string.
  
  var theSource = "";
  var currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }
  
  // Now figure out what type of shader script we have,
  // based on its MIME type.
  
  var shader;
  
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }
  
  // Send the source to the shader object
  
  gl.shaderSource(shader, theSource);
  
  // Compile the shader program
  
  gl.compileShader(shader);
  
  // See if it compiled successfully
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
}

//
// Matrix utility functions
//

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}


function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  
  var normalMatrix = mvMatrix.inverse();
  normalMatrix = normalMatrix.transpose();
  var nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
}


var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  
  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;
  
  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}