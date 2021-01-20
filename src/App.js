import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
    state = {
        books: [],
        error: false,
    };

    bookshelves = [
        { key: 'currentlyReading', name: 'Currently Reading' },
        { key: 'wantToRead', name: 'Want to Read' },
        { key: 'read', name: 'Have Read' },
    ];

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState({ books: books })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true })
            })
    }

    render() {
        const { books } = this.state;
        return (
            <div className={'app'}>
                {console.log(books)}
                <Route
                    exact
                    path={'/'}
                    render = { () => (
                        <ListBooks bookshelves={this.bookshelves} books={books}/>
                    )}
                />
                <Route
                    path={'/search'}
                    render = { () => (
                        <SearchBooks books={books}/>
                    )}
                />
            </div>
        )
    }
}

// path={'/'}

class ListBooks extends Component{
    render() {
        const { bookshelves, books } = this.props;

        return(
            <div className={'list-books'}>
                <div className={'list-books-title'}>
                    <h1>MyReads</h1>
                </div>
                <Bookcase bookshelves={bookshelves} books={books} />
                <OpenSearchButton />
                OPALISTTBOOKS
            </div>
        )
    }
}

const OpenSearchButton = () => {
    return(
        <div className={'open-search'}>
            <Link to={'search'}>
                <button>Add a Book</button>
            </Link>
        </div>
    )
};

const Bookcase = props => { //bookcase - книжный шкаф
    const { bookshelves, books } = props;
    return(
        <div className={'list-books-content'}>
            <div>
                {
                    bookshelves.map(shelf => (
                        <Bookshelf key={shelf.key} shelf={shelf} books={books} />
                    ))
                }
            </div>
        </div>
    );
};

const Bookshelf = props => {
    const { shelf, books } = props;
    const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
    return(
        <div className={'bookshelf'}>
            <h2 className={'bookshelf-title'}>{shelf.name}</h2>
            <div className={'bookshelf-books'}>
                <ol className={'books-grid'}>
                    {
                        booksOnThisShelf.map(book => (
                            <Book key={book.id} book={book} shlef={shelf.key} />
                        ))
                    }
                </ol>
            </div>
        </div>
    )
};

const Book = props => {
    const { book, shelf } = props;
    return(
        <li>
            <div className={'book'}>
                <div className={'book-top'}>
                    <div
                        className={'book-cover'}
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: book.image,
                        }}
                    >
                        <BookshelfChanger book={book} shelf={shelf} />
                    </div>
                    <div className={'book-title'}>{book.title}</div>
                    <div className={'book-authors'}>{book.authors.join(', ')}</div>
                </div>
            </div>
        </li>
    )
};

class BookshelfChanger extends Component{
    render() {
        return(
            <div className={'book-shelf-changer'}>
                <select value={this.props.shelf}>
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

// path={'/search'}
class SearchBooks extends Component {
    render() {
        return (
            <div className={'search-books'}>
                <SearchBar />
                <SearchResults />
                PASEARCHBOOKS
            </div>
        )
    }
}

const SearchBar = props => {
    return(
        <div className={'search-book-bar'}>
            <CloseSearchButton />
            <SearchBooksInput />
        </div>
    )
};

const CloseSearchButton = () => {
    return(
        <Link to={'/'}>
            <button className={'close-search'}>Close</button>
        </Link>
    )
};

const SearchBooksInput = props => {
    return(
        <div className={'search-books-results'}>
            <ol className={'books-grid'}>
                <Book/>
            </ol>
        </div>
    )
};

class SearchResults extends Component{
    render() {
        return(
            <div className={'search-books-input-wrapper'}>
                <input type="tect" placeholder={'Search by title or author'}/>
            </div>
        )
    }
}


export default BooksApp