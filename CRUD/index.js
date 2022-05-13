const express = require('express');

const PORT = process.env.PORT || 3000;
const app = new express();

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


//Controllers-Routes
const UserRoute = require('./routes/User');
app.use('/user', UserRoute);


// Routes
app.get('/', (req, res)=>{
	res.render('index');
});

app.get('/create', (req, res)=>{
	res.render('create');
});

app.get('/show', (req, res)=>{
	res.render('show');
});


app.listen(PORT, () => console.log("Server is listening in port " + PORT));