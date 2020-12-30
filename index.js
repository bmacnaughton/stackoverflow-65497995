const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost'
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + ' by method ' + req.method);


  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') {
      fileUrl = '/index.html';
    } else {
      fileUrl = req.url;
    }
    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.open(filePath, 'r', (err, fd) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error: 404 ' + fileUrl + ' HTML FILE NOT FOUND </h1></body></html>');
          console.error(err.message);
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('', {fd}).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error: 404 ' + fileUrl + ' none HTML file not found</h1></body></html>');
      return;
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error: 404 ' + req.method + ' not supported</h1></body></html>');
    return;
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
