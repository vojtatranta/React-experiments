/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');
var Layout = require('../layouts/Layout.jsx');
var Base = require('../app.jsx');
var request = require('superagent');

var Item = React.createClass({

	statics: {
		templateBase: Base,
		getTemplateBase: function()
		{
			return this.templateBase;
		},
	},

	render: function()
	{
		console.log(this.props);
		return (
			Layout(this.props,
				<div className="item-wrap">
					<h2>{this.props.item.title}</h2>
					<div className="content">{this.props.item.content}</div>
				</div>
			)			
		)
	},

	handleClick: function(e)
	{
		e.preventDefault();

		this.props.handleClick(e);
	}

});

module.exports = Item;