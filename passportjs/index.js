const express = require('express');

const app = new express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

/* Cookies */
const session = require('express-session');
app.use(session({secret: 'cats'}));

/* Authentication */
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

require('./auth');

/* req.body */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* MongoDB connect */
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
	.then(() => {
		console.log("Database Connected Successfully");
	})
	.catch((err) => {
		console.log("Could not connected to the database ", err);
		process.exit();
	});


app.get('/', (req, res) => {
	console.log('user from home', req.user)
	res.render('home')
});
app.get('/fail', (req, res)=> res.send('something went wrong'));

app.use('/auth', require('./routes/User'));


app.listen(PORT, ()=>console.log(`server listening on http://localhost:${PORT}/`));
