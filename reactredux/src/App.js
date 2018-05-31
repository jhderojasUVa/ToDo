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
    // Two items as example
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

    this.handleChangeRoot = this.handleChangeRoot.bind(this);
  }

  handleChangeRoot(theitems) {
    // Simply force updating the components in order to call the child components with new data
    this.forceUpdate();
  }

  render() {

    return (
      <div className="App">
        <h1>ToDo</h1>
        <FormComponent items={this.state.items} onChange={this.handleChangeRoot}/>
        <br />
        <TodoItemComponent items={this.state.items}/>
      </div>
    );
  }
}

export default App;
