var React = require('react');

module.exports = React.createClass({
  getInitialState : function () {
    return {
      text : this.props.item.text,
      done : this.props.item.done,
      textChanged : false
    }
  },
  componentWillMount : function () {
    this.ref = firebase.database().ref("items/" + this.props.item.key);
  },
  handleDoneChange : function (event) {
    var update = {done : event.target.checked};
    this.setState(update);
    firebase.database().ref("items/" + this.props.item.key).update(update);
  },
  handleDelete : function () {
    this.ref.remove();
  },
  handleTextChange : function (event) {
    this.setState({
      text : event.target.value,
      textChanged : true
    });
  },
  changesButtons : function () {
    if (!this.state.textChanged) {
      return null;
    } else {
      return [
        <button
          className="btn btn-default"
          onClick={this.handleSaveClick}
        >
          Save
        </button>,
        <button
          className="btn btn-default"
          onClick={this.handleUndo}
          >
          Undo
        </button>
      ]
    }
  },
  handleUndo : function () {
    this.setState({
      text : this.props.item.text,
      textChanged : false
    })
  },
  handleSaveClick : function () {
    this.ref.update({text:this.state.text});
    this.setState({
      textChanged : false
    })
  },
  render : function (){
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange}
        />
      </span>
      <input type="text"
        value={this.state.text}
        onChange={this.handleTextChange}
        disabled={this.state.done}
      />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDelete}
        >
          Delete
        </button>
      </span>
    </div>
  }
});