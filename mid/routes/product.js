const express = require('express');

const controller = require('../controllers/Product');

const router = express.Router();

router.get('/create', controller.get_create);
router.post('/create', controller.post_create);

router.get('/all', controller.get_all);
router.get('/all/:username', controller.get_one);

module.exports = router;