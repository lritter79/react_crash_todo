import React, { Component } from 'react';
import PropTypes from 'prop-types';

//the input field should be state for the component
export class AddTodo extends Component {
  state = {
    title: ''
  }

  onSubmit = (e) => {
    //prevent it from submitting to the actual file
    e.preventDefault();
    //pass the title up
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  }

                                    //as long as name is equal to whatever the field
                                    //is you can reuse this for different inputs
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Todo ..." 
          value={this.state.title}
          onChange={this.onChange}
        />
        <input 
          type="submit" 
          value="Submit" 
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo
