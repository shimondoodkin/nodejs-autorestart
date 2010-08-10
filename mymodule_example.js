console.log('mymodule loaded');
exports.name='test';
exports.time=function ()
{
                      //  edit the number to see it working
 return  " test number 12 name: "+exports.name+" , today: "+(new Date).toString();
}
exports.filename=__filename;
