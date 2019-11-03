// Todo form component

import React from 'react';
//import ReactDOM from 'react-dom';


class TodoFormComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            completed: false,
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCompleteChange = this.handleCompleteChange.bind(this);
        this.sendToAddToDo = this.sendToAddToDo.bind(this);
    }

    sendToAddToDo() {
        // Pass to the parent
        this.props.addToDo(this.state);
        this.setState({
            text: '',
            completed: false
        });
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleCompleteChange(event) {
        this.setState({completed: !this.state.completed});
    }

    render() {
        let Fragment = React.Fragment;
        // <button onClick={this.props.greet}>Add todo</button>
        return(
            <Fragment>
                <label>What to do: </label>
                <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <input type="checkbox" checked={this.state.completed} onChange={this.handleCompleteChange}/>
                <button onClick={this.sendToAddToDo}>Add todo</button>
            </Fragment>
        )
    }

}

export default TodoFormComponent;