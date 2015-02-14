/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var routes = require('./ClientRoutes');

var ReactRoutes = module.exports = [
	<Route name='root' path='/' handler={routes.home.template}>
		<Route name='list' path={routes.list.path} handler={routes.list.template} />
		<Route name='item' path={routes.item.path} handler={routes.item.template} />
	</Route>
];
