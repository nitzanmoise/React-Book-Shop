import React, { Component } from "react";

import BookService from "../../services/BookService";

import BookList from "../../components/BookList/BookList";
import AddModalComponent from "../../components/AddModalComponent/AddModalComponent";

class BookPage extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    BookService.getBooks().then(res => {
      var books = res;
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="books-page">
        <div className="books-container">
          <BookList books={this.state.books} />
        </div>
        <div className="action-container">
          <AddModalComponent books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default BookPage;
