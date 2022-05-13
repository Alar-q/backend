const express = require('express');

const app = express();
// const ejs = require('ejs');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

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


app.use('/', require('./routes/root.js'));
app.use('/home', require('./routes/root.js'));
app.use('/basket', require('./routes/basket.js'));
app.use('/address', require('./routes/address.js'));
app.use('/gravityF_book', require('./routes/gravityF_book.js'));

app.use('/auth', require('./routes/auth.js'));

app.use('/users', require('./routes/UserRoute.js'));



app.listen(port, () => {
	console.log(`listening on http://localhost:${port}/`);
});