import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import BookService from "../../services/BookService";

import "./BookDetailsPage.css";

class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { book: BookService.getEmptyBook() };
  }

  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    this.fetchBook(id);
  }

  fetchBook(id) {
    BookService.getBooks().then(books => {
      var book = books.find(book => book.id === id);
      this.setState({ book });
    });
  }

  render() {
    const book = this.state.book;

    return (
      <div className="book-details">
        <header className="book-details-header">
          <h2>Book Details</h2>
        </header>
        <div className="book-details-body">
          <div className="book-details-row">Title: {book.volumeInfo.title}</div>
          <div className="book-details-row">
            Author: {book.volumeInfo.authors[0]}
          </div>
          <div className="book-details-row">
            Publih Date: {book.volumeInfo.publishedDate}
          </div>
        </div>
        <div className="details-footer">
          <Link to={`/books`} className="back">
            <Button bsStyle="primary" bsSize="large">
              Back to book list
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookDetails;
