h1. What is node.js autoexit?

p. 
it is a way to watch all .js files if they have been changed and to restart nodejs
to allow easy development.

*+How to use nodejs autoexit:+*

p. 
copy autoexit.js and nodejs.sh to /var/www/
add to your script:
 at top:

bc. 
require.paths.unshift(__dirname); //make local paths accecible

p. at end:
 
bc. 
require('autoexit');


p. also you might want to use: try-catch witch will make your appplicaiton not crush on errors


bc. 
////////example:


require.paths.unshift(__dirname); //make local paths accecible

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
sys.puts('Server running at http://127.0.0.1:8124/');

require('autoexit');

//////////end example


p. 

to lunch nodejs you type

bc. 
cd /var/www
./nodejs.sh

p. 
to make it work with upstart  
copy nodejs.conf to /etc/init/

to use upstart you type :
[command] + [init filename without conf extention]

bc. 
start nodejs 
stop nodejs
restrt nodejs

p. 
when i start to develop connect to the server with ssh and run:

bc. 
stop nodejs
cd /var/www
./nodejs.sh

p. 
then i start to see errors on the screen
if i want to stop the server i press Control + C
and the script stops
 
p. 
modify autoexit.js for your needs to watch other folders and file types