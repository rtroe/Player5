function OnLoadScript()
{
  console.log("Init WebGL");
  start('glcanvas');
  
  var pg = $('#pg');
  pg.propertygrid('appendRow',{name:'n11',value:'v12',editor:'text',group:'2 ID Settings'});
  
  var data = pg.propertygrid('getData');
  pg.propertygrid('loadData', data);
}