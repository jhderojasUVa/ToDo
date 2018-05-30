import React, { Component } from 'react';

class TodoItemComponent extends Component {

  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  deleteItem(index) {
    console.log('deleteIndex = '+index);
  }

  changeItem(index) {
    console.log('changeItem = '+index);
  }

  render() {

    let items, itsdoneitem;

    if (this.props.items) {
      items = this.props.items.map((item, index) => {
        console.log(index);
        if (item.itsdone === true) {
          itsdoneitem = 'true';
        } else {
          itsdoneitem = 'false';
        }
        return (
          <li key={index}>{item.whattodo} - <a href={this.changeItem(index)}>{itsdoneitem}</a> - <a href={this.deleteItem(index)}>[X]</a></li>
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
