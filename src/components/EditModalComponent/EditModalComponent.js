import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import BookService from "../../services/BookService";

import FormErrorComponent from "../FormErrorsComponent/FormErrorsComponent";
import "./EditModalComponenet.css";

class EditModalComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      book: BookService.getEmptyBook(),
      titleValid: false,
      authorValid: false,
      formValid: false,
      publishedDateValid: false,
      nameMatchValid: false,
      formErrors: { Title: "", Author: "", Date: "", Name: "" }
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentDidMount() {
    const id = this.props.book.id;
    if (!id) return;

    this.fetchBook(id);
  }

  fetchBook(id) {
    BookService.getBookById(id).then(book => {
      this.setState({ book });
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titlelValid;
    let authorValid = this.state.authorValid;
    let publishedDateValid = this.state.publishedDateValid;

    switch (fieldName) {
      case "Title":
        titleValid = /[a-zA-Z]+/.test(value);

        fieldValidationErrors.Title = titleValid
          ? ""
          : " is invalid, must be feild!";
        const matchBook = this.props.books.find(book => {
          return book.volumeInfo.title === value;
        });
        if (matchBook === undefined) {
          this.setState({ nameMatchValid: true });
        } else {
          this.setState({ nameMatchValid: false });
        }
        fieldValidationErrors.Name = matchBook
          ? " cant be match to other books name!"
          : "";

        break;
      case "Author":
        authorValid = /[a-zA-Z]+/.test(value);

        console.log(publishedDateValid, "publish date valid switch cae");
        fieldValidationErrors.Author = authorValid
          ? ""
          : " is invalid, must be feild!";

        break;
      case "Date":
        publishedDateValid = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(
          value
        );
        fieldValidationErrors.Date = publishedDateValid
          ? ""
          : " is invalid format, use (yyyy-mm-dd)";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        titleValid: titleValid,
        authorValid: authorValid,
        publishedDateValid: publishedDateValid
      },
      this.validateForm
    );
  }
  validateForm() {
    if (
      this.state.titleValid &&
      this.state.authorValid &&
      this.state.publishedDateValid &&
      this.state.nameMatchValid
    ) {
      this.setState({
        formValid: true
      });
    } else {
      this.setState({ formValid: false });
    }
  }

  onInputChangeFirst = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    const book = {
      ...this.state.book,
      volumeInfo: {
        title: value,
        authors: this.state.book.volumeInfo.authors,
        publishedDate: this.state.book.volumeInfo.publishedDate
      }
    };

    this.setState({ book });
  };

  onInputChangeSecond = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    const book = {
      ...this.state.book,
      volumeInfo: {
        title: this.state.book.volumeInfo.title,
        authors: [event.target.value],
        publishedDate: this.state.book.volumeInfo.publishedDate
      }
    };

    this.setState({ book });
  };

  onInputChangeThird = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    const book = {
      ...this.state.book,
      volumeInfo: {
        title: this.state.book.volumeInfo.title,
        authors: this.state.book.volumeInfo.authors,
        publishedDate: event.target.value
      }
    };

    this.setState({ book });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const book = this.state.book;
    BookService.saveBook(book).then(() => {
      this.context.router.history.push(`/books`);
    });
  };

  render() {
    const { book } = this.state;

    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Edit Book
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Edit</Modal.Title>
          </Modal.Header>
          <div className="book-edit-body">
            <form onSubmit={this.onFormSubmit} className="book-edit-form">
              <Modal.Body>
                <div className="form-body">
                  <div className="form-field">
                    <label>Book title:</label>
                    <input
                      placeholder={book.volumeInfo.title}
                      name="Title"
                      onChange={this.onInputChangeFirst}
                    />
                  </div>

                  <div className="form-field">
                    <label>Book author:</label>

                    <input
                      placeholder={book.volumeInfo.authors[0]}
                      name="Author"
                      onChange={this.onInputChangeSecond}
                    />
                  </div>
                  <div className="form-field">
                    <label>published date:</label>

                    <input
                      placeholder={book.volumeInfo.publishedDate}
                      name="Date"
                      onChange={this.onInputChangeThird}
                    />
                  </div>
                </div>

                <FormErrorComponent formErrors={this.state.formErrors} />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  disabled={!this.state.formValid}
                  type="submit"
                  onClick={this.handleClose}
                >
                  Save
                </Button>
                <Button onClick={this.handleClose}>Cancel</Button>
              </Modal.Footer>
            </form>
          </div>
          <div className="form-actions-container" />
        </Modal>
      </div>
    );
  }
}
EditModalComponent.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired
};
export default EditModalComponent;
