# Angular basic ToDo application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

The purpose of this app its to make the default To Do app in Angular with no cosmetic adds so you can understand how a basic Angular works.

## Before all

Before taking the steps of programming a basic app, please, take your time to think what do you want to do and how it will be the best way to do it for the purpose you want.

On this case, a very basic To Do app must have three important things:

1. An element have a text that tell you what to do and a state that says if it's done or not.

2. You must add an element.

3. You must delete it.

4. You must change the state of an element.

So, an extra to know how AngularJS works its to make it with more than one controller (you can read it latter) in order to know how different controllers interact with the same data. I know that it can be done with only one controller but, where is the fun?.

## How it works

Easy. We made use of two different components and a model (with some fake info). One of the component is for the input text and show what you are typing (the same as the AngularJS option), this is the formcomponent. The other component its to show the result, the mytodos component.

For interchaging the data, wich are the to dos, we use a model (itemtodo.model) that have how a todo item is (whattodo and itsdone) and we create a fake content that can be filled by the array (on our case with the items) or by a REST service or whatever you need.

The form component creates elements in the model and the mytodos component shows the items and change the state or delete an item if needed. Simple.

## The app

It easy to see how the app its made. Inside the app directory you can find several directories where the components or the model are, and, inside the component directory every component have a directory where their files relay on.

```
/app/app.component (the root component with their typescript, css and html file)
/app/components/formComponent (form component with their typescript, css and html file)
/app/components/mytodos (my todo component with their typescript, css and html file)
/app/model/itemtodo.model.ts (the item model)
/app/model/items.ts (fake data)
```

## Components

Because you must know how to bind data between components, the ToDo App will have two components (yea, really there are not necessary but will be ok).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
