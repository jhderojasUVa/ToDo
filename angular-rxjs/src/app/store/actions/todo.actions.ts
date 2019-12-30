// This file contains the action of the Redux Store
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToDoItem } from '../models/todo.model';

// This are the string constants of the actions
export const ADD_TODO = '[Todo] ADD_TODO';
export const REMOVE_TODO = '[Todo] REMOVE_TODO';
export const CHANGE_TODO = '[Todo] CHANGE_TODO';

export class AddTodo implements Action {
    // This will implement the add item action
    readonly type = ADD_TODO;
    constructor(public payload: ToDoItem) {}
}

export class RemoveTodo implements Action {
    // This implements the remove item action
    readonly type = REMOVE_TODO;
    constructor(public payload: ToDoItem) {}
}

export class ChangeTodo implements Action {
    // This implements the change item action
    readonly type = CHANGE_TODO;
    constructor(public payload: ToDoItem) {}
}

// Export of all the actions
export type Actions = AddTodo | RemoveTodo | ChangeTodo;