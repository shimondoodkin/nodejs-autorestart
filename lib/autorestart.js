/**
 * license: public domain
 * by Shimon Doodkin
 * updated by Alex Gorbatchev
 *
 * @example
 *
 * // exit if any js file or template file is changed.
 * // this script encapsualated in a batch while(true); so it runs again after exit.
 *
 * var watch = require('node-autorestart/lib/autorestart');
 * watch(__dirname,".js");
 * watch(__dirname+"/templates",".html");
 * 
 * run this file with the kind of the folowing shell script one liner command:
 *    while true; do node server.js; done;
 */

var
	fs		= require('fs'),
	sys		= require('sys'),
	path	= require('path')
	;

var isRestarted = false;

module.exports = function(dir, ext, callback)
{
	function restartServer(filename)
	{
		if(isRestarted)
			return;
		
		var ignore = false,
			callbackresult = true
			;
		
		if(callback)
			callbackresult = callback(filename);
			
		ignore = (callbackresult === false);
		
		if(!ignore)
		{ 
			isRestarted = true;
			sys.puts(new Date().toString() + ' - ' + filename + ' - restarting');
			process.exit();
		}
	};

	function parseFileList(dir, files, ext)
	{
		files.forEach(function(file)
		{
			file = path.join(dir, file);
			
			fs.stat(file, function(err, stats)
			{
				if(err)
					return;
					
				if(stats.isDirectory())
				{
					fs.readdir(file, function(err, files)
					{
						if (!err)
							parseFileList(file, files, ext);
					});
				}
				else if(stats.isFile() && path.extname(file) == ext)
				{
					fs.watchFile(file, function(curr, prev)
					{
						if(curr.mtime.getTime() != prev.mtime.getTime())
							restartServer(file);
					}); 
				}
			});
		});
	};
	
	fs.readdir(dir, function(err, files)
	{
		if(!err)
			parseFileList(dir, files, ext);
	});
}
