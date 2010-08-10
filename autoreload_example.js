var http = require('http');
var autoreload= require('./autoreload');
var mymodule= require('./mymodule');

autoreload.watchrel('mymodule.js', function (newmodule){ mymodule=newmodule; });
//autoreload.watch(mymodule.filename, function (newmodule){ mymodule=newmodule; }); // might not work if when started the module has errors or filename export is missing  

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(mymodule.time() + '\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
