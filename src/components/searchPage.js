import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import ListBooks from './listBooks'

class SearchPage extends Component {
    state = {
        books: [],
        query: ''
    }
    componentDidMount(){
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {   
        const { query, books } = this.state

        const showingBooks = query === ''
        ? books
        : books.filter((c) => (
            c.title.toLowerCase().includes(query.toLowerCase())
        ))
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
                        {showingBooks.length !== books.length && (
                            <div className='showing-books'>
                                <span>
                                    Now showing {showingBooks.length} of {books.length}
                                </span> 
                                <button onClick={this.clearQuery}>Show all</button> 
                            </div>
                        )}  
                        <ListBooks 
                            showingBooks={showingBooks}
                        />
                    </div>
                        
                </div>
            </div>
            
        )
    }

}



export default SearchPage