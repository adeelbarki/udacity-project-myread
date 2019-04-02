import React, { Component } from 'react'

class ListBooks extends Component {
    
    
    render() {
        const { showingBooks } = this.props

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {showingBooks.map((book) => (
                       <li key={book.title} className='book'>
                        <div className="book-top">
                            <div className='book-cover'
                                style={{
                                    width: 128, height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}>
                            </div>
                        </div>
                        <div className='book'>
                            <p className="book-title">{book.title}</p>
                            <p className="book-authors">{book.authors}</p>
                        </div>
                       </li>
                    ))} 
                </ol>
            </div>
            
        )
    }
}

export default ListBooks