# Node REST server and WebSocket Server

Because it will be nice to have a simple rest service without creating complex things I have done this.

## How to run

1. Install Node from https://nodejs.org
2. run: node web_server.js (for the webserver version)
3. run: node websocket_server.js (for the websocket version)
3. Done!

It runs on port 3000 but you can change if you need it.

http://localhost:3000/

It stores the data in memory on the object called:

```
todoData = [
  {
    id: ID NUMBER,
    whatToDo: 'STRING ABOUT WHAT TO DO',
    completed: boolean (true|false)
  }
]
```

Now it stores in disk on a directory called "store" in a file called "file.json" with this structure for better readability and future improvements.

```
{
    "ToDos": [
        {
            "id": "1",
            "whatToDo": "nothing",
            "completed": true
        }
    ]
}
```

Thinking about letting you to choose saving the data on memory, on file, on local storage and on session storage, because... why not?.

## REST webserver

A very simple REST node that you can execute and make the petitions:

## /get

It will respond all the ToDos, no more no less in JSON format. Example:

http://localhost:3000/get

You can also, get one item by his id:

http://localhost:3000/get?id=1

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

## /refactor

Clean the gaps between the IDs of the elements after some use. It's like the reorder in MySQL but more dirty.

## Websocket server

Is a working progress. The idea is to have a websocket so many users can get/update/post/etc... todos and colaborate between them (the idea).

Is a JSON websocket so the communication with the server is done via JSON data and will respond allways with a JSON.

# Message to send

The message must have this structure:

```
{
  "type": "get" | "post" | "delete" | "update"
}
```

If you need to send data needed for the operation must be on the data property, except for the get. So if you want to retrieve the todo with id 3:

```
{
  "type": "get",
  "id": 3
}
```

Or, if you want to retrieve all the todos:

```
{
  "type": "get"
}
```

Or if you want, for example, to add a new todo:

```
{
  "type": "post",
  "data": {
    "whatToDo": "Here is what I will do",
    "completed": true | false
  }
}
```

The message returned will be the same like the Rest server.

## File library

For better and easy reading I have created a file storage library who takes care of the storage (retrieves, saves, updates, refactors and so on) on file file.lib.js

I know that the exports and the library can be done in a better way but this is a fast solution.

## Do what you want

Because it's so simple and need no libraries, do what ever you want, for example, -you can create a cache that stores the data on disk- or create an html files (on disk) to retrieve when the user calls some urls or whatever you want. It's free :)

