var path = require('path');
var fs = require('fs');
var loadmoduletimer={};

function loadlater( filename , callback )
{
 return setTimeout(function ()
 {
  console.log('will load file: '+filename);
  fs.readFile(filename, function (err, content)
  {
   if (err) throw err;
   try
   {
    var dirname = path.dirname(filename);
    // create wrapper function
    var wrapper = "(function (exports, require, module, __filename, __dirname) { "
                + content
                + "\n});";
    var compiledWrapper = process.compile(wrapper, filename);
    var newmodule={}; 
    compiledWrapper.apply(newmodule, [newmodule, require, newmodule, filename, dirname]);

    callback(newmodule);
   }
   catch(err)
   {
    if (err) throw err;
   }
  });
 }, 500);
}

function watch(filename,callback)
{
 fs.watchFile(filename, function ()
 {
  if(loadmoduletimer[filename])
   clearTimeout(loadmoduletimer[filename]);
  loadmoduletimer[filename] = 
  loadlater( filename ,callback);
 });
};exports.watch=watch;

function watchrel(filename,callback)
{
 watch(__dirname+'/'+filename,callback);
}; 
exports.watchrel=watchrel;
