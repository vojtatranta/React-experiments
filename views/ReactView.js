var TemplateView = require('./TemplateView');
var inheritance = require('../utils/inheritance');
var React = require('react');
var json = require('express-json');
var helpers = require('../utils/helpers');

var ReactView = function(request, response)
{
	inheritance._super(ReactView, this, 'constructor', arguments);

	this.template = null;
}
inheritance.inherits(ReactView, TemplateView);

ReactView.prototype.getTemplateData = function(extra)
{
	var base = helpers.merge(inheritance._super(ReactView, this, 'getTemplateData', arguments), extra || {});
	base['path'] = this.request.url;
	return base;
}

ReactView.prototype.renderReact = function(extraData)
{
	var tplData = this.getTemplateData(extraData);
	if (this.request.accepts('json') && ! this.request.accepts('html'))
	{
		return this.response.json(tplData);
	}

	var out = '<!doctype html>',
		viewTemplate = React.renderToString(React.createElement(this.template, tplData)),
		jsState =  "<script>window.state = '" + JSON.stringify(tplData) + "';</script>";

	if (typeof this.template['getTemplateBase'] !== 'undefined')
	{
		var base = this.template.getTemplateBase();
		if (base)
		{
			tplData['bodyHTML'] = viewTemplate;
			return this.render(out + React.renderToString(React.createElement(base, tplData)) + jsState);
		}
	}

	return this.render(out + viewTemplate + jsState);
}

module.exports = ReactView;