var routes = {};

routes.home = {
	path: '/',
}

routes.list = {
	path: '/',
}

routes.item = {
	path: '/item/:id',
};

routes.getRoute = function(route)
{
	for(var routeName in routes)
	{
		if (route == routes[routeName].path) return routes[routeName];
	}
	return false;
}

routes.getRouteByName = function(name)
{
	for(var routeName in routes)
	{
		if (name == routeName) return routes[routeName];
	}

	return false;
}

module.exports = routes;