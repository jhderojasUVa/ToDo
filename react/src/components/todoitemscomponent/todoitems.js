import React, { Component } from 'react';

class TodoItemComponent extends Component {

  constructor(props) {
    super(props);

  }

  deleteItem(index) {
    // Delete an item by his index
    this.props.items.splice(index, 1);

    // Re-rendering the component in order to show the changes
    this.forceUpdate();
  }

  changeItem(index) {
    // Change an item by his index
    if (this.props.items[index].itsdone === true) {
      this.props.items[index].itsdone = false;
    } else {
      this.props.items[index].itsdone = true;
    }

    // Re-rendering the component in order to show the changes
    this.forceUpdate();
  }

  render() {

    let items;

    if (this.props.items) {
      items = this.props.items.map((item, index) => {
        if (item.itsdone === true) {
          itsdoneitem = 'true';
        } else {
          itsdoneitem = 'false';
        }
        return (
          <li key={index}>{item.whattodo} - <a onClick={this.changeItem.bind(this, index)}>{itsdoneitem}</a> - <a onClick={this.deleteItem.bind(this, index)}>[X]</a></li>
        )
      });
    }

    return (
      <div className="todoItemComponent">
      Total items ({this.props.items.length})
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default TodoItemComponent;
