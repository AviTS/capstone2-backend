const { ExpressError, BadRequestError } = require('../helpers/expressError');
const db = require('../db');

class Library {
  static async addBook(user_id, book_id) {
    // console.log(user_id);
    // console.log(typeof book_id);

    const duplicateCheck = await db.query(
      `SELECT user_id, book_id
           FROM user_books
           WHERE user_id = $1 AND book_id = $2`,
      [user_id, book_id]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(
        `User ${user_id} already has book ${book_id} in their library.`,
        400
      );

    const result = await db.query(
      `
    INSERT INTO user_books (user_id, book_id)
    VALUES ($1, $2)`,
      [user_id, book_id]
    );

    let user_book = result.rows[0];

    return user_book;
  }

  static async removeBook(user_id, book_id) {
    const result = await db.query(
      `DELETE FROM user_books WHERE user_id = $1 AND book_id = $2`,
      [user_id, book_id]
    );

    const user_book = result.rows[0];

    if (!user_book) {
      throw new ExpressError(
        `Book ${book_id} in User ${user_id}'s library doesn't exist.`
      );
    }
  }

  static async updateUserRating(user_id, book_id, rating) {
    const result = await db.query(
      `
      UPDATE user_books SET user_rating = $1 WHERE user_id = $2 AND book_id = $3`,
      [rating, user_id, book_id]
    );

    const book_rating = result.rows[0];
  }

  static async updateUserNotes(user_id, book_id, note) {
    const result = await db.query(
      `
    UPDATE user_books SET user_notes = $1 WHERE user_id = $2 AND book_id = $3`,
      [note, user_id, book_id]
    );

    const book_note = result.rows[0];
  }
}

module.exports = Library;
