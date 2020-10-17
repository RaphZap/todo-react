import React from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';

class App extends React.Component {
  state = {
     todos : [
       {id: 1, content: 'mark items as finished', isDone: true},
       {id: 2, content: 'add a database', isDone: false},
       {id: 3, content: 'confirm deletion of item', isDone: false}
     ]
  }

  deleteTodo = (id) => {
    alert('Items will be permanently deleted! Are you sure you want to delete?');
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
    });
    // console.log(this.state);
  }

  markTodo = (id) => {  
    let todos = this.state.todos;
    let index = todos.findIndex( x => x.id === id);
    todos[index].isDone = !todos[index].isDone;
    this.setState({
      todos
    });
    console.log(todos);
  }

  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">My Todo List</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} markTodo={this.markTodo}/>
        <AddTodo addTodo={this.addTodo}/>
      </div>
    );
  }
}

export default App;
