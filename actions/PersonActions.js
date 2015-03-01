var Dispatcher = require('../dispatcher/Dispatcher');
var request = require('superagent');

var PUT_URL = '/';

module.exports = {
	add: function(item)
	{
		request.post(PUT_URL).set('Accept', 'application/json').send(item).end(function(err, res)
		{	
			Dispatcher.handleViewAction({
				actionType: 'ITEM_ADD',
				item: res.body
			});
		});
		
	},
};
