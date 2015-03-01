
var React = require('react');
var Layout = require('../layouts/Layout.jsx');
var Router = require('react-router')
var Base = require('../app.jsx');
var Link = React.createFactory(require('react-router').Link);
var ItemActions = require('../../actions/ItemActions');

var ItemStore = require('../../stores/ItemStore');

var ItemForm = React.createClass({


	getInitialState: function()
	{
		this.state = {};
		this.state.title = '';
		this.state.content = '';
		return this.state;
	},

	handleStateChange: function(e)
	{
		var el = e.target,
			newState = {};
		newState[el.name] = el.value;
		this.setState(newState);
	},

	render: function()
	{
		return (
			<form onSubmit={this._handleSubmit}>
				<div className="form-row form-group">
					<input name="title" className="form-control" onChange={this.handleStateChange} />
				</div>
				<div className="form-row form-group">
					<textarea name="content" className="form-control" onChange={this.handleStateChange} />
				</div>
				<div className="form-row form-btns form-group">
					<button className="btn btn-success">Send</button>
				</div>
			</form>
		);
	},

	_handleSubmit: function(e)
	{
		e.preventDefault();
		ItemActions.add(this.state)
		e.target.reset();
	}

});


var ItemLink = React.createFactory(React.createClass({

    displayName: 'ItemLink',

    render: function () {
		var item = this.props.item;
        return (
            <div>
							<Link to={this.props.name} params={{id: item.id}}>
								<span>{item.title}</span>
							</Link>
            </div>
        );
    }
}));


var List = React.createClass({

	statics: {
		store: ItemStore,
	},

	linkClicked: function(e)
	{
		e.preventDefault();

		console.log(e);
	},

	getInitialState: function()
	{
		return {items: List.store.getAll()};
	},

	getDefaultProps: function()
	{
		return {
			router: null,
		}
	},

	componentDidMount: function()
	{
		List.store.addChangeListener(this._onChange);
	},

	componentWillUnmount: function()
	{
		List.store.removeChangeListener(this._onChange);
	},

	_onChange: function()
	{
		List.store.getAll();
	},

	render: function()
	{
		return (
			<div className="list-form">
				<div className="items">
				{this.state.items.map(function(item) {
					return (
						<div className="wrapit">
							<ItemLink item={item} name='item' />
						</div>
					);
				})}
				</div>
			</div>
		);
	},

	handleFormSubmit: function(formState)
	{
		var items = this.state.items;
		formState['id'] = items.length;
		items.push(formState);
		this.setState({
			items: items
		});

	}
});

module.exports = List;
