/** @jsx React.DOM */

var React = require('react');

var Item = module.exports = React.createClass({

	render: function()
	{
		return (
			<div className="item-wrap">
				<h2>{this.props.item.title}</h2>
				<div className="content">{this.props.item.content}</div>
			</div>
			
		)
	},

	handleClick: function(e)
	{
		e.preventDefault();

		this.props.handleClick(e);
	}

});