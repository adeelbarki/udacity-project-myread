import React, { Component } from 'react'

class ListBooks extends Component {
    state = {
        query: ''
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }
    
    render() {
        const { query } = this.state
        const { books } = this.props

        const showingBooks = query === ''
        ? books
        : books.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
        ))

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