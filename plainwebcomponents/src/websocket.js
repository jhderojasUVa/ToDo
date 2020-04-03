let get = {
    'type': 'get'
}

if ('WebSocket' in window) {
    let ws = new WebSocket("ws://localhost:8080/");

    ws.open = () => {
        console.log('Connection to websocket open');
    }

    ws.onmessage = (message) => {
        console.log(message.data);
    }

    ws.onclose = () => {
        console.log('Websocket connection clossed');
    }
} else {
    alert('Your browser doesn\'t support websockets!');
}