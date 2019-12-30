import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ADD_TODO } from './store/actions/todo.actions';
import { AppState } from './store/state/todo.state';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // ToDo service for retrieving the data from the server (node server)

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    
   }

   getAndPutStorage() {
    // Get elements from the server and put them on the storage
    // Create the URL (can be done via config)
    const url = 'http://127.0.0.1:8080/get';
    // Get the data
    this.http.get(url).subscribe((element: any) => {
      element.ToDos.forEach((element) => {
        // Add the data via dispatching an action with the content
        // TODO do it in a better way
        this.store.dispatch({
          type: ADD_TODO,
          payload: {
            what: element.whatToDo,
            done: element.completed
          }
        })
      });
    }); 
   }
}
