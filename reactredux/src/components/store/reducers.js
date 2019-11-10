import { addTodo, changeItsDone, deleteTodo } from './actions.js';

function todoReducers(state, action) {

  var store = [];

  switch (action.type) {
    case ADD_TODO:
      console.log('Action add');
      store.push(action.payload);
      break;
    case CHANGEITSDONE_TODO:
      console.log('Action change item');
      store[action.payload.id] = store.playload;
      break;
    case DELETE_TODO:
      console.log('Action delete item');
      store.remove();
      break;
    default:
      return state;
  }
}