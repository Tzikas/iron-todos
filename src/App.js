import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'  //STEP 3  
import {serverURL} from './config'
import Todos from './Todos.js'

class Home extends Component {
    state = {  //STEP 2 - show state & this is a stateful component 
          todos: []
    }


    async componentDidMount(){ //STEP 1 - describe lifycycle events and class 
        this.getTasks() 
    }


    getTasks = async () => { //STEP 4 - function appears in state         
        let getData = await axios.get(`${serverURL}/api/tasks`)         
        this.setState({todos:getData.data}) //STEP 7 - setState and passing props to 
    }


    render() {
        return (
            <div className="App">
                <h1>Todos</h1>                
                {/*STEP 5 - passing state to props & importing components*/}
                <Todos  
                    color="cornflowerblue"
                    todos={this.state.todos}
                /> 
            </div>
        );
    }
}

export default Home;
