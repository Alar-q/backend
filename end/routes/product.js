

const express = require('express');

const router = express.Router();

const controller = require('../controllers/Product');




router.get('/create', controller.create_form);



router.get('/patch', controller.patch_form);


router.get('/delete', controller.delete_form);

router.get('/', controller.get);
router.post('/', controller.create);
router.delete('/', controller.delete);
router.patch('/', controller.patch);

router.get('/show_all', controller.show_all);


router.get('/:title', controller.get);

module.exports = router;