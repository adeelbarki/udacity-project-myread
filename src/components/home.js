import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import ListBooks from './listBooks';

class Home extends Component {
    state = {
        books: [],
        query: ''
    }

    componentDidMount(){
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    
    render(){
        const { query, books } = this.state

        const showingBooks = query === ''
        ? books
        : books.filter((c) => (
            c.title.toLowerCase().includes(query.toLowerCase())
        ))
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <h2 className="bookshelf-title">Read</h2>
                        </div>
                        <ListBooks 
                            showingBooks={showingBooks}
                        />
                    </div>
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