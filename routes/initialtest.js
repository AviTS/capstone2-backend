const express = require('express');
const router = new express.Router();

const User = require('../models/initialtestmodel');

router.get('/', async function (res, next) {
  let testUser = await User.testConnection();

  console.log(testUser);

  return console.log('hello');
});

module.exports = router;
