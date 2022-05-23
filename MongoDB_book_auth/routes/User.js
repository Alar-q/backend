const express = require('express');

const controller = require('../controllers/User');
const PostModel = require("../models/Post");

const router = express.Router();

router.get('/register', controller.register_form);
router.post('/register', controller.register);

router.get('/login', controller.login_form);
router.post('/login', controller.login);

router.get('/logout', controller.logout);


module.exports = router;