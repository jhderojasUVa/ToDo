import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ToDoItem } from '../models/todo.model';

export const ADD_TODO = '[Todo] ADD_TODO';
export const REMOVE_TODO = '[Todo] REMOVE_TODO';
export const CHANGE_TODO = '[Todo] CHANGE_TODO';

export class AddTodo implements Action {
    readonly type = ADD_TODO;
    constructor(public payload: ToDoItem) {}
}

export class RemoveTodo implements Action {
    readonly type = REMOVE_TODO;
    constructor(public payload: ToDoItem) {}
}

export class ChangeTodo implements Action {
    readonly type = CHANGE_TODO;
    constructor(public payload: ToDoItem) {}
}

export type Actions = AddTodo | RemoveTodo | ChangeTodo;