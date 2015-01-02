var List = require('../react/components/List.jsx');
var Item = require('../react/components/Item.jsx');

var routes = {};

routes.home = {
	path: '/',
	template: List
}


routes.item = {
	path: '/item/:id',
	template: Item
};

routes.getRoute = function(route)
{
	for(var routeName in routes)
	{
		if (route == routes[routeName].path) return routes[routeName];
	}
	return false;
}

module.exports = routes;