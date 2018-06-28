import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import BookService from "../../services/BookService";
import deleteImg from "../../../src/assets/trash.png";
import "./DeleteModalComponent.css";

class DeleteModalComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = { show: false, book: this.props.book };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onDeleteBook = () => {
    BookService.deleteBook(this.state.book.id);
    this.setState({ show: false });
    this.context.router.history.push(`/books`);
  };

  render() {
    return (
      <div>
        {/* <Button bsStyle="danger" bsSize="small" onClick={this.handleShow}>
          Delete Book
        </Button> */}
        <img src={deleteImg} alt="" onClick={this.handleShow} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure that you want to delete this book?</h3>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.onDeleteBook}>Delete</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteModalComponent.propTypes = {
  book: PropTypes.object.isRequired
};

export default DeleteModalComponent;
