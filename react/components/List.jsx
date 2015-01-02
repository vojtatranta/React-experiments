/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');
var Layout = require('../layouts/Layout.jsx');
var Base = require('../app.jsx');
var A = require('./Anchor.jsx');

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
			<form onSubmit={this.formSubmitted}>
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

	formSubmitted: function(e)
	{
		e.preventDefault();
		this.props.formSubmitted(this.state);
		e.target.reset();
	}

});


var ItemLink = React.createClass({
    displayName: 'ItemLink',
    render: function () {
    	var item = this.props.item;
    	var url = '/item/' + item.id;
        return (
            <div><A href={url} router={this.props.router}>{item.title}</A></div>
        );
    }
});

module.exports = ItemLink;

var List = React.createClass({
	
	statics: {
		templateBase: Base,
		getTemplateBase: function()
		{
			return this.templateBase;
		},
	},
	

	linkClicked: function(e)
	{
		e.preventDefault();

		console.log(e);
	},

	getInitialState: function()
	{
		return this.props;
	},

	getDefaultProps: function()
	{
		return {
			router: null,
		}
	},

	render: function()
	{
		var self = this;

		return (
			Layout(this.props,
				<div className="list-form">
					<ItemForm formSubmitted={this.handleFormSubmit} />
					<div className="items">
					{this.props.items.map(function(item) {			
						return (
							<div className="wrapit">
								<ItemLink item={item} router={self.props.router} /> 
							</div>
						);
					})}
					</div>
				</div>
			)
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

		request.post('/').send(formState).end(function(err, response)
		{

		});

	}


});

module.exports = List;