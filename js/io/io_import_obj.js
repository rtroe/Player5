function io_import_obj(FileName, InputFileText)
{
  log("Loading file <b>'"+FileName+"'</b> as an <b>'ascii .obj'</b> file...");
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
  var temp_vertices = [];      //Vertices List for initial loading
  var vertexNormals = [];     //Normals
  var temp_Normals = [];      //Normals List for initial loading
  var generatedColors = [];     //Colours
  var cubeVertexIndices = [];   //Indices - Not very useful in STL files.
  
  /*
  var temp_Normal = [];        //To hold the Normal for that entire face.
   */
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
     
     //First Split the Current Line into an Array split by any number of spaces
     var re = /\s* \s*/;
     var inputLine = lines[line].split(re);
     
     
     switch (inputLine[0])
     {
       //Add Vertice
       case 'v':
        temp_vertices.push(inputLine[1]);
        temp_vertices.push(inputLine[2]);
        temp_vertices.push(inputLine[3]);
       break;
       
       //Add Normal
       case 'vn':
        temp_Normals.push(inputLine[1]);
        temp_Normals.push(inputLine[2]);
        temp_Normals.push(inputLine[3]);
       break;
       
       
       //Add group
       case 'o':
       case 'g':
          var dataThisLoop = {
          id: numOfElements,
          text:'Group: ' + inputLine[1]
         };
         treeItems.push(dataThisLoop);
         
         break;
       /*
       //Add Face
       case 'f':
         
        //Loop through each vertice collection in each line
        for(var vrt = 1; vrt < inputLine.length; vrt++){
          if(inputLine[vrt] !== ""){
          
          //Index Array
          var indexArray = inputLine[vrt] .split("/");
          

          //Should Always have Vertice Data
          vertices.push(temp_vertices[(indexArray[0]-1)*3]);
          vertices.push(temp_vertices[(indexArray[0]-1)*3+1]);
          vertices.push(temp_vertices[(indexArray[0]-1)*3+2]);
          
         modelprop_Center[0] -= temp_vertices[(indexArray[0]-1)*3];
         modelprop_Center[1] -= temp_vertices[(indexArray[0]-1)*3+1];
         modelprop_Center[2] -= temp_vertices[(indexArray[0]-1)*3+2];

          //TODO: Add in Texture Support


          //Temp Normal
          var temp_Normal = [1,1,1];

          //Not all files specify Normal Data, Check, and then add if present
          if(indexArray.length > 2){
            temp_Normal[0] = temp_Normals[(indexArray[2]-1)*3];
            temp_Normal[1] = temp_Normals[(indexArray[2]-1)*3+1];
            temp_Normal[2] = temp_Normals[(indexArray[2]-1)*3+2];
            console.log((indexArray[2]-1));
          }

          //Add In Normals
          vertexNormals.push(temp_Normal[0]);
          vertexNormals.push(temp_Normal[1]);
          vertexNormals.push(temp_Normal[2]);
          
          //TODO: Add in Material Texture Support
          generatedColors.push(temp_colour[0]);
          generatedColors.push(temp_colour[1]);
          generatedColors.push(temp_colour[2]);
          generatedColors.push(temp_colour[3]);
          
          //Add in Element Indice
          cubeVertexIndices.push(numOfElements);
          numOfElements++;
          }
        }
         break;
         */
     }
    }
    
    for(line = 0; line < lines.length; line++){
     
     //First Split the Current Line into an Array split by any number of spaces
     var re = /\s* \s*/;
     var inputLine = lines[line].split(re);
     
     switch (inputLine[0])
     {
       //Add Face
       case 'f':
         
        //Loop through each vertice collection in each line
        for(var vrt = 1; vrt < inputLine.length; vrt++){
          if(inputLine[vrt] !== ""){
          
          //Index Array
          var indexArray = inputLine[vrt] .split("/");
          

          //Should Always have Vertice Data
          vertices.push(temp_vertices[(indexArray[0]-1)*3]);
          vertices.push(temp_vertices[(indexArray[0]-1)*3+1]);
          vertices.push(temp_vertices[(indexArray[0]-1)*3+2]);
          
         modelprop_Center[0] -= temp_vertices[(indexArray[0]-1)*3];
         modelprop_Center[1] -= temp_vertices[(indexArray[0]-1)*3+1];
         modelprop_Center[2] -= temp_vertices[(indexArray[0]-1)*3+2];

          //TODO: Add in Texture Support


          //Temp Normal
          var temp_Normal = [1,1,1];

          //Not all files specify Normal Data, Check, and then add if present
          if(indexArray.length > 2){
            temp_Normal[0] = temp_Normals[(indexArray[2]-1)*3];
            temp_Normal[1] = temp_Normals[(indexArray[2]-1)*3+1];
            temp_Normal[2] = temp_Normals[(indexArray[2]-1)*3+2];
            //console.log((indexArray[2]-1));
          }

          //Add In Normals
          vertexNormals.push(temp_Normal[0]);
          vertexNormals.push(temp_Normal[1]);
          vertexNormals.push(temp_Normal[2]);
          
          //TODO: Add in Material Texture Support
          generatedColors.push(temp_colour[0]);
          generatedColors.push(temp_colour[1]);
          generatedColors.push(temp_colour[2]);
          generatedColors.push(temp_colour[3]);
          
          //Add in Element Indice
          cubeVertexIndices.push(numOfElements);
          numOfElements++;
          }
        }
         break;
     }
    }
    
         var node2 = $('#tt').tree('find', FileName);
          $('#tt').tree('append', {
            parent: node2.target,
             data:treeItems
    });
    
    //Set Model Center
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