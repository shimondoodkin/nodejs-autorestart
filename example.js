
////////example:

require.paths.unshift(__dirname); //make local paths accessible

var sys = require('sys'),
   http = require('http');
http.createServer(function (req, res) {

  try
  {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  
  }
  catch(e)
  {
   sys.puts(e.stack);
  }
  
}).listen(8124, "127.0.0.1");
sys.puts((new Date).toTimeString()+' Server running at http://127.0.0.1:8124/');


// exit if any js file or template file is changed.
// it is ok because this script encapsualated in a batch while(true);
// so it runs again after it exits.


var autoexit_watch=require('autoexit').watch;
var on_autoexit=function () { sys.puts('bye bye'); } 
autoexit_watch(__dirname,".js", on_autoexit);
//autoexit_watch(__dirname+"/templates",".html", on_autoexit);




//////////end example
// notice the try-catch witch makes your applicaiton not crush on errors
