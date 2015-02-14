var React = require('react');
var ReactView = require('./ReactView');
var List = require('../react/components/List.jsx');
var inheritance = require('../utils/inheritance');
var data = require('../data');

var ListView = function(request, response)
{
	inheritance._super(ListView, this, 'constructor', arguments);	

	this.template = List;
	this.title = 'List';
}
inheritance.inherits(ListView, ReactView);

ListView.prototype.get = function(request, response)
{
	
	return this.renderReact(data);
}

ListView.prototype.post = function(request, response)
{
	var item = request.body;
	item['id'] = data.items.length + 1;
	data.items.push(item);

	this.renderReact(item);
}


module.exports = ListView;