import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BookService from "../../services/BookService";

import "./BookEdit.css";

const Header = ({ book, onDeleteBook }) => {
  const backUrl = `/books`;

  return (
    <header className="book-edit-header">
      {book.id && (
        <Link to="/" onClick={onDeleteBook}>
          Delete
        </Link>
      )}
    </header>
  );
};

class BookEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { book: BookService.getEmptyBook(), term: "" };
  }

  componentDidMount() {
    const id = this.props.book.id;
    if (!id) return;
    else {
      this.fetchBook(id);
    }
  }

  fetchBook(id) {
    BookService.getBookById(id).then(book => {
      this.setState({ book });
      console.log("thi is statee in edit", this.state);
    });
  }

  onInputChangeFirst = event => {
    const book = {
      ...this.state.book,
      volumeInfo: {
        title: event.target.value,
        authors: this.state.book.volumeInfo.authors
      }
    };
    console.log("this is book after spread", book);

    this.setState({ book });
  };

  onInputChangeSecond = event => {
    const book = {
      ...this.state.book,
      volumeInfo: {
        title: this.state.book.volumeInfo.title,
        authors: [event.target.value]
      }
    };
    console.log("this is book after spread", book);

    this.setState({ book });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const book = this.state.book;
    BookService.saveBook(book).then(() => {});
  };

  onDeleteBook = () => {
    BookService.deleteBook(this.state.book.id);
  };

  render() {
    const { book } = this.state;
    const backUrl = `/books`;

    return (
      <div className="book-edit">
        <Header book={book} onDeleteBook={this.onDeleteBook} />
        <div className="book-edit-body">
          <form onSubmit={this.onFormSubmit} className="book-edit-form">
            <div className="form-field">
              <lable>Book title</lable>
              <input
                placeholder={book.volumeInfo.title}
                value={book.volumeInfo.title}
                onChange={this.onInputChangeFirst}
              />
            </div>

            <div className="form-field">
              <lable>Book author</lable>

              <input
                placeholder={book.volumeInfo.authors[0]}
                value={book.volumeInfo.authors[0]}
                onChange={this.onInputChangeSecond}
              />
            </div>

            <div className="form-actions-container">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

BookEdit.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookEdit;
