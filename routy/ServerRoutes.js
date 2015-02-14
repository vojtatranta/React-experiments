var routes = require('./routes');
var ItemView = require('../views/ItemView');
var ListView = require('../views/ListView');

routes.home.view = ListView;

routes.list.view = ListView;

routes.item.view = ItemView;

module.exports = routes;