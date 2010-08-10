//license: public domain
// by Shimon Doodkin

//example:

// // exit if any js file or template file is changed.
// // this script encapsualated in a batch while(true); so it runs again after exit.
// var autoexit_watch=require('deps/nodejs-autorestart/autoexit').watch;
// autoexit_watch(__dirname,".js");
// autoexit_watch(__dirname+"/templates",".html");


//////// begin - auto exit on js files changed //////////////////////////  
// run this file  with the kind of the folowing shell script one liner command:
//                      while true; do node server.js; done;
//

var fs = require('fs');    // allaws to open files
var sys = require('sys');  // allows to print errors to command line
this.restarted=false;
var that=this;

function watch(parse_file_list_dirname,extention,callback) {
 var restart_server = function(filename)
 {
    if(that.restarted) return;
    that.restarted=true;
    var  ignore=false;
    var callbackresult=true;;
    if(callback)callbackresult=callback(filename);
    ignore=(callbackresult===false);
    if(!ignore)
    { 
     sys.puts((new Date).toTimeString()+' change discovered, restarting server. the file was: '+filename);
     process.exit();
    }
    else
     that.restarted=false;
 }

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
      if (err)
      {
       // do nothing
       // sometimes linked files are missing
       //sys.puts('auto restart - cannot read file1 : '+ file_on_callback);
      }
      else
      {
       if (stats.isDirectory())
        fs.readdir(file_on_callback,function(err,files){
         if (err) 
         {
          // do nothing
          // sometimes linked files are missing
          //sys.puts('auto restart - cannot read file2 : '+ file_on_callback);
         }
         else
          parse_file_list1(file_on_callback, files,extention);
        });
       else if (stats.isFile()  && file_on_callback.substr(file_on_callback.length-extention.length).toLowerCase()==extention  ) //maybe remove this
       {
        fs.watchFile(file_on_callback, function(){restart_server(file_on_callback);} ); //probably may consume resources , but also tells whitch file
        //fs.watchFile(file_on_callback, restart_server);                                                   //this one consumes less resiurces
       }
      }
     });
    }
   )(); // This creates and executes a new function with its own scope.
  }
 };
 // fs.readdir(parse_file_list_dirname,function(err,files){if (err) throw err;parse_file_list1(parse_file_list_dirname, files,extention);}); 
 fs.readdir(parse_file_list_dirname,function(err,files)
 {
  if (err) 
  {
   // do nothing
   // sometimes linked files are missing
   //sys.puts('auto restart -cannot read file3: '+ parse_file_list_dirname);
  }
  else
   parse_file_list1(parse_file_list_dirname, files,extention);
 }); 

} 
this.watch=watch;


////////  end auto exit //////////////////////////
