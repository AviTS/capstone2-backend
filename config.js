'use strict';

require('dotenv');

const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key';

const GOOGLE_BOOKS_API_KEY = 'AIzaSyDDYODs1CdhaB3BZhAvsQUg_B-jU_01L5I';

const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 10;

const DB_URI =
  process.env.NODE_ENV === 'test'
    ? 'postgresql:///booksdb_test'
    : process.env.DATABASE_URL || 'postgresql:///booksdb';

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI,
  GOOGLE_BOOKS_API_KEY,
};
