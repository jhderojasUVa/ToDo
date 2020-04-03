class CreateTodo extends HTMLElement {
    constructor() {
        // Inherit from the parent
        super();

        // Open the shadow DOM so it can be modified
        this.shadow = this.attachShadow({mode: 'open'});

        this.baseElement = document.createElement('div');

        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute('type', 'text');

        this.buttonSubmit = document.createElement('button');
        this.buttonSubmit.innerHTML = 'Submit new ToDo';

        this.buttonSubmit.addEventListener('click', () => {
            this._sendToDo(this.inputElement.value);
        })

        this.baseElement.appendChild(this.inputElement);
        this.baseElement.appendChild(this.buttonSubmit);
        this.shadow.appendChild(this.baseElement);
    }

    _sendToDo(data) {
        // Compose the message
        const postMessage = {
            "type": "post",
            "data": {
                "whatToDo": data,
                "completed": false
            }
        };

        if (data && data !== '') {
            // If we are sending something let's speak with the parent
            parent.postMessage(JSON.stringify(postMessage), document.baseURI);
        }
    }
}

// This lines defines de custom elements that we have just defined
customElements.define('app-create-todo', CreateTodo);