import React from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';

class App extends React.Component {
  state = {
     todos : [
       {id: 1, content: 'buy some milk', isDone: true},
       {id: 2, content: 'play mario kart', isDone: false}
     ]
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos
    })
  }

  addTodo = (todo) => {
    // todo.id = Math.random();
    todo.id = this.state.todos.length ? this.state.todos.length + 1 : 1;
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    })
    console.log(this.state);
  }

  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">My Todo List</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}/>
        <AddTodo addTodo={this.addTodo}/>
      </div>
    );
  }
}

export default App;
