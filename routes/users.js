const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../helpers/expressError');

const User = require('../models/user');
const router = new express.Router();

router.get('/:user', isLoggedIn, async function (req, res, next) {
  try {
    const user = await User.getUser(req.params.user);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
