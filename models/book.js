const { ExpressError, BadRequestError } = require('../helpers/expressError');
const db = require('../db');

class Book {
  static async addBook({
    external_book_id,
    book_title,
    book_author,
    book_description,
    book_genre,
  }) {
    const duplicateCheck = await db.query(
      `SELECT title
           FROM books
           WHERE title = $1`,
      [book_title]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate book: ${book_title}`, 400);

    const result = await db.query(
      `INSERT INTO books (external_book_id, title, author, book_description, genre) VALUES ($1, $2, $3, $4, $5)`,
      [external_book_id, book_title, book_author, book_description, book_genre]
    );

    return result.rows[0];
  }
}

module.exports = Book;
