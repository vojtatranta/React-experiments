var routes = require('./routes');
var List = require('../react/components/List.jsx');
var Item = require('../react/components/Item.jsx');
var Layout = require('../react/layouts/Layout.jsx');

routes.home.template = Layout;

routes.list.template = List;

routes.item.template = Item;

module.exports = routes;