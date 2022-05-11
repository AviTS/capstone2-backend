const db = require('../db');

class Book {
  static async testConnection() {
    const testReturn = await db.query(`SELECT * FROM books;`);

    return testReturn.rows[0];
  }
}

module.exports = Book;
