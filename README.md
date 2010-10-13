# What is node.js auto restart
It is a set of examples and a module with common problems solved.
It allows easy development and stable production.

 - Run on boot:
   To make your program run automaticaly on boot with Upsrart(you need to configure a .sh file and a .conf file)
 - Auto restart:
   autoexit module to watch all .js files if they have been changed and to restart nodejs. 
 - A description of how to make your program crash proof from javascript errors. (segfaults still crash)
 - Auto reload a module:
   makes sense for fast development of slow loading app,
   "http://github.com/shimondoodkin/node-hot-reload":http://github.com/shimondoodkin/node-hot-reload.

## How to use nodejs auto restart:
Copy `nodejs.sh` and `autoexit.js` to root folder of your application 
for example to `/var/www`. Copying of `autoexit.js` is optional and it can be included from deps folder

### Add to your script at top: 
    require.paths.unshift(__dirname); //make local paths accessible

### And to your script at end:

    // exit if any js file or template file is changed.
    // it is ok because this script encapsualated in a batch while(true);
    // so it runs again after it exits.
    var autoexit_watch=require('autoexit').watch;
    //
    var on_autoexit=function (filename) { } // if it returns false it means to ignore exit this time;  
    autoexit_watch(__dirname,".js", on_autoexit);
    //autoexit_watch(__dirname+"/templates",".html", on_autoexit);



### You might want to use: `try-catch` that will make your applicaiton not crash on errors
    try
    {
     //your code
    }
    catch(e)
    {
     console.log(e.stack)
    }

Also after serving one sucsessful request (application is fully loaded) I add an on error error handler:

 if(!app_loaded)
   {
    process.on('uncaughtException', function (err) {
      console.log('Caught exception: ' + err.stack);
    });
    app_loaded=true;
   }

As i like it, I want it to crash on load errors and exit the application but not on application errors.

### Example:
    require.paths.unshift(__dirname); //make local paths accessible
    
    var http = require('http');
    var app_loaded=false;

    http.createServer(function (req, res) {

      if(!app_loaded)
      {
       process.on('uncaughtException', function (err) {
       console.log('Caught exception: ' + err.stack);
       });
       app_loaded=true;
      }

      try
      {    

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
      
      }
      catch(e)
      {
       console.log(e.stack);
      }
      
    }).listen(8124);
    console.log('Server running at http://127.0.0.1:8124/');
    
    // exit if any js file or template file is changed.
    // it is ok because this script encapsualated in a batch while(true);
    // so it runs again after it exits.
    var autoexit_watch=require('autoexit').watch;
    //
    var on_autoexit=function () { console.log('bye bye'); } 
    autoexit_watch(__dirname,".js", on_autoexit);
    //autoexit_watch(__dirname+"/templates",".html", on_autoexit);




### Edit nodejs.sh
Edit `nodejs.sh` to match to your server.js filename.


### To launch nodejs you type
    cd /var/www
    ./nodejs.sh

### To make it work with upstart  - make it run on boot
Copy `nodejs.conf` to `/etc/init/`
and modify it to point to nodejs.sh

Upstart is originated in Ubuntu linux. if your linux does not have upstart. An option for you migh be to install upstart.

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
note: the output will not bet visible if logging is configured in node.sh. the output will go to log.

### Nginx?
Yes I also use Nginx as front. (but it is not required). I use it
to let me in the future to change and integrate different servers seemlessly.
It is  basicly:  nginx<->nodejs as an upstream.
also i have added php-cgi to nginx to use +Rock mongo+ - a mongodb db editor.
also i've added a log.php , log file viewer so don't even need ssh.


### Multi Process
you can put nginx or haproxy as a front and create several .conf files for the upstart.

in each you modify the execution line to contain port number ex.:

in the nodejs1.conf
    exec sudo -u www-data /bin/bash /var/www/nodejs-mongodb-app/nodejs.sh 8001
in the nodejs2.conf
    exec sudo -u www-data /bin/bash /var/www/nodejs-mongodb-app/nodejs.sh 8002

and make port as an argument to your server.js.
    //http.createServer(server_handler_function).listen(process.argv[2]||8001);
    //see http://nodejs.org/api.html#process-argv-58
    //process.argv.forEach(function (val, index, array) {
    //  console.log(index + ': ' + val);
    //});

To achive best performance. it was found by testing (during development of twisted and nginx) that the number of processors should much the number of cores not more not lest. 
   
### the idea behind the architecture 
the idea is to add an extra level of fail-safety by using a stable system shell script to restart node instead of node itself.
