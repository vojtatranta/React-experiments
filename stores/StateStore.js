var request = require('superagent');


var StateStore = {};

StateStore.state = {};

StateStore.router = null;

StateStore.history = {};

StateStore.CHANGE_EVENT = 'change';

StateStore.setInitialState = function(path, state)
{
	StateStore.state = state;
	StateStore.history[path] = state;
}

StateStore.getCurrentState = function()
{
	return StateStore.state;
}

StateStore.getState = function(path, cb)
{
	if (typeof StateStore.history[path] !== 'undefined')
		return cb(StateStore.history[path]);

	request.get(path).set('Accept', 'application/json').end(function(err, res)
	{
		if (err)
			return alert(err.toString());
		var responseBody = JSON.parse(res.body);
		StateStore.updateState(path, responseBody);
		return cb(responseBody);
	});
}

StateStore.updateState = function(path, state)
{
	StateStore.state = state;

	StateStore.history[path] = state;

	StateStore.dispatch(StateStore.CHANGE_EVENT, StateStore.state);
}

StateStore.setRouter = function(router)
{
	StateStore.router = router;
}

StateStore.dispatch = function(evType, payload)
{
	
}

module.exports = StateStore;