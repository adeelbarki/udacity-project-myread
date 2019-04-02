import React, { Component } from 'react'

class ListBooks extends Component {
    state = {
        query: ''
    }
    render() {
        const { query } = this.state
        const { books } = this.props
        return (
            <div className="'books-grid">
                <ol className="">
                    {books.map((book) => (
                       <li key={book.title} className='books-grid'>
                            <div className='book-avatar'
                           style={{
                               backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}>
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