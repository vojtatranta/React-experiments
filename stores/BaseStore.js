var EventEmitter = require('events').EventEmitter;
var inheritance = require('../utils/inheritance');
var Dispatcher = require('../dispatcher/Dispatcher');


var BaseStore = function()
{

}
inheritance.inherits(BaseStore, EventEmitter);

BaseStore.CHANGE_EVENT = 'change';
BaseStore.$Dispatcher_callbacks = {};

BaseStore.prototype.emitChange = function()
{
	this.emit(BaseStore.CHANGE_EVENT)
}

BaseStore.prototype.addChangeListener = function(cb)
{
	this.on(BaseStore.CHANGE_EVENT,	cb);
}

BaseStore.prototype.removeChangeListener = function(cb)
{
	this.removeListener(BaseStore.CHANGE_EVENT, cb);
}

BaseStore.prototype.unregister = function()
{
	Dispatcher.unregister(this.dispatchToken);
}

module.exports = BaseStore;
