import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReadStatus extends Component {


    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired 
    }

    updateShelf = event => 
        this.props.changeShelf(this.props.book, event.target.value);

    render() {
        const {book, books} = this.props;

        let currentShelf = 'none'
        return (
            <div className="book-shelf-changer">
                <select onChange={this.updateShelf} defaultValue={currentShelf}>
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