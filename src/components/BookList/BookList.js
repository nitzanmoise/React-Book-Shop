import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import EditModalComponent from "../EditModalComponent/EditModalComponent";
import DeleteModalComponent from "../DeleteModalComponent/DeleteModalComponent";

import "./BookList.css";

const BookList = props => {
  const booksPreview = props.books.map((book, i) => {
    return (
      <tbody key={i} className="books-list-item">
        <tr>
          <td>
            <EditModalComponent books={props.books} book={book} />
          </td>
          <td>
            {" "}
            <NavLink activeClassName="selected" to={`/books/${book.id}`}>
              {book.volumeInfo.title}
            </NavLink>{" "}
          </td>
          <td>{book.volumeInfo.authors[0]} </td>
          <td>{book.volumeInfo.publishedDate}</td>
          <td>
            <DeleteModalComponent book={book} />
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="books-list">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Edit</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Published Date</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {booksPreview}
      </table>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BookList;
