import React, { Component } from 'react';

const Todos = (props) => {  

    let todos = props.todos.map(todo => ( 
        <li key={todo._id}> 
            {todo.description}
            <button onClick={() => props.deleteTask(todo._id)}>Delete</button> 
        </li>
    )) 

    return (
        <div style={{color:props.color}}>            
            <hr />
            List: 
            <ul>
                {todos}
            </ul>
            
        </div>
    )
}


export default Todos
