import React, { Component } from 'react'
//this is for routing
                  //this is an alias
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//this is for generating unique id's
import uuid from 'uuid';
//axios is a library for making api requests
import axios from 'axios';

import './App.css';


class App extends Component {
  //todos is an array of objects
  //we want to pass these down to the Todos component
  // think about state as a cloud
  //props evaporate back up to state and whatever goes in gets
  //"rained" down
  state = {
    todos: []
  };

  //this runs right after components mounts and is used for making initial requests
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10', { crossDomain: true })
      //take the data from response from the request and use its data
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  // the component gets drilled into the todo item component
  //the todoitem calls it, then Todos calls it, then app calls it
  //then markComplete changes the state
  //to know which one is getting changed, we pass in the id
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        //check to see if that is id equal to the one passed in
        //and toggle it
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
    //state then goes back down to components
  };

  // Delete Todo
  delTodo = id => {
    //to make a delete request we need the id and the url
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, { crossDomain: true }).then(res =>
      this.setState({
        //return any todo where the id isnt the id that was passed in
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  // Add Todo
  addTodo = title => {
    /*
      without axios 
      const newTodo = {
        id:4,
        title,
        completed: false
      }
    this.setState({ todos: [...this.state.todos, newTodo] });
    */
   //this doesnt save it to their server but it 
   //mimicks a real life backend
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      }, { crossDomain: true })
      .then(res => {
        res.data.id = uuid.v4();
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  };

  render() {
    return (
      //we have to keep everything wrapped in the router to have routing
      //'exact path="/"' makes it so that we only see that component when the path is "/"
      //if it's anything besides that, it wont be in the dom
      //otherwise, you could could see it whenever the path has a "/" in it
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                </React.Fragment>
              )}/>
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
