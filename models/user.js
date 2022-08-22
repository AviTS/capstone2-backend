const bcrypt = require('bcrypt');
const db = require('../db');
const {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  DuplicateUserError,
} = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  //Authenticates a user's credentials
  //If true, returns user data
  //If false, throws error
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT user_id, username, password
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

  static async getUserId(username) {
    const result = await db.query(
      `
    SELECT user_id 
    FROM users 
    WHERE username = $1
    `,
      [username]
    );

    const user_id = result.rows[0].user_id;

    return user_id;
  }

  static async getUser(username) {
    const result = await db.query(
      `SELECT user_id, username FROM users WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) throw new Error(`No user: ${username}`);

    console.log(user);

    return user;
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
      throw new DuplicateUserError(`User already exists.`, 601);
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
