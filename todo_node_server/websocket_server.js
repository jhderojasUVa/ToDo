// Websocket https://github.com/websockets/ws
const Websocket = require('ws');
const fs = require('fs');

const wsServer = new Websocket.Server({
    port: 8080
});

const webSocketHelloConnection = {
    "connection": "ok",
    "application": "Websocket ToDo Application",
    "websocket version": 0.1
}

const messageError = {
    "error": true,
    "message": ""
}

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        // message contains all the data

        // TODO: refactor all of the cases in several functions for easy reading!
        try {
            const parseMessage = JSON.parse(message)
            switch (parseMessage.type) {
                case 'get':
                    // GET method
                    ws.send(getMessages(parseMessage));
                    break;
                case 'post':
                    // POST method
                    ws.send(postMessages(postMessages));
                    break;
                case 'update':
                    // Update method
                    ws.send(updateMessages(postMessages));
                    break;
                case 'delete':
                    // Delete method
                    ws.send(deleteMessages(postMessages));
                    break;
                case 'refactor':
                    // Refactor method
                    ws.send(refactorId());
                    break;
                default:
                    // For whatever message send all the ToDos to the user
                    ws.send(retrieveStore());
            }
        } catch (err) {
            console.log('cacacacaca', err);
            messageError.message = err;
            ws.send(JSON.stringify(messageError));
        }
    });

    // When the user connects send the hello with the version
    ws.send(JSON.stringify(webSocketHelloConnection));
})

function getMessages(message) {
    // Function for the get method of the websocket
    // @returns: the ToDos
    if (message.id !== undefined) {
        // If we have an id to see
        return retrieveToDo(message.id);
    } else {
        // If not, send all the ToDos
        return retrieveStore();
    }
}

function postMessages(message) {
    // Function for the post method of the websocket
    // @returns: the ToDos
    if (message.data && (message.data.whatToDo && message.data.completed)) {
        // If we have the needed data, save into the store
        return saveInStore(message.data.whatToDo, message.data.completed);
    } else {
        // Send an error if not
        messageError = 'Minimun data not retrieved: No whatToDo or/and completed sended';
        return JSON.stringify(messageError);
    }
}

function updateMessages(message) {
    // Function for the update method of the websocket
    // @returns: the ToDos
    if (message.data && (message.data.id && message.data.whatToDo && message.data.completed)) {
        // We have all we need
        return updateStore(message.data.id, message.data.whatToDo, message.data.completed);
    } else {
        // Oh oh, there's an error
        messageError = 'Minimun data not retrieved: No ID, whatToDo or/and completed sended';
        return JSON.stringify(messageError);
    }
}

function deleteMessages(message) {
    // Function for the delete method of the websocket
    // @returns: the ToDos
    if (message.data.id) {
        // Delete from the store
        return deleteStore(message.data.id)
    } else {
        // Oh oh, there's an error
        messageError = 'Minimun data not retrieved: No ID sended';
        return JSON.stringify(messageError);
    }
}

/**
 *  FileSystem functions
 * 
 *  TODO: Create a library for importing them!
 */

function retrieveStore() {
    // This function will retrieve the the content of the store file
    // @return (string)
    return fs.readFileSync(__dirname + '/store/file.json', (err, data) => {
      return data.toString();
    }).toString();
  }

function retrieveToDo(id) {
    // This function will return one ToDo by id
    // id (number)
    // @return ToDo (JSON)
  
    // First we test the arguments
    if (typeof id !== 'number' || isNaN(id)) {
      return JSON.stringify({'error' :true, 'cause': errorMessages.id});
    }
  
    let data = JSON.parse(retrieveStore());
  
    return JSON.stringify(data.ToDos.filter((element) => {
      return element.id == id;
    }));
  }

  function saveInStore(whatToDo, completed) {
    // Saves a ToDo in the store
    // whatToDo (string): Text to write
    // completed (boolean): if it's completed or not
    // @return (boolean)
  
    // Convert completed string to boolean
    completed = (completed == 'true');
  
    // This can be done in only one line, but on this ways is more readable
    // First we test the arguments
    if (typeof whatToDo != String && whatToDo == '') {
      return JSON.stringify({'error' :true, 'cause': errorMessages.whatToDo});
    }
  
    // Now if the completed is ok (it will be difficult to get here!)
    if (typeof completed !== "boolean") {
      return JSON.stringify({'error' :true, 'cause': errorMessages.completed});
    }
  
    let data = JSON.parse(retrieveStore());
    data.ToDos.push({
      'id': (data.ToDos[(data.ToDos.length - 1)].id) + 1,
      'whatToDo': whatToDo,
      'completed': completed
    });
    fs.writeFileSync(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log('There was an error saving the store file: ' + err);
      }
    });
  
    return JSON.stringify(data);
  }

  function updateStore(id, whatToDo, completed) {
    // Function that updates an item in the store
    // id (number)
    // whatToDo (string)
    // completed (boolean)
    // @return (string)
  
    completed = (completed == 'true');
  
    // First we test the arguments
    if (typeof id !== 'number' || isNaN(id)) {
      return JSON.stringify({'error': true, 'cause': errorMessages.id});
    }
  
    if (typeof whatToDo != 'string' && whatToDo == '') {
      return JSON.stringify({'error': true, 'cause': errorMessages.whatToDo});
    }
  
    if (typeof completed !== 'boolean') {
      return JSON.stringify({'error': true, 'cause': errorMessages.completed});
    }
  
    // First we retrieve the data
    let data = JSON.parse(retrieveStore());
  
    // Search and change the item
    data.ToDos.forEach((element) => {
      if (element.id == id) {
        element.whatToDo = whatToDo;
        element.completed = completed
      }
    });
  
    // Now save the file
    fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log('There was an error saving the store file: ' + err);
      }
    });
  
    return JSON.stringify(data);
  }

  function deleteStore(id) {
    // Function that removes an element from the store
    // id (number)
    // @return (string)
    // Check the argument
    if (typeof id !== 'number' || isNaN(id)) {
      return JSON.stringify({'error': true, 'cause': errorMessages.id});
    }
  
    // First we retrieve the data
    let data = JSON.parse(retrieveStore());
  
    // Now we remove the item with the id from the data
    data.ToDos = data.ToDos.filter((element, key) => {
      return element.id != id;
    });
  
    // Save to disk
    fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log('There was an error saving the store file: ' + err);
      }
    });
  
    return JSON.stringify(data);
  }
  
  function refactorId() {
    // Function that refactors the ids
    // @return (string)
  
    // First we retrieve the data
    let data = JSON.parse(retrieveStore());
  
    // Let's sort the elements by their IDs
    data.ToDos.sort((elemA, elemB) => {
      return elemA.id - elemB.id
    });
  
    // Now let's put the new IDs
    data.ToDos.forEach((element, key) => {
      element.id = key;
    });
  
    // And now, store into disk
    fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log('There was an error saving the store file: ' + err);
      }
    });
  
    return JSON.stringify(data);
  }