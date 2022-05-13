const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();

router.get('/', UserController.findAll);
router.post('/', UserController.create2);

module.exports = router;