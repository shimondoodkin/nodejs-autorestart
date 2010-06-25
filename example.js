
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

require('autoexit');


//////////end example
// notice the try-catch witch makes your applicaiton not crush on errors
