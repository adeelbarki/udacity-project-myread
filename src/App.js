import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/home'
import SearchPage from './components/searchPage'


class BooksApp extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route path='/searchpage' render={() => (
          <SearchPage />
        )} />
      </div>
    );
  }
}

export default BooksApp;
