const express = require('express');
const passport = require('passport');
const Router = express.Router();

const controller = require('../controllers/User');

Router.get('/login', controller.login_form);
Router.get('/register', controller.register_form);
Router.get('/patch', controller.patch_form);
Router.get('/delete', controller.delete_form);

Router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
}));

Router.post('/register', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/register',
}));

Router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));
Router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/fail',
}))

Router.get('/logout', controller.logout);
module.exports = Router;