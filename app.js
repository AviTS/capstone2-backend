const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const ExpressError = require('./helpers/expressError');

const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');

const bookRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const libraryRoutes = require('./routes/libraries');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/', bookRoutes);
app.use('/users/', usersRoutes);
app.use('/library/', libraryRoutes);

// 404 handler

app.use(function (req, res, next) {
  const err = new ExpressError('Not found', 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
