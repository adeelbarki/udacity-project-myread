import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import SearchPage from './components/searchPage'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom';
import Book from './components/book'


class BooksApp extends Component {
  state = {
    books: []
}

componentDidMount(){
    BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
                books
            }))
        })
}

shelfChange = (bookShelfChanged, shelf) => {
  BooksAPI.update(bookShelfChanged, shelf)
      .then(() => {
          bookShelfChanged.shelf = shelf
          this.setState(prevState => ({
              books: prevState.books
                  .filter(book => 
                      book.id !== bookShelfChanged.id)
                      .concat(bookShelfChanged),
          }))

        })     
}

  render() {
    
    const { books } = this.state
        const shelfOptions = [
            {option: 'currentlyReading', title: 'Currently Reading'},
            {option: 'wantToRead', title: 'Want to Read'},
            {option: 'read', title: 'Read'}
        ]
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div className="list-books">
          <div className="list-books-title">
          <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
             {shelfOptions.map((shelf, index) => {
                 const shelfBooks = books.filter(book => 
                      book.shelf === shelf.option)        
                  return(
                      <div className="bookshelf" key={index}>
                          <h2 className="bookshelf-title">{shelf.title}</h2>
                          <div className="bookshelf-books">
                              <ol className="books-grid">
                                  {shelfBooks.map(book => (
                                      <Book book={book} 
                                      books={books}
                                      shelfBooks={shelfBooks}
                                      shelfChange={this.shelfChange}  
                                      key={book.id} 
                                      />
                                  ))}
                              </ol>
                           </div>
                      </div>
                  )
             })}
          </div>
          <div className="open-search">
              <Link to='/search'  
              >Add a book</Link>
          </div>
          
      </div>
        )} />
        <Route path='/search' render={() => (
          <SearchPage shelfBooks={books} books={books} shelfChange={this.shelfChange}/>

        )} />
      </div>
    );
  }
  
}

export default BooksApp;
