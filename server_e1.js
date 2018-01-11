var express = require('express');
var bodyParser     =        require("body-parser");
var helmet = require('helmet');
var fs = require('fs');

var app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3nObby7',
  name: 'sessionId',
	  resave: false,
    saveUninitialized: false
}));

var secretAwsKey = process.env.SCOTTKEY;

console.log("KEY= " + secretAwsKey)

var database = {};

const htmlLogin = '<style>div { font-size: 30px } </style><form action="/login" method="post">    <div>        <label>Username:</label>        <input type="text" name="username"/> </div>    <div> <label>Password:</label>        <input type="password" name="password"/>    </div>    <div>        <input type="submit" value="Log In"/>    </div></form>';

app.use( function(req,res,next) {
	console.log('checking stuff..');
	next();
});

app.get('/login', function(req,res) {
	
	res.send(htmlLogin);
});
	
app.post('/login', function(req,res) {
	console.log("/login: " + JSON.stringify(req.body));
	
	if (req.body.password == 'phil') {
		req.session.user = req.body.username;
		console.log("logged in..");
		res.redirect('/scott');
	} else {
		res.send(htmlLogin + 'Password Incorrect');
	}
});


app.get('/scott', function(req,res) {
	if (req.session && req.session.user) {
	console.log('get scott');
		console.log(req.session);
	if (req.session.views) {
		
		req.session.views++;
		let html = 'hi scott' + req.session.views;
		if (req.headers) html += 'usragent:' + req.headers['user-agent'];
		res.send(html);
		console.log(req.session);
	} else {
		req.session.views = 1;
		res.send('first page view yay');
		console.log(req.session);
	}
	} else {
//		res.send('not logged in');
		res.redirect('/login');
	}
	
});



app.get('/users/:id', function(req,res, next) {
	console.log('logged in route');
	req.session.user = 'temp';
	if(req.session) console.log('got a session');
	if (req.session && req.session.user) {
		let html = '<form method="post">'+
			'<div>Image link: <input type="text" name="image"/></div>'+
			'<div>Audio link: <input type="text" name="audio"/></div>'+
			'<div>Text: <input type="text" name="text"/></div>'+
			'<div><input type="submit">Post</input></div>'+
			'</form>';
		res.send(html);
	} else {
		res.send('User' + req.params.id + 'needs to <a href=" http://localhost:3000/login">Login</a>');
	}
});
app.post('/users/:id', function(req,res, next) {
	if (req.session && req.session.user) {
		console.log('page: ' + req.params.id);
		console.log('user posted ' + JSON.stringify(req.body));
		var myPage = {};
		myPage.image = req.body.image;
		myPage.audio = req.body.audio;
		myPage.text = req.body.text;
		database[req.params.id] = myPage;
	} else {
		res.send('User' + req.params.id + 'needs to <a href=" http://localhost:3000/login">Login</a>');
	}
});


app.get('/shutdownAya', (req,res) => {shutdownAya(); process.exit(); });
app.get('/startupAya', (req,res) => {startupAya()});


app.get('/:id', function(req,res, next) {
	console.log('anonymoys route');
	if (database[req.params.id]) {
		let html = 'my page';
		html += '<image src="' +  database[req.params.id].image + '"/>';
		html += '<audio controls><source src="' +  database[req.params.id].audio + 'type="audio/mpeg/"></audio>';
		html += '<div>' +  database[req.params.id].text + '<div/>';
			
		res.send(html);
	} else {
		res.send('The page joinin.io/' + req.params.id + '   created for user:' + req.session.user);
	}
//	res.send('The page joinin.io/' + req.params.id);
});


app.post('/upload', function(req,res, next) {
	console.log('upload:' + req.body);
});


/*
var router = express.Router();    

router.route('/hello')
.get(function(req, res, next) {
	console.log('get hello')
  res.send('Hello World');
});


// REST API
router.route('/items')
.get(function(req, res, next) {
  res.send('Get');
})
.post(function(req, res, next) {
  res.send('Post');
});

router.route('/items/:id')
.get(function(req, res, next) {
  res.send('Get id: ' + req.params.id);
})
.put(function(req, res, next) {
  res.send('Put id: ' + req.params.id);
})
.delete(function(req, res, next) {
  res.send('Delete id: ' + req.params.id);
});

app.use('/api', router);

*/
// Execute commands in clean exit
process.on('exit', function () {
	
	console.log('process exit');
	shutdownAya();
});

// happens when you press Ctrl+C
process.on('SIGINT', function () {
	console.log('exit');
//	shutdownAya();
    process.exit();
});
// usually called with kill
process.on('SIGTERM', function () {
    console.log('Parent SIGTERM detected (kill)');
//	shutdownAya();
    process.exit(0);
});

function shutdownAya() {
	console.log('writing the file zz');
	fs.writeFileSync("./object.json", JSON.stringify(database, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been saved");
	});
}

function startupAya() {
	console.log('reading the file');
	database = JSON.parse(fs.readFileSync("./object.json"));
						   
	console.log(JSON.stringify(database));
}

startupAya();
var server = app.listen(3000, function() {
  console.log('Express is listening to http://localhost:3000');
}).on('error', function(err) { if (err.errno === 'EADDRINUSE') { console.log('port busy'); } else { console.log(err); } });
