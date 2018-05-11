// ToDo List Controller
myTodoApp.controller('todolistcontroller', function($scope, ToDoItems) {
  // Warning up
  var items = [];
  // Setting the items
  $scope.totalitems = items.lenght;

  // Controlling the changes on the controller itself
  $scope.$watch(function() {
    $scope.totalitems = items.length;
    items = ToDoItems.getItems();
    $scope.items = items;
    return ToDoItems.getItems();
  }, function(newValue, oldValue) {
    // not really needed.
  });

  // The actions!
  $scope.deleteElement = function(elementIndex) {
    $scope.items = ToDoItems.deleteItem(elementIndex);
  }
  $scope.changeState = function(elementIndex) {
    $scope.items = ToDoItems.changeStateItem(elementIndex);
  }

});
