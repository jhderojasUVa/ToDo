import React from 'react';

import styles from './App.css';

// Components
import TodoListComponent from './components/todolist.component';
import TodoFormComponent from './components/todoform.component';

// Store
import ToDo from './store/store';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: {
        text: '',
        completed: false
      },
      ToDoS: []
    }


    this.handleNewToDo = this.handleNewToDo.bind(this);
  }

  handleNewToDo(item) {
    // Add the todo
    let actualToDoS = this.state.ToDoS;
    actualToDoS.push(item);
    this.setState({
      ToDoS: actualToDoS
    })
  }

  render() {
    return (
      <div className="App">
        <TodoFormComponent addToDo={this.handleNewToDo}/>
        <TodoListComponent todos={this.state.ToDoS} />
      </div>
    );
  }
}

/*function App() {



  return (
    <div className="App">
      <TodoFormComponent />
      <TodoListComponent />
    </div>
  );
}
*/
export default App;
