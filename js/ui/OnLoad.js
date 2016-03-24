function OnLoadScript()
{
  log("Player 5 - Model Viewer Console");
  log("====================================================");
  
  log("Initializing Canvas");
  
  start('glcanvas');
  /*
  for(var i = 0; i < 1000; i++){
    log(i);
}
*/
  var pg = $('#pg');
  
  $('#tt').css("opacity", "0.75");
  
  /*
  $('#tt').bind('mousewheel', function(e) {
    //Get Current Tree Position
    var x = $('#tt').offset();
    
    var offSet = 0;
    
    if(e.originalEvent.wheelDelta / 120 > 0) {
        $('#tt').offset({top:x.top + 10});
    } else {
        $('#tt').offset({top:x.top - 10});
    }
    //$('#tt').offset(offSet);
    
        console.log("tree height: " + $('#tt').height());
        console.log("mainPane height: " + $('#mainPane').height());
        console.log("tree offset: " + $('#tt').offset().top);
        console.log("mainPane offset: " + $('#mainPane').offset().top);    
});
*/

$('#mainPane').css("overflow", "hidden");
  
  var node = $('#tt').tree('find', 'axis');
  
    $('#tt').tree('append', {
            parent: node.target,
             data:[{
                 id: 'xAxis',
                 text:'X-Axis',
                 iconCls: 'icon-mini-add',
                 checked:true

         },{
                 id: 'yAxis',
                 text:'Y-Axis',
                 iconCls: 'icon-mini-add',
                 checked:true
         },{
                 id: 'zAxis',
                 text:'Z-Axis',
                 iconCls: 'icon-mini-add',
                 checked:true
         }]
    });
var rows = [
	{"name":"Name","value":"Bill Smith","group":"ID Settings","editor":"text"},
	{"name":"Address","value":"","group":"ID Settings","editor":"text"},
	{"name":"Age","value":"40","group":"ID Settings","editor":"numberbox"},
	{"name":"Birthday","value":"01/02/2012","group":"ID Settings","editor":"datebox"},
	{"name":"SSN","value":"123-456-7890","group":"ID Settings","editor":"text"},
	{"name":"Email","value":"bill@gmail.com","group":"Marketing Settings","editor":{
		"type":"validatebox",
		"options":{"validType":"email"	}
	}},
	{"name":"FrequentBuyer","value":"false","group":"Marketing Settings","editor":{
		"type":"checkbox",
		"options":{"on":true,"off":false}
	}}

];
$("#pg").propertygrid('loadData',rows);

var row = {    
  name:'AddName',    
  value:'New Game',    
  group:'Marketing Settings',    
  editor:'text'    
};    
$('#pg').propertygrid('appendRow',row);  
}

function log(Text)
{
  console.log(Text);
  var TextSoFar = $('#console').html();
  
  TextSoFar += new Date() + ">> " + Text + "<br/>";
  
  $('#console').html(TextSoFar);
  
  $('#sonsoleDiv').animate({scrollTop: $('#sonsoleDiv').prop("scrollHeight")}, 50);
}