import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './book'
import noBook from '../images/no-book.png'

class SearchPage extends Component {
    
    state = {
        showingBooks: [],
        query: '',
        queryInput: false,
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        if (query) {
            BooksAPI.search(query)
                .then(books => {
                books.length > 0
                ? this.setState(
                    { 
                        showingBooks: books, 
                        queryInput: false 
                    })
                : this.setState(
                    { showingBooks: [], queryInput: true });
                });
          }          
          else this.setState(
              {
                   showingBooks: [], 
                   queryInput: false 
                })
        }

    
        render() {  
        const { query, showingBooks, queryInput } = this.state
        const { shelfBooks, shelfChange, books } = this.props
        return(
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link 
                            className="close-search"
                            to="/">
                            Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input 
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}    
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        {showingBooks.length > 0 && (
                          <div>  
                          <ol className="books-grid">
                                        {showingBooks.map(book => (
                                            <Book book={book} 
                                            showingBooks={showingBooks}
                                            shelfBooks={shelfBooks} 
                                            books={books}
                                            key={book.id} 
                                            shelfChange={shelfChange} 
                                            />
                                        ))
                                        }
                                        
                          </ol>
                          </div>
                        )}
                        {queryInput && (
                            <div className="books-grid">
                            <div className='book-cover'
                                    style={{
                                        width: 128, height: 170,
                                        backgroundImage: `url(${noBook})`
                                    }}> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                                    <h3>No books found. Please try again!</h3>
                                </div>
                            
                            </div>
                        )}
                    </div> 
                </div>
            </div>
            
        )
    
    }
    
}


export default SearchPage