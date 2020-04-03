// Import components with require
const createTodo = require('./components/createTodo/createTodo.component');
const listTodo = require('./components/showTodo/showTodo.component');

// Create the websocket object
var ws = new WebSocket("ws://localhost:8080/");

let get = {
    "type": "get"
}

if ('WebSocket' in window) {
    // Let's open the connection if the browser support websockets
    ws.open = () => {
        console.log('Connection to websocket open');
    }

    ws.onmessage = (message) => {

        let jsonMessage = JSON.parse(message.data);
        
        if (jsonMessage.connection == undefined) {
            // Search for the DOM element where to put the messages
            let showMessages = document.getElementsByTagName('app-show-messages');

            // Put the messages! :)
            showMessages[0].setAttribute('data', JSON.stringify(jsonMessage));
        } else {
            // Retrieve ToDos
            ws.send(JSON.stringify(get));
        }
    }

    ws.onclose = () => {
        console.log('Websocket connection clossed');
    }

} else {
    // Send a message to the client
    alert('Your browser doesn\'t support websockets!');
}

// Receive messages from the childs (Parent to child)
window.addEventListener('message' , (ev) => {
    // If we receive the message, then we send to the websocket
    const message = JSON.parse(ev.data);
    if (message && message.type && message.data) {
        // Sending the message
        console.log(ev.data);
        ws.send(ev.data);
    } else {
        // Error sending the message
        console.log('Error sending the message!')
    }
})