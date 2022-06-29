const { ExpressError, BadRequestError } = require('../helpers/expressError');
const db = require('../db');

class Library {
  //Below function needs to be updated:
  //query books (ext API) --> add book to library --> get all libraries --> select a library (book_id, lib_id) --> insert.
  static async addBook(user_id, book_id) {
    // console.log(user_id);
    // console.log(typeof book_id);

    const duplicateCheck = await db.query(
      `SELECT user_id, book_id
           FROM library_books
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
    INSERT INTO library_books (user_id, book_id)
    VALUES ($1, $2)`,
      [user_id, book_id]
    );

    let library_book = result.rows[0];

    return library_book;
  }

  //update below function to remove book from a specific library
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

  //update below function to update book rating in a specific library
  static async updateUserRating(user_id, book_id, rating) {
    const result = await db.query(
      `
      UPDATE library_books SET user_rating = $1 WHERE user_id = $2 AND book_id = $3`,
      [rating, user_id, book_id]
    );

    const book_rating = result.rows[0];
  }

  //update below function to update book notes in a specific library
  static async updateUserNotes(user_id, book_id, note) {
    const result = await db.query(
      `
    UPDATE library_books SET user_notes = $1 WHERE user_id = $2 AND book_id = $3`,
      [note, user_id, book_id]
    );

    const book_note = result.rows[0];
  }

  //create library --> insert to library (which has user_id as a parameter)
  // static async createLib(user_id) {

  // }

  //read library --> get all libraries of user (params: user_id)

  //update --> already above
  //update library name and update library description (add later on)

  //delete book from library --> removes a single book from a specific library (params: user_id, library_id, book_id)
}

module.exports = Library;
