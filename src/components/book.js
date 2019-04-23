import React, { Component } from 'react'
import noCover from '../images/not-available.jpg'
import ReadStatus from './readStatus'
import * as BooksAPI from '../utils/BooksAPI'
import { Redirect } from 'react-router-dom'



class Book extends Component {

    state = {
        books: [],
        toHome: false

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
                    toHome: true
                }))
                 
            })
            
             
    }


    render() {
        if(this.state.toHome === true) {
            return(<Redirect to='/' />)
        }
        const { book, books } = this.props
        return (
            <li>
                <div className='book'>
                    <div className="book-top">
                    {book.imageLinks && book.imageLinks.thumbnail ? (
                                <div className='book-cover'
                                    style={{
                                        width: 128, height: 170,
                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}>
                                </div>
                                ) : (
                                    <div className='book-cover'
                                    style={{
                                        width: 128, height: 170,
                                        backgroundImage: `url(${noCover})`
                                    }}>
                                    </div>
                                
                                )}
                                <ReadStatus book={book} books={books} shelfChange={this.shelfChange}>
                                </ReadStatus>
                    </div>
                    <div className='book'>
                            {book.title ? (
                                <p className="book-title">{book.title}</p>
                            ) : (
                                <p className="book-title">No title available</p>
                            ) }
                            <p className="book-authors">{book.authors}</p>
                    </div>
                </div>
            </li>
        )
    }

    componentDidUpdate(prevState, state, snapshot) {
        console.log('Component did update')
          
    }
}

export default Book