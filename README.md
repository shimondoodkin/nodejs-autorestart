# What is node.js auto restart
It is a way to watch all .js files if they have been changed and to restart nodejs.
It allows easy development and stable production.

## How to use nodejs auto restart:
Copy `autoexit.js` and `nodejs.sh` to `/var/www/` 

Add to your script:

### At top: 
    require.paths.unshift(__dirname); //make local paths accecible

### And at end:
    require('autoexit');


### Also you might want to use: `try-catch` that will make your applicaiton not crush on errors
    try
    {
     //your code
    }
    catch(e)
    {
     sys.puts(e.stack)
    }

### Example:
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

### Edit nodejs.sh
Edit `nodejs.sh` to match to your server.js filename.


### To launch nodejs you type
    cd /var/www
    ./nodejs.sh

To make it work with upstart  
Copy `nodejs.conf` to `/etc/init/``

### To use upstart you type :

    [command] + [init filename without conf extention]

    start nodejs 
    stop nodejs
    restrt nodejs

### When i start to develop connect to the server with ssh and run:

    stop nodejs
    cd /var/www
    ./nodejs.sh


Then I will start to see application output and errors on the screen
If I want to stop the server I press `Control + C`
and the script stops.

### What files to watch?
Modify autoexit.js for your needs to watch other folders and file types

