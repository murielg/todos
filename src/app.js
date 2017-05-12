var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');//bridge
var firebase = require('firebase');
require('firebase/database');
var Header = require('./header');
var List = require('./list');
var config = {
  apiKey: process.env.TOKENVARNAME,
  databaseURL: "https://todos-1ed32.firebaseio.com",
  storageBucket: "todos-1ed32.appspot.com"
};
firebase.initializeApp(config);
global.config = config;
global.firebase = firebase;

var App = React.createClass({
  mixins : [ReactFire],
  getInitialState : function () {
    return {
      items : [],
      loaded : false
    }
  },
  componentWillMount : function () {
    var ref = firebase.database().ref("items/");
    this.bindAsArray(ref, "items");
    ref.on('value', this.handleDataLoaded);
  },
  handleDataLoaded : function () {
    this.setState({loaded : true});
  },
  render: function() {
    return <div className="todo-container panel">
      <h1>To Do</h1>
      <Header itemsStore={this.firebaseRefs.items}/>
      <List className={"todo-list " + (this.state.loaded ? 'visible' : '')} items={this.state.items} />
    </div> 
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
