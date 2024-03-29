const {
  ExpressError,
  BadRequestError,
  DuplicateBookError,
} = require('../helpers/expressError');
const db = require('../db');

class Library {
  static async createLibrary(user_id, library_name, library_desc) {
    const duplicateCheck = await db.query(
      `SELECT user_id, library_name FROM libraries WHERE user_id = $1 AND library_name = $2
    `,
      [user_id, library_name]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(
        `User ${user_id} already has a library named ${library_name}`,
        400
      );
    }

    const result = await db.query(
      `
      INSERT INTO libraries (user_id, library_name, library_desc) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, library_name, library_desc]
    );

    const library = result.rows[0];

    return library;
  }

  static async getAllLibs(user_id) {
    const result = await db.query(
      `
    SELECT library_id, library_name FROM libraries WHERE user_id = $1`,
      [user_id]
    );

    const library = result.rows;

    return library;
  }

  static async addBookToLib(user_id, library_id, book_id) {
    const duplicateCheck = await db.query(
      `SELECT user_id, library_id, book_id
           FROM library_books
           WHERE user_id = $1 AND library_id = $2 AND book_id = $3`,
      [user_id, library_id, book_id]
    );

    if (duplicateCheck.rows[0])
      throw new DuplicateBookError(
        `User ${user_id} already has book ${book_id} in their library.`,
        600
      );

    const result = await db.query(
      `
    INSERT INTO library_books (user_id, library_id, book_id)
    VALUES ($1, $2, $3) RETURNING *`,
      [user_id, library_id, book_id]
    );

    const library_book = result.rows[0];

    return library_book;
  }

  static async getBooksInLib(user_id, library_id) {
    const result = await db.query(
      `SELECT * FROM library_books 
      JOIN books USING (book_id)
      WHERE user_id = $1 AND library_id = $2`,
      [user_id, library_id]
    );

    const library_books = result.rows;

    return library_books;
  }

  static async removeBook(user_id, library_id, book_id) {
    const result = await db.query(
      `DELETE FROM library_books WHERE user_id = $1 AND library_id = $2 AND book_id = $3`,
      [user_id, library_id, book_id]
    );

    const library_book = result.rows[0];

    if (!library_book) {
      throw new ExpressError(
        `Book ${book_id} in User ${user_id}'s library doesn't exist.`
      );
    }
  }

  static async updateUserRating(user_id, library_id, book_id, rating) {
    const result = await db.query(
      `
      UPDATE library_books SET user_rating = $1 WHERE user_id = $2 AND library_id = $3 AND book_id = $4`,
      [rating, user_id, library_id, book_id]
    );

    const book_rating = result.rows[0];
  }

  static async updateUserNotes(user_id, library_id, book_id, note) {
    const result = await db.query(
      `
    UPDATE library_books SET user_notes = $1 WHERE user_id = $2 AND library_id = $3 AND book_id = $4`,
      [note, user_id, library_id, book_id]
    );

    const book_note = result.rows[0];
  }

  static async updateReadStatus(user_id, library_id, book_id, read_status) {
    const result = await db.query(
      `
      UPDATE library_books SET read_status = $1 WHERE user_id = $1 AND library_id = $3 AND book_id = $4
      `,
      [read_status, user_id, library_id, book_id]
    );

    const book_read_status = result.rows[0];
  }
}

module.exports = Library;
