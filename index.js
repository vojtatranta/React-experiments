
require('node-jsx').install({harmony: true})

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var gzippo = require('gzippo');
var Promise = require('promise').Promise;
var Routy = require('./routy/Routy');
var React = require('react');
var Router = require('react-router');
var routes = require('./routy/ServerRoutes');
var reactRoutes = require('./routy/Router')
var Base = require('./react/app.jsx');

var app = express();

app.use(gzippo.staticGzip(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//routy.route(routes.home.path, ListView);
//routy.route(routes.item.path, ItemView);
//routy.route('/item/:id', ItemView);

app.get('*', function(req, res) 
{
	var router = Router.create({
		routes: reactRoutes,
		location: req.url
	});

	router.run(function(Handler, state) {

		var view = routes.getRouteByName(state.routes[state.routes.length - 1].name).view;
		if (!view) res.status(404).send('Not found');

		var serverHandler = new view(req, res);

		req.params = state.params;
		var data = serverHandler.get(req, res);
		var json = JSON.stringify(data);
		if (req.accepts('json') && !req.accepts('html'))
			return res.json(json)

			data['bodyHTML'] = React.renderToString(React.createElement(Handler, data));

		var html = React.renderToString(React.createElement(Base, data));

		res.send('<!doctype html>' + html + "<script>window.state = '" + json + "'</script>");
	});

});



/*
app.get('/', function(req, res){
  
  	var apped = ReactApp({heading: 'Helou world'});
  	console.log(apped);
	res.send('<!doctype html>' + React.renderComponentToString(apped));

});
*/


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
