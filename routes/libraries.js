const express = require('express');
const router = new express.Router();

const Library = require('../models/library');
const { isLoggedIn } = require('../middleware/auth');

router.post('/:user_id', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const book_id = +req.body.book_id;

    const book = await Library.addBook(user_id, book_id);

    return res.json(book);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:user_id', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const book_id = +req.body.book_id;

    await Library.removeBook(user_id, book_id);

    return res.json({
      Deleted: `Book ${book_id} from User ${user_id}'s library.`,
    });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:user_id/rating', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const book_id = +req.body.book_id;
    const rating = req.body.rating;

    await Library.updateUserRating(user_id, book_id, rating);

    return res.json({
      Rating: `Book ${book_id} from User ${user_id}'s library has been rated ${rating} stars.`,
    });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:user_id/notes', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const book_id = +req.body.book_id;
    const note = req.body.note;

    await Library.updateUserNotes(user_id, book_id, note);

    return res.json({
      Note: `Book ${book_id} from User ${user_id}'s library has a new or updated note.`,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
