const axios = require('axios');

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const { GOOGLE_BOOKS_API_KEY } = require('../config');

const Book = require('../models/book');

async function bookSearch(searchTerms) {
  const result = await axios.get(
    `${API_BASE_URL}?q=${searchTerms}&key=${GOOGLE_BOOKS_API_KEY}`
  );
  // console.log(result);

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
      cover_img: googleBook.volumeInfo.imageLinks.large,
    };
    books.push(book);
  }
  // console.log(books);
  return books;
}

async function getBookDetails(volId) {
  const book = await Book.getBook(volId);
  if (book !== undefined) {
    // checks if book is in DB --> if yes, return book from db. otherwise will make api call ^^
    return book;
  }

  const result = await axios.get(
    `${API_BASE_URL}/${volId}?key=${GOOGLE_BOOKS_API_KEY}`
  );

  const resData = result.data;

  //note to self: check db for volId before any api call. if book isn't found, call api.
  if (resData.items) {
    resData = resData.items[0];
  }

  const bookData = {
    external_book_id: resData.id,
    title: resData.volumeInfo.title,
    author: resData.volumeInfo.authors,
    book_description: resData.volumeInfo.description,
    genre: resData.volumeInfo.categories,
    cover_img: resData.volumeInfo.imageLinks.large,
  };

  const dbBook = await Book.addBook(bookData);

  return dbBook;
}

module.exports = { getBookDetails, bookSearch };
