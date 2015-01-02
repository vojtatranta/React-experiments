var StateStore = require('../../stores/StateStore');

module.exports = function(template, router, routeParams)
{
	StateStore.getState(function(state)
	{
		state['router'] = router;
		state['params'] = routeParams;
		React.render(template(state), document.body);
	});	
}