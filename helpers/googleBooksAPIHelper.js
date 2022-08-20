const axios = require('axios');

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const { GOOGLE_BOOKS_API_KEY } = require('../config');

const Book = require('../models/book');

async function bookSearch(searchTerms, page) {
  const result = await axios.get(
    `${API_BASE_URL}?q=${searchTerms}&key=${GOOGLE_BOOKS_API_KEY}&startIndex=${
      page * 10
    }`
  );

  const resData = result.data.items;
  const totalItems = result.data.totalItems;
  const maxPages = Math.ceil(totalItems / 10);

  let books = [];

  for (let i in resData) {
    try {
      let googleBook = resData[i];

      let book = {
        external_book_id: googleBook.id,
        book_title: googleBook.volumeInfo.title,
        book_author: googleBook.volumeInfo.authors,
        book_description: googleBook.volumeInfo.description,
        book_genre: googleBook.volumeInfo.categories,
        cover_img: null,
      };
      books.push(book);
    } catch (err) {
      console.log(err);
    }
  }
  return books;
}

async function getBookDetails(volId) {
  const book = await Book.getBook(volId);
  if (book !== undefined) {
    return book;
  }

  const result = await axios.get(
    `${API_BASE_URL}/${volId}?key=${GOOGLE_BOOKS_API_KEY}`
  );

  const resData = result.data;

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
