import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './book'

class SearchPage extends Component {
    state = {
        showingBooks: [],
        query: '',
        queryInput: false
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        if (query) {
            BooksAPI.search(query.trim(), 20)
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
          } else this.setState(
              {
                   showingBooks: [], 
                   queryInput: false 
                });
        }

    render() {   
        const { query, showingBooks, queryInput } = this.state
        const { shelfChange } = this.props
        
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
                          <h3>Showing {showingBooks.length} books </h3>  
                          <ol className="books-grid">
                                        {showingBooks.map(book => (
                                            <Book book={book} books={showingBooks} key={book.id} shelfChange={shelfChange} />
                                        ))}
                          </ol>
                          </div>
                        )}
                        {queryInput && (
                            <h3>Search did not return any books. Please try again!</h3>
                        )}
                    </div> 
                </div>
            </div>
            
        )
    
    }
}


export default SearchPage