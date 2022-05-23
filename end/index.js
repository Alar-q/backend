const express = require('express');

const app = express();
// const ejs = require('ejs');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

/* Cookies */
const session = require('express-session');
app.use(session({secret: 'cats'}));

/* Authentication */
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
//MiddleWare Strategies
require('./auth');

/* req.body */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* FILE UPLOAD (IMAGE) */
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Global variable is visible from ejs too
global.userLoggedIn = false;
app.use('*', (req, res, next)=>{
	userLoggedIn = (req.user != null);
	next();
});

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


app.use('/', require('./routes/root.js'));
app.use('/home', require('./routes/root.js'));
app.use('/basket', require('./routes/basket.js'));
app.use('/address', require('./routes/address.js'));
app.use('/gravityF_book', require('./routes/gravityF_book.js'));

app.use('/auth', require('./routes/auth.js'));

app.use('/product', require('./routes/product.js'));

app.get('/fail', (req, res)=> res.send('something went wrong'));


app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}/`);
});