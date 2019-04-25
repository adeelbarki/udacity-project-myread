import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import Book from './book'

class Home extends Component {

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

    
    render(){
        const { books } = this.state
        console.log(books)
        const shelfOptions = [
            {option: 'currentlyReading', title: 'Currently Reading'},
            {option: 'wantToRead', title: 'Want to Read'},
            {option: 'read', title: 'Read'}
        ]

        return(
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
                                            <Book book={book} books={shelfBooks} key={book.id} />
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
        )
    }
}

export default Home