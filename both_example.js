
////////example:
require.paths.unshift(__dirname); //make local paths accessible

var autoreload= require('./autoreload');
var mymodule= require('./mymodule_example');
autoreload.watchrel('mymodule_example.js', function (newmodule){
   /* you can put here staff to make your module look like it was initialized well. */
   newmodule.name=mymodule.name;
   //mymodule.init(); // init the module before if possible, it will save error time.
   mymodule=newmodule;
   //mymodule.moreinit(); // while this not finished you may get errors, because of not whell initilized your module.
});
//autoreload.watch(mymodule.filename, function (newmodule){ mymodule=newmodule; }); // might not work if when started the module has errors or filename export is missing  


var sys = require('sys'),
   http = require('http');
   
   
   mymodule.name="Shimon Doodkin";
   
http.createServer(function (req, res) {

  try
  {

   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end(mymodule.time() + '\n');  
   res.end();

   //to do, main module reloadable instead of above you might use: 
   //mymodule.handlerequest(req,res); 
   
  }
  catch(e)
  {
   sys.puts(e.stack);
  }
  
}).listen(8124);
sys.puts((new Date).toTimeString()+' Server running at http://127.0.0.1:8124/');


// exit if any js file or template file is changed.
// it is ok because this script encapsualated in a batch while(true);
// so it runs again after it exits.


var autoexit_watch=require('autoexit').watch;
var on_autoexit=function (filename) { // if this function return false it means to ignore the exit; 
 if(autoreload.trackedfiles[filename]) return false;
} 
autoexit_watch(__dirname,".js", on_autoexit);
//autoexit_watch(__dirname+"/templates",".html", on_autoexit);




//////////end example
// notice the try-catch witch makes your applicaiton not crush on errors


