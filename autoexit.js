//license: public domain

//////// begin auto exit on js files change in __dirname  //////////////////////////  
// run this file  with the folowing shell script one liner command:
//                      while true; do node jsdatasvc.js; done;
//
var fs = require('fs');    // allaws to open files
var sys = require('sys');  // allows to print errors to command line

var restart_server = function(file){
    sys.puts((new Date).toTimeString()+' change discovered, restarting server. the file was: '+file);
    process.exit();
}

function parse_file_list(parse_file_list_dirname,extention) {
 var parse_file_list1 = function(dir, files, extention)
 {
  for (var i=0;i<files.length;i++)
  {
   var file = dir+'/'+files[i];
   (function()
    {
     var file_on_callback = file;
     //sys.puts('file assigned: '+ file_on_callback);
     fs.stat(file_on_callback,
     function(err,stats)
     {
      //sys.puts('stats returned: '+ file);
      if (err) return ''; //throw err;
      if (stats.isDirectory())
       fs.readdir(file_on_callback,function(err,files){
        if (err) throw err;
        parse_file_list1(file_on_callback, files,extention);
       });
      else if (stats.isFile()  && file_on_callback.substr(file_on_callback.length-extention.length).toLowerCase()==extention  ) //maybe remove this
      {
       eval("f= function(){restart_server('"+file_on_callback+"');};");fs.watchFile(file_on_callback, f); //probably may consume resources , but also tells whitch file
       //fs.watchFile(file_on_callback, restart_server);                                                   //this one consumes less resiurces
      }
     });
    }
   )(); // This creates and executes a new function with its own scope.
  }
 };
 // fs.readdir(parse_file_list_dirname,function(err,files){if (err) throw err;parse_file_list1(parse_file_list_dirname, files,extention);}); 
 fs.readdir(parse_file_list_dirname,function(err,files){if (err) throw err;parse_file_list1(parse_file_list_dirname, files,extention);}); 

}

parse_file_list(__dirname,".js");
parse_file_list(__dirname+"/templates",".html");

////////  end auto exit //////////////////////////