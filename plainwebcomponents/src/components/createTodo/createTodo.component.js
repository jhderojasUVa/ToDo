class CreateTodo extends HTMLElement {
    constructor() {
        // Inherit from the parent
        super();

        // Open the shadow DOM so it can be modified
        this.shadow = this.attachShadow({mode: 'open'});

        this.baseElement = document.createElement('div');

        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute('type', 'text');

        this.baseElement.append(this.inputElement);
        this.shadow.append(this.baseElement);
    }
}

// This lines defines de custom elements that we have just defined
customElements.define('app-create-todo', CreateTodo);