var Dispatcher = require('../dispatcher/Dispatcher');
var BaseStore = require('./BaseStore');
var inheritance = require('../utils/inheritance');
var StateStore = require('./StateStore');

var all = require('when/keys').all;

var self = null;
var ItemStore = function()
{
	self = this;
	self._items = [];
	self._selected = null;

	self.dispatchToken = Dispatcher.register(this._register);

}
inheritance.inherits(ItemStore, BaseStore);

ItemStore.prototype._setInitialItems = function(items)
{
	self._items = items;
}

ItemStore.prototype._setInitialSelectedItem = function(selectedItem)
{
	self._selected = selectedItem;
}

ItemStore.prototype.getAll = function()
{
	return self._items;
}

ItemStore.prototype.getSelected = function()
{
	return self._selected;
}

ItemStore.prototype._add = function(item)
{
	self._items.push(item);
	self.emitChange();
}

ItemStore.prototype._setInitials = function(state)
{
	self._setInitialItems(state.items);
	self._setInitialSelectedItem(state.item);
	self.emitChange();
}

ItemStore.prototype._update = function(state)
{
	self._items = state.items;
	self._selected = state.item;
	self.emitChange();
}

ItemStore.prototype._register = function(payload)
{
	var action = payload.action;
	switch(action.actionType) {
		case 'ITEM_ADD':
			self._add(action.item);
			break;
		case 'SET_INITIAL_STATE':
			self._setInitials(action.state.state);
		break;
		case 'NAVIGATE':
			self._update(action.state.state);
		break;
	}
}

ItemStore.prototype.getInitialData = function(req, models)
{
	var data = {};
	data.items = new Promise((fullfill, reject) =>
	{
		models.article.all((err, articles) =>
		{
			if (err)
				return fullfill([]);

			return fullfill(articles);
		});
	});

	data.item = new Promise((fullfill, reject) =>
	{
		models.article.get(req.params['id'], (err, article) =>
		{
			if (err)
				return fullfill({});

			return fullfill(article);
		});
	});

	return all(data);
}


module.exports = new ItemStore();
