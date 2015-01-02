var inheritance = require('../utils/inheritance');
var ReactView = require('./ReactView');
var Item = require('../react/components/Item.jsx');


var item = {
	'id': 3,
	'title': 'Tajlt',
	'content': 'Maj content of this fucking shit',
}

var ItemView = function(request, response)
{
	inheritance._super(ItemView, this, 'constructor', arguments);
	this.template = Item;
}
inheritance.inherits(ItemView, ReactView);

ItemView.prototype.get = function(req, res)
{
	this.renderReact({item: item, items: [item]});
}


module.exports = ItemView;