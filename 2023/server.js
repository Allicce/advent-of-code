// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
      });
    } else if (req.url === '/app.js') {
      fs.readFile(path.join(__dirname, 'app.js'), (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.end(data);
        }
      });
    } else if (req.url === '/utils.js') { // Add this part to serve utils.js
      fs.readFile(path.join(__dirname, 'utils.js'), (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Page not found');
    }
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});