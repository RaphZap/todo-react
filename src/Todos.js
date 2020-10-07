import React from 'react';

const Todos = ( {todos, deleteTodo} ) => {
    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div className="collection-item whole-item" key={todo.id}>
                        <span className="todo-content" >{todo.content}</span>
                        <span onClick={() => {deleteTodo(todo.id)}} 
                            className="waves-light btn-small red">
                            <i className="material-icons">delete</i>                        
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