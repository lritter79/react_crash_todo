import React, { Component } from 'react';
import TodoItem from './TodoItem'
//proptypes are validation for properties that a component should have
//set type, set if theyre required, etc.
import PropTypes from 'prop-types';

//component files should be named using pascal case
class Todos extends Component {
  render() {
    //this says "for each todo in todos, return this jsx"
    return this.props.todos.map((todo) => (
                //when we mad through something we create a lsit and need keys
                //key should be something unique
                //{todo} is a property
                
      <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete}
       delTodo={this.props.delTodo} />
    ));
  }
}

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

export default Todos;