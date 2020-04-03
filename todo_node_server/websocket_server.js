// Websocket https://github.com/websockets/ws
const Websocket = require('ws');
const os = require('os');

// File library for the storage
const fsLib = require('./file.lib');
const { RSA_NO_PADDING } = require('constants');

const websocketPort = 8080;
const version = 0.1

const wsServer = new Websocket.Server({
    port: websocketPort
});

const webSocketHelloConnection = {
    "connection": "ok",
    "application": "Websocket ToDo Application",
    "websocket version": version
}

const messageError = {
    "error": true,
    "message": ""
}

// Socket opened (array)
var socketClient = [];

wsServer.on('connection', (ws) => {

    socketClient.push(ws);
    //ws.id = socketClient.length;

    ws.on('message', (message) => {
        // message contains all the data

        // TODO: refactor all of the cases in several functions for easy reading!
        try {
            const parseMessage = JSON.parse(message)
            switch (parseMessage.type) {
                case 'get':
                    // GET method
                    socketClient.forEach((socket) => {
                        socket.send((getMessages(parseMessage)));
                    })
                    break;
                case 'post':
                    // POST method
                    ws.send(postMessages(parseMessage));

                    socketClient.forEach((socket) => {
                        socket.send((getMessages(parseMessage)));
                    })
                    break;
                case 'update':
                    // Update method
                    ws.send(updateMessages(parseMessage));

                    socketClient.forEach((socket) => {
                        socket.send((getMessages(parseMessage)));
                    })
                    break;
                case 'delete':
                    // Delete method
                    ws.send(deleteMessages(parseMessage));

                    socketClient.forEach((socket) => {
                        socket.send((getMessages(parseMessage)));
                    })
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
            messageError.message = err;
            ws.send(JSON.stringify(messageError));
        }
    });

    // When the user connects send the hello with the version
    ws.send(JSON.stringify(webSocketHelloConnection));
})

// Send status to the console
console.log(`WebSocket server running on port ${websocketPort}\r\nConnect via ws://${os.hostname()}:${websocketPort}`);

function getMessages(message) {
    // Function for the get method of the websocket
    // @returns: the ToDos
    if (message.id !== undefined) {
        // If we have an id to see
        return fsLib.retrieveToDo(message.id);
    } else {
        // If not, send all the ToDos
        return fsLib.retrieveStore();
    }
}

function postMessages(message) {
    // Function for the post method of the websocket
    // @returns: the ToDos
    if (message.data && (message.data.whatToDo && message.data.completed)) {
        // If we have the needed data, save into the store
        return fsLib.saveInStoreNoReturn(message.data.whatToDo, message.data.completed);
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
        return fsLib.updateStoreNoReturn(message.data.id, message.data.whatToDo, message.data.completed);
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
        return fsLib.deleteStoreNoReturn(message.data.id)
    } else {
        // Oh oh, there's an error
        messageError = 'Minimun data not retrieved: No ID sended';
        return JSON.stringify(messageError);
    }
}