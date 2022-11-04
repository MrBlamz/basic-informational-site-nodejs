import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

http
  .createServer((request, response) => {
    console.log('request starting...');

    let filePath = '.' + request.url;
    // Home page
    if (filePath == './') filePath = './index.html';
    console.log(`Requesting file: ${filePath}`);

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.wav':
        contentType = 'audio/wav';
        break;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          console.log(`${filePath} not found!`);
          fs.readFile('./404.html', function (error, content) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          });
        } else {
          response.writeHead(500);
          response.end(
            'Sorry, check with the site admin for error: ' +
              error.code +
              ' ..\n'
          );
          response.end();
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  })
  .listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
