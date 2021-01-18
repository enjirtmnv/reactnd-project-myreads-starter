import React, {Component} from 'react'
import Book from './Book'

class Bookshelf extends Component {

    render() {
        const {books, itemShelf, bookshelf, onChangeBookshelf} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{itemShelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((item) => (item.bookshelf === itemShelf.value)).map((item, index) => (
                            <Book key={index} item={item} bookshelf={bookshelf} onChangeBookshelf={onChangeBookshelf} currentBookshelf={item.bookshelf}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf