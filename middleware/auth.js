const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const {
  UnauthorizedError,
  ForbiddenError,
} = require('../helpers/expressError');

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, '').trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    return next();
  }
}

function isLoggedIn(req, res, next) {
  try {
    console.log(res.locals);
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { authenticateJWT, isLoggedIn };
