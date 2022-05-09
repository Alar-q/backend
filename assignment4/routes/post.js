const express = require('express');

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
        res.render('post');
    });
router.get('/:id', async (req, res) => {
        const blogpost = await BlogPost.findById(req.params.id)
        res.render('single_post', {blogpost});
    });

module.exports = router;