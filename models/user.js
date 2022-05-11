const bcrypt = require('bcrypt');
const db = require('../db');
const {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
} = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  //Authenticates a user's credentials
  //If true, returns user data
  //If false, throws error
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username, password
      FROM users
      WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError('Invalid username/password');
  }

  //Register a new user and returns new user data.
  static async register({ username, password }) {
    const duplicateCheck = await db.query(
      `SELECT username 
      FROM users 
      WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`${username} already exists.`, 400);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username, password) 
      VALUES ($1, $2)
      RETURNING username`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
