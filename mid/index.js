const express = require('express');

const app = express();
// const ejs = require('ejs');

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/', require('./routes/root.js'));
app.use('/home', require('./routes/root.js'));

app.use('/basket', require('./routes/basket.js'));
app.use('/address', require('./routes/address.js'));
app.use('/gravityF_book', require('./routes/gravityF_book.js'));



app.listen(port, () => {
	console.log(`listening on http://localhost:${port}/`);
});