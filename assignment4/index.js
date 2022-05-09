const express = require('express')
const path = require('path')

const port = 3000
const app = new express()

/* FILE UPLOAD (IMAGE) */
const fileUpload = require('express-fileupload')
app.use(fileUpload())


/* BODY PARSER */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/* MongoDB */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
const BlogPost = require('./models/BlogPost.js')

/* EJS */
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

//Routes
app.use('/', require('./routes/root.js'))
app.use('/home', require('./routes/root.js'))
// app.use('/post', require('./routes/post.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/about', require('./routes/about.js'))


/* MongoDB */
app.get('/posts/new', (req, res)=>{
	res.render('create')
})
app.post('/posts/create', async (req, res)=>{
	await BlogPost.create(req.body) 
	res.redirect('/')		
})


/* DynamicData */
// all posts
app.get('/posts/view', async (req, res)=>{
	const blogposts = await BlogPost.find({}) //title: "Alar Akilbekov"
	console.log(blogposts)
	// Можно просто написать blogposts
	res.render('posts', {blogposts: blogposts})
})

// static 
app.get('/post', (req, res) => res.render('post'));
// dynamic
app.get('/post/:id', async (req, res) => {
	console.log(req.params);
	const blogpost = await BlogPost.findById(req.params.id);
	res.render('dynamic_post', {blogpost});
});


/* FILE UPLOAD (IMAGE) */
app.get('/posts/newImg', (req, res)=>{
	res.render('createImg')
})
app.post('/posts/postImg', async (req, res)=>{
	let image = req.files.image;
	image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
		console.log(error)
		await BlogPost.create({
			...req.body,
			image: '/img/' + image.name,
		}) 
		res.redirect('/')		
	})
})

// Start server
app.listen(port, ()=>console.log(`listening on port ${port}`))