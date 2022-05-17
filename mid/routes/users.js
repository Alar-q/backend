const express = require('express');

const UserController = require('../controllers/User');

const router = express.Router();

router.post('/patch', UserController.update);
router.post('/delete', UserController.destroy);
router.get('/', UserController.find);
router.post('/', UserController.create);

module.exports = router;