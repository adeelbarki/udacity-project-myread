import React, { Component } from 'react'
import noCover from '../images/not-available.jpg'
import ReadStatus from './readStatus'
import { Redirect } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'



class Book extends Component {
    state = {
        books: this.props.books,
        redirect: false
        
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
                    redirect: true
                }))
                 
            })
            
             
      }


    render() {
        
        if(this.state.redirect) {
            console.log(this.state.redirect)
            return(<Redirect to='/' />)      
        }
        const { book, shelfBooks, showingBooks } = this.props
        let {currentShelf} = this.props
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
                                <ReadStatus book={book} shelfBooks={shelfBooks}
                                showingBooks={showingBooks}
                                currentShelf={currentShelf} 
                                shelfChange={this.shelfChange}>
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
}

export default Book