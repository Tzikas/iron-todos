import React, { Component } from 'react';

const Todos = (props) => {  //STEP 6 - creating stateless component & inheriting props 

    let todos = props.todos.map(todo => (//STEP 8 - mapping through props 
        <li key={todo._id}> 
            {todo.description}
            <button onClick={() => props.deleteTask(todo._id)}>Delete</button> {/*STEP 10*/}
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
