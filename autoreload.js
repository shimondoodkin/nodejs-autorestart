var path = require('path');
var fs = require('fs');
var loadmoduletimer={};
var 
// note: there is an upcomming version of node 
// with auto reload modules probably it will be integrated in the near future.
//
// also every time you reload a module it does not free the memory of the reviews module.
// it means that reloading modules sutes fine for development,
// but do not relay on havy use of it for production.

function loadlater( filename , callback  )
{
 return setTimeout(function ()
 {
  console.log('will load file: '+filename);
  fs.readFile(filename, function (err, content)
  {
   if (err) throw err; // need to add better error handling
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
    if (err) throw err; // need to add better error handling
   }
  });
 }, 500); // sometimes i had a situation when the watchFile callback called while uploading the file and resulted in error. 
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
