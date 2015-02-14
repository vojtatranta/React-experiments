/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');
var Link = require('react-router').Link;


var Anchor = module.exports = React.createClass({
    displayName: 'Anchor',

    render: function () {
        return (
            <Link to={this.props.name} params={this.props.params} >{this.props.children}</Link> 
        );
    },
});
