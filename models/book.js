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
  }) {
    const duplicateCheck = await db.query(
      `SELECT title
           FROM books
           WHERE title = $1`,
      [book_title]
    );

    if (!duplicateCheck.rows[0]) {
      const result = await db.query(
        `INSERT INTO books (external_book_id, title, author, book_description, genre) VALUES ($1, $2, $3, $4, $5)`,
        [
          external_book_id,
          book_title,
          book_author,
          book_description,
          book_genre,
        ]
      );
    }
    return;
    // if (duplicateCheck.rows[0])
    //   throw new BadRequestError(`Duplicate book: ${book_title}`, 400);

    // return result.rows[0];
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
