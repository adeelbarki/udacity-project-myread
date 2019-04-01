import React, { Component } from 'react';
import './App.css';
import Home from './components/home'

class BooksApp extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default BooksApp;
