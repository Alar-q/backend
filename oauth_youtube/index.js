const express = require('express');
const passport = require('passport');

require('./auth');

function isLoggedIn(req, res, next){
	// console.log(req.isAuthenticated())
	req.user ? next() : res.sendStatus(401);
}

const app = express();

const session = require('express-session');
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
	// console.log(req);
	res.send(
		'<a href="/auth/google">Authenticate with google</a> \
		<a href="/auth/logout">logout</a>');
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

app.get('/auth/google/callback', 
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/auth/failure',
	})
);

app.get('/auth/failure', (req, res)=>{
	res.send('something went wrong');
})

app.get('/protected', isLoggedIn, (req, res)=>{
	// console.log(req.user);
	res.send('Hello!');
});

app.get('/auth/logout', isLoggedIn, (req, res)=>{
	req.logout(()=>{});
	res.redirect('/');
});

app.listen(3000, ()=>{console.log('listening on: 3000');})