myTodoApp.factory('ToDoItems', function(){
  // This factory it's for creating the list of to do items
  // Creating a service that it's a singleton create a unique object
  // shared between components

  // The item
  var ToDoItem = [];

  var thing = '';

  // The methods
  return {
    setItem: function(whattodo, itsdone) {
      // Setting the ToDoItem with new item :)
      element = {
        whattodo: whattodo,
        itsdone: itsdone
      };

      ToDoItem.push(element);
      return ToDoItem;
    },
    getItems: function() {
      // Getting all the items
      return ToDoItem;
    },
    changeStateItem: function(index) {
      // Change the state of an element
      whattodo = ToDoItem[index].whattodo;
      itsdone = true;

      if (ToDoItem[index].itsdone == true) {
        itsdone = false;
      } else {
        itsdone = true;
      }

      ToDoItem[index] = {
        whattodo: whattodo,
        itsdone: itsdone
      }
      console.log('Change State');
      console.log(ToDoItem);
      return ToDoItem;
    },
    deleteItem: function(index) {
      // Delete an item
      ToDoItem.splice(index, 1);
      return ToDoItem;
    }
  }

});
