const express = require("express");
const app = express();
const port = 3000;

app.get('/',((req, res) => {
    res.sendFile(__dirname+'/index.html')
}))

app.get('/about',((req, res) => {
    res.sendFile(__dirname+'/about.html')
}))
app.get('/home',((req, res) => {
    res.sendFile(__dirname+'/home.html')
}))

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

/*
 * in order to fix errors:
 * 1) add a route '/home' with get method which will send 'home.html' as a response
 * 2) go to the file "index.html" and change <a href="home.html"> to <a href="home.html">
 */