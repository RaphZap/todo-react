import React from 'react';

const Todos = ( {todos, deleteTodo, markTodo} ) => {
    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div className="collection-item whole-item" key={todo.id}>
                        <div className="todo-content">
                            {!todo.isDone ? todo.content : <strike>{todo.content}</strike>}
                        </div>
                        <span>
                            <span onClick={() => {markTodo(todo.id)}} 
                                className="waves-light btn-small green my-btns">
                                <i className="material-icons">
                                    {todo.isDone ? 'check_box' : 'check_box_outline_blank'}
                                </i>                        
                            </span>  
                            <button onClick={() => {deleteTodo(todo.id)}} 
                                className="waves-light btn-small red">
                                <i className="material-icons">delete</i>                        
                            </button>                    
                        </span>
                </div>
            )
        })
    ) : <p className='center'>You have no items to do! Add some! Get busy!</p>;
    return (
        <div className="todos collection">
            {todoList}
        </div>
    )
}

export default Todos;

// className="right red-text"