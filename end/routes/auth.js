const express = require('express');
const passport = require('passport');
const Router = express.Router();

const UserController = require("../controllers/User");

function isLoggedIn(req, res, next) {
    if(!req.user)
      res.redirect('/auth/login');
    else next();
}

Router.get('/login', UserController.login_form);
Router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/account',
  failureRedirect: '/auth/login',
}));

Router.get('/register', UserController.register_form);
Router.post('/register', passport.authenticate('local', {
  successRedirect: '/auth/account',
  failureRedirect: '/auth/register',
}));

Router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));
Router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/account',
  failureRedirect: '/auth/login',
}))

Router.get('/patch', isLoggedIn, UserController.patch_form);
Router.post('/patch', UserController.patch);

Router.get('/delete', isLoggedIn, UserController.delete_form);
Router.post('/delete', UserController.delete);

Router.get('/account', isLoggedIn, UserController.userAccount);

Router.get('/logout', isLoggedIn, UserController.logout);

module.exports = Router;