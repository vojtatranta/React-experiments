
var React = require('react');

module.exports = React.createClass({
	render: function()
	{
		return (
			<html>
				<head>
					<title>{this.props.title}</title>
					<link rel="stylesheet" href="/dist/css/main.css" />
					<link rel="shortcut icon" href="/dist/img/favicon.ico"/>
				</head>
				<body dangerouslySetInnerHTML={{__html: this.props.bodyHTML}} />
				<script src="/dist/js/bundle.js" async></script>
			</html>
		);
	}
});
