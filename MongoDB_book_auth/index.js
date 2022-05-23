const express = require('express');
const PORT = process.env.PORT | 3000;
const app = new express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Cookies */
const expressSession = require('express-session');
app.use(expressSession({
	secret: 'keyboard cat'
}));

/* flushing error messages from Session */
const flash = require('connect-flash');
app.use(flash());

/* MiddleWares */
// app.use((req, res, next)=>{
// 	console.log('MiddleWare completed');
// 	next();
// });

// Global variable is visible from ejs too
global.userId = null;
app.use('*', (req, res, next)=>{
	userId = req.session.userId;
	next();
});

/* MongoDB */
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


app.get('/', (req, res)=>{
	// console.log(req.session);
	// res.render('index');
	res.redirect('/posts/all')
});

app.get('/contact', (req, res) => res.render('contact'));
app.get('/about', (req, res) => res.render('about'));
app.get('/post', (req, res)=>res.render('post'));

app.use('/posts', require('./routes/Post'));

app.use('/users', require('./routes/User'));

app.listen(PORT, ()=>console.log(`server listening on http://localhost:${PORT}/`));

