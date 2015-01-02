var View = require('./View');
var inheritance = require('../utils/inheritance');
var helpers = require('../utils/helpers');

var TemplateView = function(req, res)
{
	inheritance._super(TemplateView, this, 'constructor', arguments);

	this.template = null;
	this.templateData = {};
	this.title = '';
}
inheritance.inherits(TemplateView, View);

TemplateView.prototype.render = function(markup)
{
	this.response.send(markup);
}

TemplateView.prototype.getTemplateData = function(data)
{
	var base = this.templateData;
	base['title'] = this.title;
	if (data)
		return helpers.merge(base, data);
	return base;
}	

module.exports = TemplateView;