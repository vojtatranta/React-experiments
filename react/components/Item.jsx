
var React = require('react');

var Item = module.exports = React.createClass({

	statics: {
		store: require('../../stores/ItemStore')
	},

	getInitialState: function()
	{
		return {item: Item.store.getSelected()};
	},

	render: function()
	{
		return (
			<div className="item-wrap">
				<h2>{this.state.item.title}</h2>
				<div className="content">
					{this.state.item.text}
				</div>
			</div>
		)
	},

	handleClick: function(e)
	{
		e.preventDefault();

		this.props.handleClick(e);
	}

});
