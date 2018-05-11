# AngularJS basic ToDo application

The purpose of this app its to make the default To Do app in AngularJS (on this case in AngularJS 1.6.9) with no cosmetic adds so you can understand how a basic AngularJS works.

## Before all

Before taking the steps of programming a basic app, please, take your time to think what do you want to do and how it will be the best way to do it for the purpose you want.

On this case, a very basic To Do app must have three important things:

1. An element have a text that tell you what to do and a state that says if it's done or not.

2. You must add an element.

3. You must delete it.

4. You must change the state of an element.

So, an extra to know how AngularJS works its to make it with more than one controller (you can read it latter) in order to know how different controllers interact with the same data. I know that it can be done with only one controller but, where is the fun?.

## The app

First of all you must create the module object. Because I will use two different controllers the best it's to call it (the method of angular for creating an app) on the index file. With this, we can separate every element on the app.

So, for these reason we create three files, two for the components and one for the "storage".

When meaning storage means that if you need to interchange data between different controllers you must have a warehouse, a central warehouse for all that data.

There are several ways to do it: by a service or by a factory. On these case we use a factory.

To be organized we create an 'src' directory where all the JS is and there, you can find three files:

```
src/factorycomponent.js
src/formcomponent.js
src/todolistcomponent.js
```

### How it work

The index will mount the app and the two components. Every component relay on the factory who have the definition and the methods where the to do data is.

![alt app architecture](http://https://github.com/jhderojasUVa/ToDo/img/architecture.png)

First at all we read the factory component that creates the "data store" called ToDoItems who is an object where as a property have an array called ToDoItem and several methods (create, add, delete, change state and retrieve all).

Second, we read the form component that controls the form. This component read the factory and have one $scope method function for the click event.

Third, takes de todo component who their way it's to show the todo list and helps to interact with the elements. So it's read the factory object too and have several $scope methods to change the state and delete. Very easy.


## Factory component

As before, on this component relays the data of the app. It's called ToDoItems.

It have a property, an array called ToDoItem who have "whattodo" (what to do) a string and "itsdone" wich is a boolean. The property it's outside the return so it's "protected".

It have several methods too. The user can use the methods so are in the return part.

There are a setItem method/function that creates an item so need the string and put always the itsdone to true. It can be better if needed so feel free to change, for example, for not putting two times the same to do or test if it's an string or whatever you want. It's easy.

The getItems method returns all the items. No more about it.

The changeStateItem changes from true or false the itsdone property of the array. The use of this it's that you can make an item as done but not deleting it. You can use it or not if you want. It need the index of the element in order to operate.

The deleteItem do as his name says, delete an item. It need the index of the element in order to work but AngularJS will help you with this. You can change this element using the text and a indexOf function, but there will be problem if there are two equal to do items.

## The Form controller

The form controller it's very easy. It have only one $scope (you know what an $scope is, if not, please see the AnguarlJS documentation) that relays on the click action with a function called addToDo and takes the $scope of the text of what to do calling the factory method. Simple.

Important on AngularJS are the $watch method of the $scope function. It's responsible of taking care when something changes. Not necessary on these case but here is. It can be used for test if the text (whattodo) is correct or do something with. On this example we do nothing so it's bidding on the form directly.

## The ToDo controller

This controller is the business controller and show the power of the $watch method.

In order to update the data you must know if the controller itself changes, so you can place a $watch on the controller by using it. So when calling the change you must update the content from the factory object, easy, and do "nothing" with the data changed.

The next $scope methods are for the delete and the status change, nothing special because the only thing you must do it's call their methods. Nothing important.
