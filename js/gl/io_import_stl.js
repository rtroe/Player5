function io_import_stl(InputFileText)
{
      // Print out Result line By Line
    var lines = InputFileText.split('\n');
    for(var line = 0; line < lines.length; line++){
      console.log(lines[line]);
    }
}