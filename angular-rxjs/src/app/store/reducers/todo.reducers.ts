import { Action } from '@ngrx/store';
import { ToDoItem } from '../models/todo.model';
import * as TodoActions from '../actions/todo.actions';

const initialState: ToDoItem = {
    what: 'Something to do',
    done: false
}

export function todoReducer(state: ToDoItem[] = [initialState], action: TodoActions.Actions) {
    switch (action.type) {
        case (TodoActions.ADD_TODO):
            return [
                ...state,
                action.payload
            ];
        //case (TodoActions.REMOVE_TODO):
        //case (TodoActions.CHANGE_TODO):
        default:
            return state;    

    }
}