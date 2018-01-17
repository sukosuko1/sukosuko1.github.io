var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    console.log(req.headers);
    console.log(req.url);
//  res.writeHead(200, {'Content-Type': 'text/html'});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'application/json' });
    
  var q = url.parse(req.url, true).query;
    console.log("......");
    for (t in url.parse(req.url, true)) {
         console.log(t);
    }
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);


