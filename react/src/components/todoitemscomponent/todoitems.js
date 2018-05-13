import React, { Component } from 'react';

class TodoItemComponent extends Component {

  render() {

    let items;

    if (this.props.items) {
      items = this.props.items.map(item => {
        console.log(item);
        return (
          <li>{item.whattodo} - {item.itsdone}</li>
        )
      });
    }

    return (
      <div className="todoItemComponent">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default TodoItemComponent;
