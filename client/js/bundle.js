var React = require('react');
var routes = require('../../routy/routes');
var director = require('director');
var StateStore = require('../../stores/StateStore');


var reactPageHandler = function(template, router, routeParams)
{
	StateStore.getState(function(state)
	{
		state['router'] = router;
		state['params'] = routeParams;
		React.render(template(state), document.body);
	});	
}

var directorRoutes = {};
for(var routeName in routes)
{
	directorRoutes[routes[routeName].path] = function()
	{
		router = this;
		router['invokedRoute'] = router.getInvokedRoute();
		router['path'] = router.getPath();
		return reactPageHandler(routes.getRoute(router.getInvokedRoute()).template, router, arguments);
	}	

}

var router = new director.Router(directorRoutes).configure({html5history: true});
	
StateStore.setRouter(router);
StateStore.setInitialState(JSON.parse(window.state));

router.init();