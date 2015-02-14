


var View = function(request, response)
{
	this.request = request;
	this.response = response;	
	this.isAjax = request.xhr;

	//view title
	this.title = '';
}

View.asView = function(request, response, klass, urlArgs)
{
	var view = new klass(request, response);
	return view.dispatch(request, response, urlArgs);
}

View.prototype.dispatch = function(request, response, urlArgs)
{
	var method = request['method'].toLowerCase();
	if (this[method])
		return this[method].apply(this, [request, response].concat(urlArgs));

	return this.httpNotAllowed(response);
}

View.prototype.httpNotAllowed = function(response)
{
	response.status(405);
	response.send('Not allowed');
}

module.exports = View;