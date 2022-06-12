const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const {
  UnauthorizedError,
  ForbiddenError,
  ExpressError,
} = require('../helpers/expressError');
const User = require('../models/user');

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

async function isLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();

    res.locals.user.user_id = await User.getUserId(res.locals.user.username);

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { authenticateJWT, isLoggedIn };
