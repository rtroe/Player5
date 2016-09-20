
function SetViewToTop() {
cubeRotationY = 90;
cubeRotationX = 90;
}

function SetViewToBottom() {
cubeRotationY = -90;
cubeRotationX = 90;
}

function SetViewToFront() {
cubeRotationY = 0;
cubeRotationX = 270;
}

function SetViewToBack() {
cubeRotationY = 0;
cubeRotationX = 90;
}

function SetViewToLeft() {
cubeRotationY = 0;
cubeRotationX = 180;
}

function SetViewToRight() {
cubeRotationY = 0;
cubeRotationX = 0;
}




function SetShadingToEdge() {
	RenderState = vxRenderState.ShadedEdge;
	console.log(RenderState);
}

function SetShadingToShaded() {
	RenderState = vxRenderState.Shaded;
	console.log(RenderState);
}

function SetShadingToWireframe() {
	RenderState = vxRenderState.Wireframe;
	console.log(RenderState);
}
