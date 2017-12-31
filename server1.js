const http = require('http')
const port = 3000

//var database = [];

let database = new Map();
let todayList = ['https://lh3.googleusercontent.com/pj0jrgFCXjNtAkktmst6H1qaU4F9nmOE5b7_kAcwgYfoQfF7NQXQo3uu2lteXqFrEsg=w300' ,
				'https://i.pinimg.com/736x/46/2f/e2/462fe27aafa0875402df798da0710331--cute-cats-love.jpg',
				'https://memeguy.com/photos/images/cats-eating-dinner-at-the-table-237369.jpg'];


const requestHandler = (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	console.log(req.url);
//	database.push(req.url)
	
//	console.log(request);
	
//  res.end('Hello Node.js Server!')
	
	if (req.url == '/json') {
	if (req.method == 'POST'){
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
//            console.log("Body: " + body);
			let obj = JSON.parse(body);
			if (obj.key) {
				database.set(obj.key, obj);
				console.log("saved " + obj.key)
			} 
			else console.log('no key: ' + obj);
        });		
		res.end("yeah done it all");
	}
	if (req.method = 'GET'){
		
		res.end(JSON.stringify({'high':'there'}));
		console.log('../json get');
		console.log('body = ' + req.body);
	}
	}
	
	
	if (req.url == '/today') {
		console.log('today....');
	if (req.method == 'GET'){
		console.log('today get....');
		console.log(JSON.stringify(todayList));
		res.end(JSON.stringify(todayList));
	}
	}
	
//	res.end(database.toString());
	
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

