import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import Book from './book'

class Home extends Component {


    state = {
        books: [],

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
                            .concat(bookShelfChanged)
                }))
            })
    }
    
    
    render(){
        const { books } = this.state
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
                                        {books.map(book => (
                                            <Book book={book} books={shelfBooks} shelfChange={this.shelfChange} />
                                        ))}
                                    </ol>
                                 </div>
                            </div>
                        )
                   })}
                </div>
                <div className="open-search">
                    <Link to='/searchpage'  
                    >Add a book</Link>
                </div>
                
            </div>
        )
    }
}

export default Home