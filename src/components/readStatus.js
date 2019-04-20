import React, { Component } from 'react'

class ReadStatus extends Component {
    

    updateShelf = event => 
        this.props.shelfChange(this.props.book, event.target.value);

    render() {
        const { book, books } = this.props;

        let currentShelf = 'none'
        for (let item of books) {
            if (item.id === book.id) {
              currentShelf = item.shelf;
              break;
            } else currentShelf = 'none'
          }
        return (
            <div className="book-shelf-changer">
                <select onChange={this.updateShelf} defaultValue={currentShelf}>
                <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none" defaultValue='none'>None</option>
                </select>
            </div>
        )
    }
}

export default ReadStatus