import { ToDoItem } from '../models/todo.model';

export interface AppState {
    readonly todo: ToDoItem[];
}