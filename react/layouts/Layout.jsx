/** @jsx React.DOM */
var React = require('react');


module.exports = React.createClass({

	render: function()
	{
		return (
			<div className="main-wrapper container">
				<div className="content">
					<div className="row">
						<div className="col-md-12">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}

});