

var Routy = function(app)
{
	this.app = app;
}

Routy.prototype.route = function(route, ViewKlass)
{
	this.app.get(route, function(request, response)
	{
		ViewKlass.asView(request, response, ViewKlass)
	});
	this.app.post(route, function(request, response)
	{
		ViewKlass.asView(request, response, ViewKlass);
	});
	this.app.delete(route, function(request, response)
	{
		ViewKlass.asView(request, response, ViewKlass);
	});
	this.app.put(route, function(request, response)
	{
		ViewKlass.asView(request, response, ViewKlass);
	});
}

module.exports = Routy;