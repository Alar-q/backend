

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/',  (req, res)=>{
	res.render('index', {user:"lolka"});
});


app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}/`);
});