import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import ListBooks from './listBooks'

class SearchPage extends Component {
    state = {
        showingBooks: [],
        query: '',
        queryInput: false
    }

    updateQuery = (query) => {
        console.log(query)
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
          } else this.setState(
              {
                   showingBooks: [], 
                   queryInput: false 
                });
        }

    render() {   
        const { query, showingBooks } = this.state
        
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
                            <ListBooks 
                                showingBooks={showingBooks}
                            />
                        )}
                    </div> 
                </div>
            </div>
            
        )
    
    }
}



export default SearchPage