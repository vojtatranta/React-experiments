
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('node-jsx').install({harmony: true})
var gzippo = require('gzippo');

var Routy = require('./routy/Routy');
var React = require('react');
var routes = require('./routy/routes');

var ListView = require('./views/ListView');
var ItemView = require('./views/ItemView');

var app = express();

app.use(gzippo.staticGzip(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var routy = new Routy(app);

routy.route(routes.home.path, ListView);
routy.route(routes.item.path, ItemView);
//routy.route('/item/:id', ItemView);


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
