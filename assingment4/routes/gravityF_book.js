const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('gravityF_book');
  });


module.exports = router;