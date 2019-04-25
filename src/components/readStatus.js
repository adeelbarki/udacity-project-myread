import React, { Component } from 'react'

class ReadStatus extends Component {
    

    updateShelf = event => (
        this.props.shelfChange(this.props.book, event.target.value)
    )

    
    render() {
        const { book, shelfBooks } = this.props
        let currentShelf = 'none'
        for (let bookId of shelfBooks) {
            if (bookId.id === book.id) {
                currentShelf = bookId.shelf; 
                }  
            }
        
        return (
            <div className="book-shelf-changer">
                <select onChange={this.updateShelf} value={currentShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
    
}

export default ReadStatus