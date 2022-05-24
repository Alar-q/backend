

const express = require('express');

const router = express.Router();

const controller = require('../controllers/Product');


/**
 * @swagger
 * /product/create:
 *      get:
 *          description: Returns HTML create from
 *          responses:
 *              '200':
 *                  description: Success
 * */
router.get('/create', controller.create_form);


/**
 * @swagger
 * /product/patch:
 *      get:
 *          description: Returns HTML patch from
 *          responses:
 *              '200':
 *                  description: Success
 * */
router.get('/patch', controller.patch_form);


/**
 * @swagger
 * /product/delete:
 *      get:
 *          description: Returns HTML delete from
 *          responses:
 *              '200':
 *                  description: Success
 * */
router.get('/delete', controller.delete_form);


/**
 * @swagger
 * /product:
 *      get:
 *          description: Returns all products
 *          responses:
 *              '200':
 *                  description: Success
 *              '204':
 *                  description: No content
 *      post:
 *          description: Сreates a new product
 *          responses:
 *              '201':
 *                  description: Product created
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Server error
 *      patch:
 *          description: Updates the product
 *          responses:
 *              '200':
 *                  description: Success
 *              '204':
 *                  description: No content
 *      delete:
 *          description: Removes a product
 *          responses:
 *              '200':
 *                  description: Success
 *              '204':
 *                  description: No content
 */
router.get('/', controller.get);
router.post('/', controller.create);
router.delete('/', controller.delete);
router.patch('/', controller.patch);


/**
 * @swagger
 * /product/:title:
 *      get:
 *          description: Return one product
 *          responses:
 *              '200':
 *                  description: Success
 *              '204':
 *                  description: No content
 */
router.get('/:title', controller.get);

module.exports = router;