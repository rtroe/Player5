var MeshType = {
    Solid: 0,
    Lines: 1
};

function Mesh () {
  
  //Mesh Name
    this.Name = "object:name";
    
    //Vertice Array
    this.vertices = [];
    
    //Normal Array
    this.vert_noramls = [];
    
    //Colour Array
    this.vert_colours = [];
    
    //Indices
    this.Indices = [];
    
    //Buffers
    this.meshVerticesBuffer = null;
    this.meshVerticesNormalBuffer= null;
    this.meshVerticesColorBuffer= null;
    this.meshVerticesIndexBuffer= null;
    
    //What is the model type
    this.meshType = MeshType.Solid;
    
    //Should it be Drawn
    this.Enabled = true;
}

Mesh.prototype.getInfo = function() {
    return 'Mesh Name: ' + this.Name;
};

Mesh.prototype.InitialiseBuffers = function(){
  
  this.meshVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  this.meshVerticesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vert_noramls), gl.STATIC_DRAW);
  
  // Now set up the colors
  this.meshVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vert_colours), gl.STATIC_DRAW);


  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  this.meshVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshVerticesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.Indices), gl.STATIC_DRAW);
};


Mesh.prototype.Draw = function(){
  
  if(this.Enabled == true){

  // Draw the mesh by binding the array buffer to the mesh's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesBuffer );
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshVerticesIndexBuffer);
  
  setMatrixUniforms();
  if(this.meshType == MeshType.Solid){
    gl.drawElements(gl.TRIANGLES, this.Indices.length, gl.UNSIGNED_SHORT, 0);
  }
  if(this.meshType == MeshType.Lines){
    gl.drawElements(gl.LINES, this.Indices.length, gl.UNSIGNED_SHORT, 0);
  }
  }
};