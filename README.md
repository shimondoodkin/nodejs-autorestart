# What is node.js auto restart
It is a way to watch all .js files if they have been changed and to restart nodejs.
It allows easy development and stable production.

## How to use nodejs auto restart:
Copy `autoexit.js` and `nodejs.sh` to `/var/www/` 



### Add to your script at top: 
    require.paths.unshift(__dirname); //make local paths accessible

### And to your script at end:

    // exit if any js file or template file is changed.
    // it is ok because this script encapsualated in a batch while(true);
    // so it runs again after it exits.
    var autoexit_watch=require('autoexit').watch;
    //
    var on_autoexit=function () { } 
    autoexit_watch(__dirname,".js", on_autoexit);
    //autoexit_watch(__dirname+"/templates",".html", on_autoexit);



### You might want to use: `try-catch` that will make your applicaiton not crush on errors
    try
    {
     //your code
    }
    catch(e)
    {
     sys.puts(e.stack)
    }

### Example:
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
    sys.puts('Server running at http://127.0.0.1:8124/');
    
    // exit if any js file or template file is changed.
    // it is ok because this script encapsualated in a batch while(true);
    // so it runs again after it exits.
    var autoexit_watch=require('autoexit').watch;
    //
    var on_autoexit=function () { sys.puts('bye bye'); } 
    autoexit_watch(__dirname,".js", on_autoexit);
    //autoexit_watch(__dirname+"/templates",".html", on_autoexit);




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

### When i start to develop I connect to the server with ssh and run:

    stop nodejs
    cd /var/www
    ./nodejs.sh


Then I will start to see application output and errors on the screen
If I want to stop the server I press `Control + C`
and the script stops.

### Nginx?
Yes I also use Nginx as front.
To let me in the future to change and integrate different servers seemlessly.
It is  basicly:  nginx<->nodejs as an upstream.
also i added php-cgi to nginx to use moadmin.php - mongodb db editor.
