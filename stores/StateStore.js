var BaseStore = require('./BaseStore');
var inheritance = require('../utils/inheritance');
var Dispatcher = require('../dispatcher/Dispatcher');

var self = null;
var StateStore = function()
{
	self = this;

	self._state = null;
	self._handler = null;

	self._id = Math.random();

	self.dispatchToken = Dispatcher.register(this._register);
}
inheritance.inherits(StateStore, BaseStore);

StateStore.prototype.getState = function()
{
	return self._state;
}

StateStore.prototype.getHandler = function()
{
	return self._handler;
}

StateStore.prototype._setInitialState = function(state)
{
	if (self._state !== null)
		throw Error('Cannot set initial state twice!');

	self._state = state.state;
	self._handler = state.handler;
	return self.emitChange();
}

StateStore.prototype._update = function(state)
{
	self._state = state.state;
	self._handler = state.handler;
	return self.emitChange();
}

StateStore.prototype._register = function(payload)
{
	var action = payload.action;
	switch(action.actionType) {
		case 'SET_INITIAL_STATE':
			self._setInitialState(action.state);
			break;
		case 'NAVIGATE':
			self._update(action.state);
		break;
	}
}

module.exports = StateStore;
