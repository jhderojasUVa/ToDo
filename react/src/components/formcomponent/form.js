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
    this.setState({
      whattodo: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Submited '+this.state.whattodo);
    event.preventDefault;
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
