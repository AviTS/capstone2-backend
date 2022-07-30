const { ExpressError, BadRequestError } = require('../helpers/expressError');
const db = require('../db');

class Book {
  //adds a book to DB if no duplicate. doesn't return anything.
  static async addBook({
    external_book_id,
    book_title,
    book_author,
    book_description,
    book_genre,
    cover_img,
  }) {
    const duplicateCheck = await db.query(
      `SELECT external_book_id
           FROM books
           WHERE external_book_id = $1`,
      [external_book_id]
    );

    if (!duplicateCheck.rows[0]) {
      const result = await db.query(
        `INSERT INTO books (external_book_id, title, author, book_description, genre, cover_img) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          external_book_id,
          book_title,
          book_author,
          book_description,
          book_genre,
          cover_img,
        ]
      );
    }

    return;
  }

  static async getBook(external_book_id) {
    const result = await db.query(
      `SELECT * FROM books WHERE (external_book_id = $1)`,
      [external_book_id]
    );

    const book = result.rows[0];
    return book;
  }
}

module.exports = Book;
