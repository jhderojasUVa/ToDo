# AngularRxjs

This demostrate (for now) how to work the typical ToDo app with Redux Store.

## How it works

It work with only two components and one service. One of the components for the form and other to show the list.

Apart from that there's an small storage that have the ToDos. Nothing more. A simple actions for add/remove or change an item and their reducers.

It have an small service that only reads from the node server the ToDos and put on the storage when running the web application. Very simple.

In fact, there's some child to parent event emmiting (for trying to have the logic on the parent component) and maybe, later, some logic will be transfer to the service (it must be done in that way).

And, finally, in the near future something to sync (but not a library, something custom made) the storage and the node server data.