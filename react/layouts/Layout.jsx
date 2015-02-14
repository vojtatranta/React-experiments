/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;


module.exports = React.createClass({

	render: function()
	{
		return (
			<div className="main-wrapper container">
				<div className="content">
					<div className="row">
						<div className="col-md-12" id="route-handler">
							{RouteHandler(this.props)}
						</div>
					</div>
				</div>
			</div>
		);
	}

});