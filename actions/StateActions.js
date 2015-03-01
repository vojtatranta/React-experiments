var Dispatcher = require('../dispatcher/Dispatcher');
var request = require('superagent');

module.exports = {
  setInitialState: (appState) =>
  {
    Dispatcher.handleViewAction({
      actionType: 'SET_INITIAL_STATE',
      state: appState
    });
  },

  navigate: (params) =>
  {
    request.get(params.routerState.path).accept('json').end((res) =>
    {
      Dispatcher.handleViewAction({
        actionType: 'NAVIGATE',
        state: {state: JSON.parse(res.body), handler: params.handler}
      });
    });
  }
};
