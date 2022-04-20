const express = require('express');
const path = require('path');

const router = express.Router();

// define the home page route
router
  .route('/')
  .get((req, res) => {
    res.sendFile(path.resolve('pages/contact.html'));
  });


module.exports = router;