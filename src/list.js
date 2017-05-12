var React = require('react');
var ListItem = require('./list-item');
module.exports = React.createClass({
  render : function (){
    return <div className={this.props.className}>
      {this.renderList()}
    </div>
  },
  renderList : function () {
    var items = [];

    if (this.props.items.length === 0) {
      return <h4>
        What are your to-dos? Start adding some!
      </h4>
    } else {
      this.props.items.map(function (item, index) {
        item.key=item['.key'];
        items.push(
          <ListItem
            item = {item}
            key = {item.key}
          >
          </ListItem>
        )
      });
      return items;
    }
  }
});
