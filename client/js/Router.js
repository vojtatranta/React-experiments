var routes = require('../../routy/routes');
var director = require('director');
var ReactPageHandler = require('./ReactPageHandler');


var directorRoutes = {};
for(var routeName in routes)
{
	directorRoutes[routes[routeName].path] = function()
	{
		router = this;
		router['invokedRoute'] = router.getInvokedRoute();
		router['path'] = router.getPath();
		return ReactPageHandler(routes.getRoute(router.getInvokedRoute()).template, router, arguments);
	}	

}

var router = new director.Router(directorRoutes).configure({html5history: true});;
router.init();

module.exports = router;