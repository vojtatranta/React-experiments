

var Routy = function(app)
{
	this.app = app;
}

var argsToArray = function(args)
{
	var arr = [];
	for(var i in args)
	{
		arr.push(args[i]);
	}
	return arr;
}

Routy.prototype.route = function(route, ViewKlass)
{
	this.app.get(route, function(request, response)
	{
		var args = argsToArray(arguments);
		var urlArgs = args.slice(0, args.length);
		ViewKlass.asView(request, response, ViewKlass, urlArgs)
	});
	this.app.post(route, function(request, response)
	{
		var args = argsToArray(arguments);
		var urlArgs = args.slice(0, args.length);
		ViewKlass.asView(request, response, ViewKlass, urlArgs);
	});
	this.app.delete(route, function(request, response)
	{
		var args = argsToArray(arguments);
		var urlArgs = args.slice(0, args.length);
		ViewKlass.asView(request, response, ViewKlass, urlArgs);
	});
	this.app.put(route, function(request, response)
	{
		var args = argsToArray(arguments);
		var urlArgs = args.slice(0, args.length);
		ViewKlass.asView(request, response, ViewKlass, urlArgs);
	});
}

module.exports = Routy;