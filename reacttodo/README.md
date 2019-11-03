# Simple ToDo in react

This is the most simple ToDo in React and have too much to improve.

## Components

This have one parent component and two childs to help you to understand the most important principle in React, the two way binding from parent to child component.

Ths structure is:

``
parent (app.js) > todo form component
                > todo list component
``

### Parent (App component)

The base component created with create-react-app but changed from function to class. I know this is more slow but on this way I have not to create another component to handle all the data.

This component has the "storage", an array of ToDoS received from the form component and sended to the list component in order to show them.

### Form component

A very simple component with has the input (text) and a checkbox with a button to bubble the property called on the parent component to give the data to it.

Nothing more, nothing less.

### List component

A really simple one. Takes all the todos from the parent component (an array) and show them. The "most complicated thing" on it is the way to handle the change from completed to not (or viceversa) using an arrow function.

I know that it can be done with several functions, but on this way we don´t need to have an index of every todo with all the problem we can have it.

## Improvements

My first idea was to create an object and every time we create a todo we add a new object on the array, so for that I created an store. Maybe I will improve later to use that but for now, a simple array on the parent app component will handle the job.

The second one is to use the node server that saves/load/edit or what ever the todos. This can be done later and it's a great excercise to do :)

Third we can put Redux here to have a proper storage. And, if you (me) have time, save on both the storage and the node server (maybe a middleware -not to use those who are here- by observables will be a great idea, but not today... tomorrow).