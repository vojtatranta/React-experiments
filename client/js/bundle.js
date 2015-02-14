var React = require('react');
var Router = require('./ClientRouter');
var StateStore = require('../../stores/StateStore');

StateStore.setInitialState(window.location.pathname, JSON.parse(window.state));

Router.run(function (Handler, state) {
	StateStore.getState(state.path, function(data)
	{
  		React.render(React.createElement(Handler, data), document.body);
	});
});
