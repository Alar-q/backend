const express = require('express');

const controller = require('../controllers/Post');

const Router = express.Router();

Router.get('/post', controller.post);
Router.get('/create', controller.protect,  controller.create_form);
Router.post('/create', controller.protect, controller.create);
Router.get('/all', controller.all);

module.exports = Router;