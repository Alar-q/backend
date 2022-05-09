const express = require('express');

const router = express.Router();

// define the home page route
router
    .route('/')
    .get((req, res) => {
        res.render('contact');
    });

module.exports = router;