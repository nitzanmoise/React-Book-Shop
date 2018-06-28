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
    // var book = BookService.getBookById(id);
    BookService.getBooks().then(books => {
      var book = books.find(book => book.id === id);
      console.log("in book details - book:", book);
      this.setState({ book });
      // return book;
      console.log(this.state.book, "state book");
    });
    // console.log("in book deails", book);
  }

  render() {
    const book = this.state.book;

    return (
      <div className="book-details">
        <header className="book-details-header">
          <h2>Book details</h2>
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
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            <Link to={`/books`} className="back">
              Back to book list
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default BookDetails;
