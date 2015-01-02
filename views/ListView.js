var React = require('react');
var ReactView = require('./ReactView');
var List = require('../react/components/List.jsx');
var inheritance = require('../utils/inheritance');

var extras = {
	items: [
		{
			'id': 1,
			'title': 'AHoj, tohle je můj post, který se vypisuje Reactem',
			'content': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
		},
	]
}

var ListView = function(request, response)
{
	inheritance._super(ListView, this, 'constructor', arguments);	

	this.template = List;
	this.title = 'List';
}
inheritance.inherits(ListView, ReactView);

ListView.prototype.get = function(request, response)
{
	
	this.renderReact(extras);
}

ListView.prototype.post = function(request, response)
{
	extras.items.push(request.body);
	response.send('ok');
}


module.exports = ListView;