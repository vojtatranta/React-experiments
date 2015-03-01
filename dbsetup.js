var orm = require('orm');


orm.connect("pg://node:node@localhost/node", function (err, db) {
    var models = require('./models')(db);
    for (var modelname in models)
    {
    	models[modelname].sync(function()
	    {
	    	console.log(modelname + ' synced');
	    });
    }
   
});