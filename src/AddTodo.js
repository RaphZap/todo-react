import React from 'react';

class AddTodo extends React.Component {
    state = {
        content: ' '
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            content: ''
        });
    }

    handleChange = (ev) => {
        this.setState({
            content: ev.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add new todo: </label>
                    <input type="text" onChange={this.handleChange} value={this.state.content}/>
                    <button onClick={this.handleSubmit} className="btn waves-effect waves-light">Enter
                    <i className="material-icons right">send</i></button>
                </form>
            </div>
        );
    }
}

export default AddTodo;