function io_import_stl(FileName, InputFileText)
{
  log("Loading file <b>'"+FileName+"'</b> as an <b>'ascii .stl'</b> file...");
    var node = $('#tt').tree('find', 'models');
      $('#tt').tree('append', {
            parent: node.target,
             data:[{
                 id: FileName,
                 text: FileName,
                 iconCls: 'icon-large-picture',
                 checked:true

         }]
    });
    
  /*******************************/
  //First initialise Arrarys
  /*******************************/
  var vertices = [];           //Vertices
  var vertexNormals = [];     //Normals
  var generatedColors = [];     //Colours
  var cubeVertexIndices = [];   //Indices - Not very useful in STL files.
  
  var temp_Normal = [];        //To hold the Normal for that entire face.
  
  var temp_colour = [ 0.75, 0.5, 0.05, 1];        //Holds the Current Model Colour
  
  //Zero out the number of elements
  numOfElements = 0;
  
  var treeItems = [];
  
  //Re-zero out the model center
  modelprop_Center[0] = 0;
  modelprop_Center[1] = 0;
  modelprop_Center[2] = 0;
  
      // Print out Result line By Line
    var lines = InputFileText.split('\n');
    for(var line = 0; line < lines.length; line++){
     
     //First Split the Current Line into an Array split by spaces
     var inputLine = lines[line].split(" ");
     
     
     switch (inputLine[0])
     {
       //Add Normal
       case "facet":
         temp_Normal = [inputLine[2], inputLine[3], inputLine[4]];
       break;
       
       //Add Vertice point
       case "vertex":
           
         vertices.push(inputLine[1]);
         vertices.push(inputLine[2]);
         vertices.push(inputLine[3]);
         
         modelprop_Center[0] -= inputLine[1];
         modelprop_Center[1] -= inputLine[2];
         modelprop_Center[2] -= inputLine[3];
         
         vertexNormals.push(temp_Normal[0]);
         vertexNormals.push(temp_Normal[1]);
         vertexNormals.push(temp_Normal[2]);
         
         generatedColors.push(temp_colour[0]);
         generatedColors.push(temp_colour[1]);
         generatedColors.push(temp_colour[2]);
         generatedColors.push(temp_colour[3]);
         
         cubeVertexIndices.push(numOfElements);
         /*
         var dataThisLoop = {
          id: numOfElements,
          text:'New Solid' + numOfElements
         };
         treeItems.push(dataThisLoop);
         */
         
         //First Increment number of elements
          numOfElements++;
          //console.log(numOfElements);
       break;
     }
    }
    //console.log(cubeVertexIndices);
    /*
    var node2 = $('#tt').tree('find', FileName);
          $('#tt').tree('append', {
            parent: node2.target,
             data:treeItems
    });
    */
    modelprop_Center[0] /= numOfElements;
    modelprop_Center[1] /= numOfElements;
    modelprop_Center[2] /= numOfElements;
         
    //Now that all of the data has been written in, 
  // Create a buffer for the cube's vertices.
  cubeVerticesBuffer = gl.createBuffer();
  
  // Select the cubeVerticesBuffer as the one to apply vertex operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);

  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  // Set up the normals for the vertices, so that we can compute lighting.
  cubeVerticesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  
  // Now set up the colors for the faces. We'll use solid colors for each face.
  
  cubeVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  
  cubeVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  
  $('#modelForm_Open').window('close');
  log("Done!");
}