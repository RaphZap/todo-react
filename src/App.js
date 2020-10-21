import React from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';
import { v4 as uuid4 } from 'uuid';

class App extends React.Component {
  state = {
     todos : [
       {id: 1, content: 'mark items as finished', isDone: true},
       {id: 2, content: 'add a database', isDone: false},
       {id: 3, content: 'confirm deletion of item', isDone: true},
       {id: 4, content: 'maybe use modals instead of alert()/confirm()', isDone: false}
     ]
  }

  deleteTodo = (id) => {
    if (window.confirm('Todo item will be permanently deleted! Are you sure you want to delete?')) {
      const todos = this.state.todos.filter(todo => {
        return todo.id !== id
      });
      this.setState({
        todos
      });
    } else {
      // return
    }
  }

  addTodo = (todo) => {
    // alert if item is blank
    if (todo.content.length === 0 || todo.content.trim() === '') {
      alert('Todo item is empty!');
      return;
    }

    // npm install uuid
    todo.id = uuid4();
    // todo.id = this.state.todos.length ? this.state.todos.length + 1 : 1;
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    });
    console.log(this.state);
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
