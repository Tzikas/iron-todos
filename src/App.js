import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'  
import {serverURL} from './config'
import Todos from './Todos.js'
import { //STEP 14 - Import actions 
  signUp,
  logIn,
  logOut,
  loggedIn
} from './authActions'
import { 
  getTasks,
  postTask,
  deleteTask,
  editTask
} from './todoActions'



class Home extends Component {
    state = {  
          todos: []
    }


    async componentDidMount(){  
        this.getTasks() 
    }
    getTasks = async() => {
        let todos =  await getTasks();
        console.log( ' todos ',  todos )
        this.setState({todos:todos})      
    }
    deleteTask = async (id) => {
        let t = await deleteTask(id)
        this.setState({todos: this.state.todos.filter(t => t._id !== id)})
    }

    render() {
        return (
            <div className="App">
                <h1>Todos</h1>                                
                <Todos  
                    color="cornflowerblue"
                    todos={this.state.todos}
                    deleteTask={this.deleteTask}
                /> 
            </div>
        );
    }
}

export default Home;



Object.assign(window, { //Lets actions be called from console 
  getTasks,
  postTask,
  logIn,
  signUp,
  logOut,
  loggedIn,
  deleteTask,
  editTask,
}); 
