var canvas;
var gl;

//var textCanvas;
//var ctx;

var modelprop_Center=[0,0,0];

var modelprop_Radius=1;

vxRenderState = {
    ShadedEdge : 0,
    Shaded : 1,
    Wireframe : 2
}

var RenderState = vxRenderState.ShadedEdge;
//var cubeVerticesBuffer;
//var cubeVerticesColorBuffer;
//var cubeVerticesIndexBuffer;

//The Selection Index
var HoverIndex = 0;

//This is a collection of all of the current meshes
var MeshCollection = [];

//This is a collection of all of the current meshes
var SelectedMeshCollection = [];

//Grid Variables
var GridMesh = new vxMesh();
var XAxisMesh = new vxMesh();
var YAxisMesh = new vxMesh();
var ZAxisMesh = new vxMesh();
var HoveredMesh = new vxMesh();

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
var vertexSelColorAttribute;
var hasTextureAttribute;
var perspectiveMatrix;
var elmntID;

var MouseState = {
  x: 0,
  y: 0,
  LeftButtonDown : false,
  MiddleButtonDown : false,
  RightButtonDown : false
};

var KeyboardState = {
  Shift: false,
};


//
// start
//
// Called when the canvas is created to get the ball rolling.
//
function start(elementID) {
  elmntID = elementID;
  canvas = document.getElementById(elmntID);
  // look up the text canvas.
 //textCanvas = document.getElementById("text");
 
// make a 2D context for it
 //ctx = textCanvas.getContext("2d");

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
    canvas.onmousemove = handleMouseMove;
    
    
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
  
  var gridSize = 250;

          var vert = new vxVertex3D(1,2,3);
          console.log(vert.X);

  numOfElements = 0;
  var temp_Normal = [0,0,0];
  //var temp_colour = [ 0.25, 0.25, 0.25, 1];  
  var temp_colour = [ 0.825, 0.825, 0.825, 1];     
  var count = 0;
  /* Load In Vertex and Colour Data */
  for(var i = -gridSize; i < gridSize+1; i+=5)
  {
    if(i%20 == 0)
      temp_colour = [ 1, 1, 1, 1];   
    else
      temp_colour = [ 0.7, 0.7, 0.7, 1];   
    // First Point is (i, 0, -gridSize)
         GridMesh.mesh_vertices.push(i);
         GridMesh.mesh_vertices.push(0);
         GridMesh.mesh_vertices.push(-gridSize); 
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         
         GridMesh.mesh_vertices.push(i);
         GridMesh.mesh_vertices.push(0);
         GridMesh.mesh_vertices.push(gridSize); 
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         
         GridMesh.mesh_vertices.push(-gridSize); 
         GridMesh.mesh_vertices.push(0);
         GridMesh.mesh_vertices.push(i);
         
         GridMesh.vert_noramls.push(temp_Normal[0]);
         GridMesh.vert_noramls.push(temp_Normal[1]);
         GridMesh.vert_noramls.push(temp_Normal[2]);
         
         GridMesh.vert_colours.push(temp_colour[0]);
         GridMesh.vert_colours.push(temp_colour[1]);
         GridMesh.vert_colours.push(temp_colour[2]);
         GridMesh.vert_colours.push(temp_colour[3]);
         
         GridMesh.Indices.push(count);
         count++;
         
         
         
         GridMesh.mesh_vertices.push(gridSize); 
         GridMesh.mesh_vertices.push(0);
         GridMesh.mesh_vertices.push(i);
         
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



// The X Axis
  var xcolour = [1, 0, 0, 1]; 
        XAxisMesh.mesh_vertices.push(0);
         XAxisMesh.mesh_vertices.push(0);
         XAxisMesh.mesh_vertices.push(0); 
         
         XAxisMesh.vert_noramls.push(0);
         XAxisMesh.vert_noramls.push(1);
         XAxisMesh.vert_noramls.push(0);
         
         XAxisMesh.vert_colours.push(xcolour[0]);
         XAxisMesh.vert_colours.push(xcolour[1]);
         XAxisMesh.vert_colours.push(xcolour[2]);
         XAxisMesh.vert_colours.push(xcolour[3]);
         
         XAxisMesh.Indices.push(0);

         XAxisMesh.mesh_vertices.push(10);
         XAxisMesh.mesh_vertices.push(0);
         XAxisMesh.mesh_vertices.push(0); 
         
         XAxisMesh.vert_noramls.push(0);
         XAxisMesh.vert_noramls.push(1);
         XAxisMesh.vert_noramls.push(0);
         
         XAxisMesh.vert_colours.push(xcolour[0]);
         XAxisMesh.vert_colours.push(xcolour[1]);
         XAxisMesh.vert_colours.push(xcolour[2]);
         XAxisMesh.vert_colours.push(xcolour[3]);
         
         XAxisMesh.Indices.push(1);
        XAxisMesh.InitialiseBuffers();
        XAxisMesh.meshType = MeshType.Lines;
         

// The Y Axis
  var ycolour = [0, 1, 0, 1]; 
        YAxisMesh.mesh_vertices.push(0);
         YAxisMesh.mesh_vertices.push(0);
         YAxisMesh.mesh_vertices.push(0); 
         
         YAxisMesh.vert_noramls.push(0);
         YAxisMesh.vert_noramls.push(1);
         YAxisMesh.vert_noramls.push(0);
         
         YAxisMesh.vert_colours.push(ycolour[0]);
         YAxisMesh.vert_colours.push(ycolour[1]);
         YAxisMesh.vert_colours.push(ycolour[2]);
         YAxisMesh.vert_colours.push(ycolour[3]);
         
         YAxisMesh.Indices.push(0);

         YAxisMesh.mesh_vertices.push(0);
         YAxisMesh.mesh_vertices.push(10);
         YAxisMesh.mesh_vertices.push(0); 
         
         YAxisMesh.vert_noramls.push(0);
         YAxisMesh.vert_noramls.push(1);
         YAxisMesh.vert_noramls.push(0);
         
         YAxisMesh.vert_colours.push(ycolour[0]);
         YAxisMesh.vert_colours.push(ycolour[1]);
         YAxisMesh.vert_colours.push(ycolour[2]);
         YAxisMesh.vert_colours.push(ycolour[3]);
         
         YAxisMesh.Indices.push(1);
        YAxisMesh.InitialiseBuffers();
        YAxisMesh.meshType = MeshType.Lines;


// The Z Axis
  var zcolour = [0.25, 0.5, 1, 1]; 
        ZAxisMesh.mesh_vertices.push(0);
         ZAxisMesh.mesh_vertices.push(0);
         ZAxisMesh.mesh_vertices.push(0); 
         
         ZAxisMesh.vert_noramls.push(0);
         ZAxisMesh.vert_noramls.push(1);
         ZAxisMesh.vert_noramls.push(0);
         
         ZAxisMesh.vert_colours.push(zcolour[0]);
         ZAxisMesh.vert_colours.push(zcolour[1]);
         ZAxisMesh.vert_colours.push(zcolour[2]);
         ZAxisMesh.vert_colours.push(zcolour[3]);
         
         ZAxisMesh.Indices.push(0);

         ZAxisMesh.mesh_vertices.push(0);
         ZAxisMesh.mesh_vertices.push(0);
         ZAxisMesh.mesh_vertices.push(10); 
         
         ZAxisMesh.vert_noramls.push(0);
         ZAxisMesh.vert_noramls.push(1);
         ZAxisMesh.vert_noramls.push(0);
         
         ZAxisMesh.vert_colours.push(zcolour[0]);
         ZAxisMesh.vert_colours.push(zcolour[1]);
         ZAxisMesh.vert_colours.push(zcolour[2]);
         ZAxisMesh.vert_colours.push(zcolour[3]);
         
         ZAxisMesh.Indices.push(1);
        ZAxisMesh.InitialiseBuffers();
        ZAxisMesh.meshType = MeshType.Lines;
        



  var sel_colour = [ 0.1, 0.6, 1, 1];  
        for(var i = 0; i < 3; i++)
        {
          HoveredMesh.mesh_vertices.push(0); 
          HoveredMesh.mesh_vertices.push(0);
          HoveredMesh.mesh_vertices.push(0);
        
          HoveredMesh.vert_noramls.push(0);
          HoveredMesh.vert_noramls.push(1);
          HoveredMesh.vert_noramls.push(0);
        
          HoveredMesh.vert_colours.push(sel_colour[0]);
          HoveredMesh.vert_colours.push(sel_colour[1]);
          HoveredMesh.vert_colours.push(sel_colour[2]);
          HoveredMesh.vert_colours.push(sel_colour[3]);

          HoveredMesh.Indices.push(i);
        }

        HoveredMesh.InitialiseBuffers();
}



 var mouseDown = false;
  var lastMouseX = null;
  var lastMouseY = null;

  function LeftMouseClickEvent() {

    //Only clear the Selected Mesh Collection if the Shift key is up
    if(KeyboardState.Shift == false)
      SelectedMeshCollection.length = 0;

      if(HoverIndex > 0){
        var newMesh = new vxMesh();
        
var ind = 0;
        var sel_colour = [ 0.1, 1, 0.6, 1];  
        for(var i = 0; i < 9; i+=3)
        {
          newMesh.mesh_vertices.push(HoveredMesh.mesh_vertices[i]); 
          newMesh.mesh_vertices.push(HoveredMesh.mesh_vertices[i+1]);
          newMesh.mesh_vertices.push(HoveredMesh.mesh_vertices[i+2]);
        
          newMesh.vert_noramls.push(0);
          newMesh.vert_noramls.push(1);
          newMesh.vert_noramls.push(0);
        
          newMesh.vert_colours.push(sel_colour[0]);
          newMesh.vert_colours.push(sel_colour[1]);
          newMesh.vert_colours.push(sel_colour[2]);
          newMesh.vert_colours.push(sel_colour[3]);

          newMesh.Indices.push(ind);
          ind++;
        }

        newMesh.InitialiseBuffers();

      SelectedMeshCollection.push(newMesh);

      var rows = [
  {"name":"Mesh Name","value":MeshCollection[0].Name,"group":"Mesh Settings","editor":"text"},
  {"name":"Faces","value":MeshCollection[0].Indices.length/3,"group":"Mesh Settings","editor":"text"},
  {"name":"mesh_vertices","value":MeshCollection[0].mesh_vertices.length/3,"group":"Mesh Settings","editor":"text"},

  {"name":"Name","value":"face"+HoverIndex,"group":"Selected Face","editor":"text"},
  {"name":"Normal","value": "("+newMesh.vert_noramls[0] + "," + newMesh.vert_noramls[1] +"," + newMesh.vert_noramls[2]+")","group":"Selected Face","editor":"text"},
  {"name":"mesh_vertices 1","value": "("+newMesh.mesh_vertices[0] + "," + newMesh.mesh_vertices[1] +"," + newMesh.mesh_vertices[2]+")","group":"Selected Face","editor":"text"},
  {"name":"mesh_vertices 2","value": "("+newMesh.mesh_vertices[3] + "," + newMesh.mesh_vertices[4] +"," + newMesh.mesh_vertices[5]+")","group":"Selected Face","editor":"text"},
  {"name":"mesh_vertices 3","value": "("+newMesh.mesh_vertices[6] + "," + newMesh.mesh_vertices[7] +"," + newMesh.mesh_vertices[8]+")","group":"Selected Face","editor":"text"},

];
$("#pg").propertygrid('loadData',rows);
    }
  }


  function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    // Get's the Mouse State
    switch(event.button)
    {
      case 0:
        MouseState.LeftButtonDown = true;
        LeftMouseClickEvent();
      break;
      case 1:
        MouseState.MiddleButtonDown = true;
      break;
      case 2:
        MouseState.RightButtonDown = true;
      break;
    }
  }

  function handleMouseUp(event) {
    mouseDown = false;
    
    // Get's the Mouse State
    switch(event.button)
    {
      case 0:
        MouseState.LeftButtonDown = false;
      break;
      case 1:
        MouseState.MiddleButtonDown = false;
      break;
      case 2:
        MouseState.RightButtonDown = false;
      break;
    }
  }

  function handleMouseMove(event) {
    var rect = canvas.getBoundingClientRect();

    MouseState.x = event.clientX - rect.left;
    MouseState.y = event.clientY - rect.top;    

    if (!mouseDown) {
      return;
    }

    if(MouseState.MiddleButtonDown)
    {
    var newX = event.clientX;
    var newY = event.clientY;

	   cubeRotationX += newX - lastMouseX;
    	cubeRotationY += newY - lastMouseY;

    lastMouseX = newX;
    lastMouseY = newY;
    }
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
  gl.clearColor(0,0,0,1) // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
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
  mvRotate(cubeRotationY, [1, 0, 0]);
  mvRotate(cubeRotationX, [0, 1, 0]);
  //Next Center the scene around the model
  mvTranslate(modelprop_Center);
  
  // Save the current matrix, then rotate before we draw.
  
  mvPushMatrix();
  
  
// Draw Mesh with Encoded Index Colour for Selection
//***************************************************************************************
  gl.uniform1i(hasTextureAttribute, 0);

    for(var i = 0; i < MeshCollection.length; i++)
  {
    MeshCollection[i].DrawSelPreProc();
  }

// Get Selection Information
//***************************************************************************************
var pixels = new Uint8Array(4);
gl.readPixels(MouseState.x,gl.drawingBufferHeight - MouseState.y, 1,1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

HoverIndex = 0;
HoverIndex = pixels[0] + pixels[1] * 255 + pixels[2] * 255 * 255;

//console.log(HoverIndex); 

  gl.clearColor(0.20, 0.20, 0.20, 1.0);  // Clear to black, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniform1i(hasTextureAttribute, 1);
  drawGrid();
  
if(RenderState != vxRenderState.Wireframe)
{
  //New elegent Drawing code
  for(var i = 0; i < MeshCollection.length; i++)
  {
      MeshCollection[i].Draw();
    /*
    if(RenderState != vxRenderState.Wireframe)
    {
      MeshCollection[i].Draw();
    }
    else
    {   MeshCollection[i].DrawWireframe();
    }
    */
  }
}



 // Only find index is selection is greater than 0
 if(HoverIndex > 0)
 {
    //Now Finally Draw the Face
  for(var i = 0; i < 9; i++)
    HoveredMesh.mesh_vertices[i] = MeshCollection[0].mesh_vertices[(HoverIndex - 1) * 9 + i];

    HoveredMesh.InitialiseBuffers();
  }
  else
  {
      for(var i = 0; i < 9; i++)
    HoveredMesh.mesh_vertices[i] = 0;

    HoveredMesh.InitialiseBuffers();
  }

HoveredMesh.Draw();





//Last thing to draw is the Selection

  for(var i = 0; i < SelectedMeshCollection.length; i++)
  {
    SelectedMeshCollection[i].Draw();
  }


  gl.uniform1i(hasTextureAttribute, 2);

// Only Draw Edges if the Shaded Edge Settings is set

   //New elegent Drawing code
  for(var i = 0; i < MeshCollection.length; i++)
  {
    if(RenderState == vxRenderState.ShadedEdge)
    {
      MeshCollection[i].DrawEdge();
    }
    if(RenderState == vxRenderState.Wireframe)
    {
      MeshCollection[i].DrawWireframe();
    }
  }


  mvPopMatrix();



  //gl.clearColor(0,0,0,1) // Clear to black, fully opaque
  //gl.clearDepth(1.0);                 // Clear everything
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var size = 80;
  // Set the viewport to match
  gl.viewport(canvas.width - size, canvas.height - size, size, size);
  
  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  
  perspectiveMatrix = makePerspective(45, 1, 0.1, 10000.0);
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  
  loadIdentity();
  
  // Save the current matrix, then rotate before we draw.
  mvTranslate([-0.0, 0.0, -size/2]);
  mvPushMatrix();
  mvRotate(cubeRotationY, [1, 0, 0]);
  mvRotate(cubeRotationX, [0, 1, 0]);

setMatrixUniforms();

  gl.uniform1i(hasTextureAttribute, 1);
  //drawGrid();
  XAxisMesh.Draw();
  YAxisMesh.Draw();
  ZAxisMesh.Draw();


  mvPopMatrix();



/*
   // Clear the 2D canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillText("someMsg", 200, 200);
    ctx.fillStyle = "#ddd";
    */
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

  //vertexSelColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexSelColor");
  //gl.enableVertexAttribArray(vertexSelColorAttribute);


  hasTextureAttribute = gl.getUniformLocation(shaderProgram, "aHasTexture");

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