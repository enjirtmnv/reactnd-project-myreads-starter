import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component{

    render() {
        const { item, bookshelf, onChangeBookshelf, currentBookshelf} = this.props;

        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: item.backgroundImage
                        }}> </div>

                        <BookshelfChanger bookshelf={bookshelf} onChangeBookshelf={onChangeBookshelf} currentBookshelf={currentBookshelf}/>
                    </div>
                    <div className="book-title">{item.title}</div>
                    <div className="book-authors">{item.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book
