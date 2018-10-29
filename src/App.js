import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'  
import {serverURL} from './config'
import Todos from './Todos.js'
import {  
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
    state = {  //STEP 15 - Add additional fields to this state
        todos: [],
        loggedIn: true,
        status: { error:false, message:'' },
        name: null,
        pass: null,
        user: {},
        
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


    logIn = async() => { //STEP 18 - Add imported functions to state  
      let result = await logIn({ username:this.state.name, password:this.state.pass })
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } })    
    }

    signUp = async() => {
      let result = await signUp({ username:this.state.name, password:this.state.pass })
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
    }

    logOut = async() => {
      await logOut()
      this.setState({loggedIn:false, user:null, name:'', pass:'' })      
    }
    loggedIn = async() => {
      let result = await loggedIn()
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
    }

    render() {
        return (
            <div className="App">
                <h1>Todos</h1>                                

                <div className="App-content">
                {/*STEP 16 - Use the new fields in the state to conditonally show html*/}
                {this.state.status.error ? <p> { this.state.status.message }</p> : ''}
                {this.state.loggedIn && !this.state.status.error ? 
                  <span>
                   <p id="user">Welcome {this.state.user.username} !</p>
                  <button id="logout" onClick={this.logOut}>LogOut</button>
                  <Todos  
                        color="cornflowerblue"
                        todos={this.state.todos}
                        deleteTask={this.deleteTask}
                  />
                  </span>
                : <div>
                    <p>Not logged in...</p>
                    <div>
                      <input 
                        type="text"
                        ref={user => this.name = user}                  
                        onChange = {() =>  this.setState({name:this.name.value})}
                        />
                    </div>
                    <div> 
                        {/*STEP 17 - Use ref and onChange events to chage state*/}
                        <input 
                        type="password"                    
                        ref={pass => this.pass = pass} 
                        onChange = {() => this.setState({pass:this.pass.value})}/>                                
                    </div>
                    {/*STEP 19 - Use functions added to state*/}
                    <button onClick ={this.logIn}>LogIn</button> 
                    <button onClick ={this.signUp}>signUp</button>             
                </div>
                }
              </div>
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
