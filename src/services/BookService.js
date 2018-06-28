import uniqid from "uniqid";

var newBooks = [];
var pipedBooks = [];
function getBooks() {
  const API_KEY = "AIzaSyDMQvJuCuPBRajDO8oN6GHqcakzRxNxg9I";
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${API_KEY}`
  )
    .then(res => res.json())
    .then(res => {
      const API_BOOKS = res.items;
      API_BOOKS.forEach(apiBook => {
        newBooks.push(apiBook);
      });
      pipedBooks = newBooks.map(book => {
        const piepedTitle = book.volumeInfo.title.replace(
          /[a-zA-Z]+/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
        const piepedAuthor = book.volumeInfo.authors[0].replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );

        const bookToReturn = {
          ...book,
          volumeInfo: {
            title: piepedTitle,
            authors: [piepedAuthor],
            publishedDate: book.volumeInfo.publishedDate
          }
        };
        return bookToReturn;
      });
      return pipedBooks;
    });
}

function getBookById(id) {
  return new Promise((resolve, reject) => {
    const book = pipedBooks.find(book => book.id === id);
    book ? resolve(book) : reject(`Book id ${id} not found!`);
  });
}
function deleteBook(id) {
  return new Promise((resolve, reject) => {
    const index = pipedBooks.findIndex(book => book.id === id);
    if (index !== -1) {
      pipedBooks.splice(index, 1);
    }

    resolve(pipedBooks);
  });
}

function _updateBook(book) {
  return new Promise((resolve, reject) => {
    const index = pipedBooks.findIndex(c => book.id === c.id);
    if (index !== -1) {
      pipedBooks[index] = book;
    }

    resolve(pipedBooks);
  });
}

function _addBook(book) {
  return new Promise((resolve, reject) => {
    book.id = uniqid();
    pipedBooks.push(book);
    resolve(newBooks);
  });
}

function saveBook(book) {
  return book.id ? _updateBook(book) : _addBook(book);
}

function getEmptyBook() {
  return { volumeInfo: { title: "", authors: [] } };
}

export default {
  getBooks,
  getBookById,
  deleteBook,
  saveBook,
  getEmptyBook
};
