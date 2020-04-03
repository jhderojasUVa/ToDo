class ShowTodo extends HTMLElement {
    constructor() {
        // Inherit from the parent
        super();

        // Open the shadow DOM so it can be modified
        this.shadow = this.attachShadow({mode: 'open'});

        this.baseElement = document.createElement('div');
        this.baseElement.innerHTML = '<h1>ToDos list</h1>';

        this.shadow.appendChild(this.baseElement);
    }

    get data() {
        // getter for the data property
        return this.processData
    }

    set data(data) {
        // setter for the data property
        this.processData = JSON.parse(data);
    }

    static get observedAttributes() {
        // This STATIC getter is what will manage what properties the browser must be aware of changing
        return ['data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // This hook will handle the change of the properties of the element

        if (name === 'data' && oldValue != newValue) {
            // If the data has changed, parse it and populate the content
            this.processData = JSON.parse(newValue);
            this._removeOldTodo();
            this._populate();
        }
    }

    _populate() {
        // Populate the list
        if (this.processData) {
            this.ul = document.createElement('ul');
            
            // Put every ToDo
            if (this.processData.ToDos) {
                this.processData.ToDos.forEach((element) => {
                    let li = document.createElement('li');
                    li.innerHTML = element.whatToDo;
                    this.ul.appendChild(li);
                })
            } else {
                console.log('Error getting the data.')
                console.log(this.processData);
            }

            this.shadow.appendChild(this.ul);
        }
    }

    _removeOldTodo() {
        // Removing old Todo
        if(this.ul) {
            this.ul.remove();
        }
    }
}

// This lines defines de custom elements that we have just defined
customElements.define('app-show-messages', ShowTodo);