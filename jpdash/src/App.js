import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BackDrop from './components/BackDrop';
import Header from './components/Header';
import Home from './screens/Home';
import ErrorPage from './screens/Errors';
import Accounts from './screens/Accounts';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BackDrop />
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/errors' component={ErrorPage} />
        <Route path='/accounts' component={Accounts} />
      </div>
    );
  }
}

export default App;
