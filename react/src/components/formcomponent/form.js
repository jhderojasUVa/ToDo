import React, { Component } from 'react';

class FormComponent extends Component {

  constructor(props) {
    super (props);
    this.state = {
      whattodo: ''
    }

    this.handleWrite = this.handleWrite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWrite(event) {
    // Handle the text change for putting the text
    this.setState({
      whattodo: event.target.value
    });
  }

  handleSubmit(event) {
    // First, prevent the form to send the data
    event.preventDefault();
    
    // Addiding an item
    this.props.items.push({
      whattodo: this.state.whattodo,
      itsdone: true
    });

    // Passing data to the parent
    this.props.onChange(this.props.items);
  }

  render() {
    return (
      <div className="FormComponent">
        <p>I want to do {this.state.whattodo}</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="whattodo" value={this.state.whattodo} onChange={this.handleWrite}/> <input type="submit" value="Add me!" />
        </form>
      </div>
    );
  }
}

export default FormComponent;
