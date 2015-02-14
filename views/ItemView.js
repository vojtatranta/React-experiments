var inheritance = require('../utils/inheritance');
var ReactView = require('./ReactView');
var Item = require('../react/components/Item.jsx');
var data = require('../data');

var getById = function(id)
{
	var id = parseInt(id);
	for(var i in data.items)
	{
		if (data.items[i]['id'] == id) return data.items[i];
	}
	return null;
}

var ItemView = function(request, response)
{
	inheritance._super(ItemView, this, 'constructor', arguments);
	this.template = Item;
}
inheritance.inherits(ItemView, ReactView);

ItemView.prototype.get = function(req, res)
{
	var item = getById(req.params.id);
	return this.renderReact({'item': item, items: data.items});
}

module.exports = ItemView;