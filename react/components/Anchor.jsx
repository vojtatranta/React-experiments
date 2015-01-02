/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');


var Anchor = React.createClass({
    displayName: 'Anchor',
    render: function () {
        return (
        	<a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>
        );
    },

    handleClick: function(e)
    {
		e.preventDefault();
		var self = this,
			href = this.props.href,
			url = href.replace('#', '');

		self.props.router.setRoute(href);
		
    },
});

module.exports = Anchor;