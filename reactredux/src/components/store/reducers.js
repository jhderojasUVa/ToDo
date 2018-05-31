import { addTodo, changeItsDone, deleteTodo } from './actions.js';

function todoReducers(state, action) {

  switch (action.type) {
    case ADD_TODO:
      console.log('Action add');
      break;
    case CHANGEITSDONE_TODO:
      console.log('Action change item');
      break;
    case DELETE_TODO:
      console.log('Action delete item');
      break;
    default:
      return state;
  }
}
