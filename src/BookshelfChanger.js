import React, {Component} from 'react'

class BookshelfChanger extends Component {

    state = {
        select: 'read',
    };

    changeBookshelf = (e) => {
        this.setState({select: e.target.value});

        this.props.onChangeBookshelf(e.target.value)
    };

    render() {

        const {bookshelf, currentBookshelf} = this.props;

        return (
            <div className="book-shelf-changer">

                {/*<select value={currentBookshelf} onChange={this.changeBookshelf}>*/}

                <select value={this.state.select} onChange={this.changeBookshelf}>
                    {bookshelf.map((item, index) => (
                        <option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            selected={currentBookshelf === item.value}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default BookshelfChanger