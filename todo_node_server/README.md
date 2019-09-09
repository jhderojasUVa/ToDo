# Node REST server

Because it will be nice to have a simple rest service without creating complex things I have done this.

It runs on port 3000 but you can change if you need it.

http://localhost:3000/

It stores the data in memory on the object called:

todoData = [
  {
    id: ID NUMBER,
    whatToDo: 'STRING ABOUT WHAT TO DO',
    completed: boolean (true|false)
  }
]

A very simple REST node that you can execute and make the petitions:

## /get

It will respond all the ToDos, no more no less in JSON format.

## /post

Add ToDos with this!. No need to tell the ID. Example:

http://localhost:3000/post?whatToDo=Something&completed=false

## /delete

Remove a ToDo by his id. Example:

http://localhost:3000/delete?id=2

If the id doesn't exist, it will delete nothing :)

## /update

Will change/update a ToDo by his id. Example:

http://localhost:3000/update?id=1&whatToDo=Anything&completed=false

Will change the ToDo with id number 1 putting the content sent. Nothing more, nothing less

## Do what you want

Because it's so simple and need no libraries, do what ever you want, for example, you can create a cache that stores the data on disk or create an html files (on disk) to retrieve when the user calls some urls or whatever you want. It's free :)