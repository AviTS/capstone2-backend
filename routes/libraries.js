const express = require('express');
const router = new express.Router();

const Library = require('../models/library');
const { isLoggedIn } = require('../middleware/auth');

router.post('/', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;

    const library_name = req.body.library_name;
    const library_desc = req.body.library_desc;

    const library = await Library.createLibrary(
      user_id,
      library_name,
      library_desc
    );

    return res.json(library);
  } catch (err) {
    return next(err);
  }
});

router.get('/getLibraries', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;

    const libraries = await Library.getAllLibs(user_id);

    return res.json(libraries);
  } catch (err) {
    return next(err);
  }
});

router.get('/:library_id', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;

    const library_id = req.params.library_id;

    const books = await Library.getBooksInLib(user_id, library_id);

    return res.json(books);
  } catch (err) {
    return next(err);
  }
});

router.post('/:library_id/books', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;

    const library_id = +req.body.library_id;
    const book_id = +req.body.book_id;

    const library = await Library.addBookToLib(user_id, library_id, book_id);

    return res.json(library);
  } catch (err) {
    return next(err);
  }
});

router.delete('/', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;
    const library_id = +req.body.library_id;
    const book_id = +req.body.book_id;

    await Library.removeBook(user_id, library_id, book_id);

    return res.json({
      Deleted: `Book ${book_id} from User ${user_id}'s ${library_id} library.`,
    });
  } catch (err) {
    return next(err);
  }
});

router.patch('/rating', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;
    const library_id = +req.body.library_id;
    const book_id = +req.body.book_id;
    const rating = req.body.rating;

    await Library.updateUserRating(user_id, library_id, book_id, rating);

    return res.json({
      Rating: `Book ${book_id} from User ${user_id}'s ${library_id} library has been rated ${rating} stars.`,
    });
  } catch (err) {
    return next(err);
  }
});

router.patch('/notes', isLoggedIn, async function (req, res, next) {
  try {
    const user_id = res.locals.user.user_id;
    const library_id = +req.body.library_id;
    const book_id = +req.body.book_id;
    const note = req.body.note;

    await Library.updateUserNotes(user_id, library_id, book_id, note);

    return res.json({
      Note: `Book ${book_id} from User ${user_id}'s ${library_id} library has a new or updated note.`,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
