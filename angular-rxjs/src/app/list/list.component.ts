import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToDoItem } from '../store/models/todo.model';
import { AppState } from '../store/state/todo.state';
import { CHANGE_TODO, REMOVE_TODO } from '../store/actions/todo.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // This component will show the list of ToDo items

  todos: Observable<ToDoItem[]>; // Observable that receives the ToDo items from the store

  constructor(
    private store: Store<AppState> // Store
  ) {
    // Read from the store (select) and put on the variable to view
    this.todos = this.store.select('todo');
   }

  ngOnInit() {
  }

  change(todo: ToDoItem) {
    // This will change the status from done to not done or viceversa
    const newTodo = {
      what: todo.what,
      done: todo.done ? false : true
    }
    // This dispatch the action change to the store
    this.store.dispatch({type: CHANGE_TODO, payload: newTodo})
  }

  remove(todo: ToDoItem) {
    // Remove a todo
    // This will dispatch the action of removing an item from the store
    this.store.dispatch({type: REMOVE_TODO, payload: todo});
  }

}
