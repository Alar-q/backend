const http = require('http');

const server = http.createServer((req, res)=>{
	if(req.url === '/home'){
		res.end('The home page');
	}
	else{
		res.writeHead(404);
		res.end('page not found');
	}
});

server.listen(30);