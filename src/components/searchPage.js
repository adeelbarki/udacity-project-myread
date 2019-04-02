import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import ListBooks from './listBooks'

class SearchPage extends Component {
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
    render() {   
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
                            <input type="text" placeholder="Search by title or author"/>
                        </div>
                    </div>
                        <div className="search-books-results">
                        <ListBooks 
                            books={this.state.books}
                        />
                        </div>
                        
                    </div>
                </div>
            
        )
    }
}

export default SearchPage