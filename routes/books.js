const express = require('express');
// const Book = require('../models/book');
// const axios = require('axios');
const { isLoggedIn } = require('../middleware/auth');
const {
  getBookDetails,
  bookSearch,
} = require('../helpers/googleBooksAPIHelper');
const router = new express.Router();

router.get(
  '/search/q=:searchterm&page=:page',
  isLoggedIn,
  async function (req, res, next) {
    try {
      const searchTerm = req.params.searchterm;
      const page = req.params.page;

      const results = await bookSearch(searchTerm, page);

      return res.json(results);
    } catch (err) {
      return next(err);
    }
  }
);

router.get('/:volId', isLoggedIn, async function (req, res, next) {
  try {
    const volId = req.params.volId;

    const book = await getBookDetails(volId);

    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
