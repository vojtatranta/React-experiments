var request = require('superagent');


var StateStore = {};

StateStore.state = {};

StateStore.router = null;

StateStore.history = {};

StateStore.CHANGE_EVENT = 'change';

StateStore.setInitialState = function(state)
{
	StateStore.state = state;
	StateStore.history[StateStore.router.getPath()] = state;
}

StateStore.getCurrentState = function()
{
	return StateStore.state;
}

StateStore.getState = function(cb)
{
	var path = StateStore.router.getPath();
	if (typeof StateStore.history[path] !== 'undefined')
		return cb(StateStore.history[path]);

	request.get(path).set('Accept', 'application/json').end(function(err, res)
	{
		if (err)
			return alert(err.toString());
		StateStore.updateState(StateStore.router.getPath(), res.body);
		return cb(res.body);
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