import { Action, Store } from '@ngrx/store';
import { ToDoItem } from '../models/todo.model';
import * as TodoActions from '../actions/todo.actions';

const initialState: ToDoItem = {
    what: 'Something to do',
    done: false
}

export function todoReducer(state: ToDoItem[] = [initialState], action: TodoActions.Actions) {
    let newState: ToDoItem[];
    switch (action.type) {
        case (TodoActions.ADD_TODO):
            if (state.find((element) => element.what == action.payload.what)) {
                return state;
            } else {
                return [
                    ...state,
                    action.payload
                ];;
            }
        case (TodoActions.REMOVE_TODO):
            newState = state.filter((element) => element.what !== action.payload.what);
            return newState;
        case (TodoActions.CHANGE_TODO):
            newState = state.map((element) => {
                if (element.what == action.payload.what) {
                    element.done = action.payload.done;
                }
                return element;
            });
            return newState;
        default:
            return state;    

    }
}