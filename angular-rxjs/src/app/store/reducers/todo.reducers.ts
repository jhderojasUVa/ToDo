// This file contains the reducers or how the actions are executed
import { Action, Store } from '@ngrx/store';
import { ToDoItem } from '../models/todo.model';
import * as TodoActions from '../actions/todo.actions';

// Inital state of the store (this can be changed or loaded via the service)
const initialState: ToDoItem = {
    what: 'Something to do',
    done: false
}  

export function todoReducer(state: ToDoItem[] = [initialState], action: TodoActions.Actions) {
    // This function contains the reducers
    let newState: ToDoItem[];
    switch (action.type) {
        case (TodoActions.ADD_TODO):
            // Add action
            if (state.find((element) => element.what == action.payload.what)) {
                // If the element exists on the store, we don't add it
                return state;
            } else {
                // Add the element
                return [
                    ...state,
                    action.payload
                ];
            }
        case (TodoActions.REMOVE_TODO):
            // Remove action
            // Returns all the items in the state except the one to remove
            newState = state.filter((element) => element.what !== action.payload.what);
            return newState;
        case (TodoActions.CHANGE_TODO):
            // Change action
            // Will walk into the elements on the store until find the one
            // we want to change and, change it
            newState = state.map((element) => {
                if (element.what == action.payload.what) {
                    element.done = action.payload.done;
                }
                return element;
            });
            return newState;
        default:
            // If not, always returns the state
            return state;    
    }
}