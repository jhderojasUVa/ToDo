import React, { Component } from 'react';

// Because don't use Redux as a storage central we use the method of a parent component (App) that have two child components (formComponent and todoItemComponent)
// Components
import FormComponent from './components/formcomponent/form';
import TodoItemComponent from './components/todoitemscomponent/todoitems';

// Generic CSS
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      items: [
        {
          whattodo: 'Something',
          itsdone: true
        },
        {
          whattodo: 'Anything',
          itsdone: false
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ToDo</h1>
        <FormComponent/>
        <TodoItemComponent items={this.state.items}/>
      </div>
    );
  }
}

export default App;
