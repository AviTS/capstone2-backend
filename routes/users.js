const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../helpers/expressError');

const User = require('../models/user');
const router = new express.Router();

router.post('/', isLoggedIn, async function (req, res, next) {
  //   try {
  //     const validator = jsonschema.validate(req.body, userNewSchema);
  //     if (!validator.valid) {
  //       const errs = validator.errors.map((e) => e.stack);
  //       throw new BadRequestError(errs);
  //     }
  //     const user = await User.register(req.body);
  //     const token = createToken(user);
  //     return res.status(201).json({ user, token });
  //   } catch (err) {
  //     return next(err);
  //   }
  // try {
  //   const { username, password } = req.body;
  //   // console.log(username);
  //   let user = await User.register({ username, password });
  //   // console.log({ user });
  //   return res.json({ user });
  // } catch (err) {
  //   return next(err);
  // }
});

module.exports = router;
