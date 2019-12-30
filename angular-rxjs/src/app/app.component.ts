import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { ToDoItem } from './store/models/todo.model';
import { AppState } from './store/state/todo.state';
import { AddTodo, ADD_TODO } from './store/actions/todo.actions';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // App component (base and parent of all components)

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) {
    // Get the data from the server and put on the storage via a service
    this.todoService.getAndPutStorage();
  }

  receivedItem(ev) {
    // This method will dispatch the action of add an item into the store
    // the data comes from the child component
    this.store.dispatch({type: ADD_TODO, payload: ev});
  }
}
