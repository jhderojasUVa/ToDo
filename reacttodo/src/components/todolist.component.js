// Todo list component

import React from 'react';

class TodoListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.changeElement = this.changeElement.bind(this);
    }

    changeElement(element) {
        element.completed = !element.completed;
        this.forceUpdate();
    }

    render() {
        let Fragment = React.Fragment;

        let listOfToDoS = this.props.todos.map((element, index) => {
            if (element.completed === true) {
                return <li key={index}><a onClick={() => this.changeElement(element)}><del>{element.text}</del></a></li>
            } else {
                return <li key={index}><a onClick={() => this.changeElement(element)}>{element.text}</a></li>
            }
        });

        return(
            <Fragment>
                <ul>
                    {listOfToDoS}
                </ul>
            </Fragment>
        )
    }

}

export default TodoListComponent;