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
  title = 'angular-rxjs';

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) {
    this.todoService.getAndPutStorage();
  }

  receivedItem(ev) {
    this.store.dispatch({type: ADD_TODO, payload: ev});
  }
}
