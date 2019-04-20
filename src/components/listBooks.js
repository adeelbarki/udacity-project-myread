import React, { Component } from 'react'
import noCover from '../images/not-available.jpg'
import ReadStatus from './readStatus'

class ListBooks extends Component {
    
    
    render() {
        const { showingBooks } = this.props
        
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {showingBooks.map((book) => (
                            <li key={book.id} className='book'>
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
                                <ReadStatus />
                                </div>                            
                        <div className='book'>
                            {book.title ? (
                                <p className="book-title">{book.title}</p>
                            ) : (
                                <p className="book-title">No title available</p>
                            ) }
                            <p className="book-authors">{book.authors}</p>
                        </div>
                       </li>     
                    )
                    )} 
                </ol>
            </div>
            
        )
    }
}

export default ListBooks