
require("babel/register");
var React = require('react');
require('node-jsx').install({harmony: true});

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');
var gzippo = require('gzippo');

var Router = require('react-router');

var reactRoutes = require('./routy/Router')

var Base = React.createFactory(require('./react/app.jsx'));

var app = express();

var all = require('when/keys').all;
var orm = require('orm');

var helpers = require('./utils/helpers');

var StateActions = require('./actions/StateActions');
var StateStoreKlass = require('./stores/StateStore');

app.use(orm.express("pg://node:node@localhost/node", {
    define: function (db, models, next) {
    	var allModels = require('./models')(db);
        for(var modelName in allModels)
        {
        	models[modelName] = allModels[modelName];
        }
        next();
    }
}));

app.use(gzippo.staticGzip(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


function flatten(stateArr)
{
	var ret = {};
	for(var i in stateArr)
	{
    var dict = stateArr[i];
    if (typeof dict == 'object')
		  ret = helpers.merge(ret, dict);
	}

	return ret;
}


app.get('*', (req, res) =>
{
	var router = Router.create({
		routes: reactRoutes,
		location: req.url
	});



	router.run((Handler, state) => {
    if (state.routes.length == 0)
      return res.status(404).send('404 NOT FOUND');

      var StateStore = new StateStoreKlass();

      StateStore.addChangeListener(() =>
      {
        var APP_STATE = StateStore.getState();
        StateStore.unregister();

        var json = JSON.stringify(APP_STATE);
        if (req.accepts('json') && !req.accepts('html'))
          return res.json(json)

        APP_STATE['bodyHTML'] = React.renderToString(React.createElement(StateStore.getHandler(), APP_STATE));

        var html = React.renderToString(React.createElement(Base, APP_STATE));

        res.send('<!doctype html>' + html + "<script>window.state = '" + json + "'</script>");

      });

		var promises = state.routes.map((route) =>
		{
			if (typeof route.handler.store != 'undefined')
				return route.handler.store.getInitialData(state, req.models);
		});

		all(promises).then((state) =>
		{
      StateActions.setInitialState({state: flatten(state), handler: Handler});
    });
  });
});

var port = process.env.PORT || 3333;
if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ' + port);
}
