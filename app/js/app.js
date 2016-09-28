var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://todos-1ed32.firebaseio.com/';

var Hello = React.createClass({
  componentWillMount : function () {
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items')
  },
  render: function() {
    return <h1>
      Hello World!
    </h1>
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));