import React, {Component} from 'react';

import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//Import component
import Headers from './components/layouts/Headers'
import Login from './components/auth/Login'
import Register from './components/auth/Register'



class App extends Component {

  render(){
    return (
      <div className="App">
        <Headers />
        <BrowserRouter>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/login' exact component={Login}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
