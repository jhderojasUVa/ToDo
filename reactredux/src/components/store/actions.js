// Actions

export const ADD_TODO = 'ADD_TODO';
export const CHANGEITSDONE_TODO = 'CHANGEITSDONE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Add a new item
export function addTodo(whattodo) {
  return {
    type: ADD_TODO,
    whattodo
  }
}

// Change if it's done or not
export function changeItsDone(index) {
  return {
    type: CHANGEITSDONE_TODO,
    index
  }
}

// Deleting item
export function deleteTodo(index) {
  return {
    type: DELETE_TODO,
    index
  }
}
