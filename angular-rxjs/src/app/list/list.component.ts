import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToDoItem } from '../store/models/todo.model';
import { AppState } from '../store/state/todo.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todos: Observable<ToDoItem[]>;

  constructor(
    private store: Store<AppState>
  ) {
    //this.todos = this.store.select('todo').subscribe();
    this.todos = this.store.select('todo');
    console.log(this.todos);
   }

  ngOnInit() {
  }

}
