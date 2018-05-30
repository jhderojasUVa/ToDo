// Form Controller
// This controller it's easy, you must load the service component where the to do items are
// and call the method setItem when you push the buttom that relay on the scope
myTodoApp.controller('formcontroller', function($scope, ToDoItems) {
  $scope.addToDo = function() {
    ToDoItems.setItem($scope.whattodo, true);
  }
  // Creating the watch for what to do if the data changes
  // Not really needed but sounds good
  $scope.$watch('whattodo', function(newValue, oldValue){
    if (newValue !== oldValue) {
      // Nothing here, but if you need it...
    }
  });
});
