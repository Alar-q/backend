const express = require('express');
const path = require('path');


const app = new express();
const ejs = require('ejs');

const port = 3000;

app.use('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res)=>{
	res.render('index');
});


// app.use('/', require('./routes/root.js'));
// app.use('/home', require('./routes/root.js'));

// app.use('/basket', require('./routes/basket.js'));
// app.use('/address', require('./routes/address.js'));
// app.use('/address', require('./routes/gravityF_book.js'));


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});