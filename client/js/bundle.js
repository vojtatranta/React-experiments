var React = require('react');
var Router = require('./ClientRouter');
var StateStoreKlass = require('../../stores/StateStore');
var StateActions = require('../../actions/StateActions');

var StateStore = new StateStoreKlass();

var currentLocation = null;

StateStore.addChangeListener(() =>
{
	React.render(React.createElement(StateStore.getHandler(), StateStore.getState()), document.body);
});

Router.run((Handler, routerState) => {

	if (currentLocation)
		StateActions.navigate({routerState: routerState, handler: Handler});
	else
		StateActions.setInitialState({state: JSON.parse(window.state), handler: Handler});

	currentLocation = routerState.path;
});
