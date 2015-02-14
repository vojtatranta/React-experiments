var Router = require('react-router');
var routes = require('../../routy/Router');

var routerConfig = {
	routes: routes,
};

if (typeof window !== 'undefined')
	routerConfig['location'] = Router.HistoryLocation;


module.exports = Router.create(routerConfig);