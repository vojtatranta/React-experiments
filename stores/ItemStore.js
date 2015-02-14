var Dispatcher = require('../dispatcher/Dispatcher');
var BaseStore = require('./BaseStore');
var inheritance = require('../utils/inheritance');
var StateStore = require('./StateStore');
var data = require('../data');

var self = null;
var ItemStore = function()
{
	self = this;
	if (typeof window != 'undefined')
		self._items = JSON.parse(window.state).items;
	else
		this._items = data.items;
	this._selected = null;

	this.dispatchToken = Dispatcher.register(this._register);

}
inheritance.inherits(ItemStore, BaseStore);

ItemStore.prototype.getAll = function()
{
	return this._items;
}

ItemStore.prototype.getSelected = function()
{
	return this._selected;
}

ItemStore.prototype._add = function(item)
{
	this._items.push(item);
	this.emitChange();
}

ItemStore.prototype._register = function(payload)
{
	var action = payload.action;
	switch(action.actionType) {
		case 'ITEM_ADD':
			self._add(action.item);
			break;
	}
}


module.exports = new ItemStore();