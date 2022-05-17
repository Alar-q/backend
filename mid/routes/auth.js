const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});
router.get('/register', (req, res) => {
  res.render('auth/register');
});
router.get('/delete', (req, res) => {
  res.render('auth/deleteUser');
});
router.get('/patch', (req, res) => {
  res.render('auth/patchUser');
});
router.get('/userAccount', (req, res) => {
  res.render('auth/userAccount');
});

module.exports = router;