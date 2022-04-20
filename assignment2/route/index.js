const express = require('express');
const path = require('path');


const app = express();
const port = 3000;


app.use(express.static('public'));


// app.get('/', (req, res)=>{
// 	res.sendFile(path.resolve(__dirname, 'pages/index.html'));
// });
// app.get('/home', (req, res)=>{
// 	res.sendFile(path.resolve(__dirname, 'pages/index.html'));
// });
app.use('/', require('./routes/root.js'));
app.use('/home', require('./routes/root.js'));


// app.get('/about', (req, res)=>{
// 	res.sendFile(path.resolve(__dirname, 'pages/about.html'));
// });
app.use('/about', require('./routes/about.js'));

// // app.get('/contact', (req, res)=>{
// // 	res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
// // });
app.use('/contact', require('./routes/contact.js'));

// // app.get('/post', (req, res)=>{
// // 	res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// // });
app.use('/post', require('./routes/post.js'));


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});