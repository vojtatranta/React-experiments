var inheritance = require('../utils/inheritance');
var FluxDispatcher = require('flux').Dispatcher;

var Dispatcher = function()
{
	this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
}
inheritance.inherits(Dispatcher, FluxDispatcher);

Dispatcher.prototype.handleViewAction = function(action)
{
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
}

module.exports = new Dispatcher();
