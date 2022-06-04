const axios = require('axios');

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const { GOOGLE_BOOKS_API_KEY } = require('../config');

const Book = require('../models/book');

async function bookSearch(searchTerms) {
  // const result = await axios.get(
  //   `${API_BASE_URL}?q=${searchTerms}&key=${GOOGLE_BOOKS_API_KEY}`
  // );

  const resData = result.data.items;
  // console.log(resData);
  let books = [];

  for (let i in resData) {
    let googleBook = resData[i];
    // console.log(googleBook);

    let book = {
      external_book_id: googleBook.id,
      book_title: googleBook.volumeInfo.title,
      book_author: googleBook.volumeInfo.authors,
      book_description: googleBook.volumeInfo.description,
      book_genre: googleBook.volumeInfo.categories,
    };
    books.push(book);
  }

  return books;
}

async function getBookDetails(volId) {
  const book = Book.getBook(volId);
  if (book !== null) {
    return Book.getBook(volId);
  }

  const result = await axios.get(
    `${API_BASE_URL}/${volId}?key=${GOOGLE_BOOKS_API_KEY}`
  );

  const resData = result.data;

  //note to self: check db for volId before any api call. if book isn't found, call api.

  resData = resData.items[0];
  // console.log(resData);

  const bookData = {
    external_book_id: resData.volumeInfo.id,
    book_title: resData.volumeInfo.title,
    book_author: resData.volumeInfo.authors,
    book_description: resData.volumeInfo.description,
    book_genre: resData.volumeInfo.categories,
  };

  Book.addBook(bookData);

  return bookData;
}

module.exports = { getBookDetails, bookSearch };
