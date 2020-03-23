const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// File library for the storage
const fsLib = require('./file.lib');

const hostname = '127.0.0.1';
const port = 8080;

// Message error (to convert to JSON as a response)
const errorMessages = {
  'whatToDo': 'What to Do is not an string or it\'s empty',
  'id': 'ID is not a number',
  'completed': 'Completed is not a boolean',
  'unknow': 'Unknow error!'
};

// Mimetypes for serving files
const mimeTypes = {
  'html': 'text/html',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'jpg': 'image/jpg',
  'gif': 'image/gif'
}

// The data is stored in a file called file.json on the store directory
const server = http.createServer((req, res) => {

  const url = require('url').parse(req.url);

  // If there's query let's separate the variables
  var queryElements = querystring.parse(url.query, null, null, { decodeURIComponent: querystring.unescape() });

  // Wops! don't forget the CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  switch (url.pathname) {
    case ('/get'):
      // Get all the to do or one by id
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if (queryElements.id != undefined) { // User ask for one ID
        res.end(fsLib.retrieveToDo(parseInt(queryElements.id)));
      } else { // User ask for all
        res.end(fsLib.retrieveStore());
      }
      break;
    case ('/post'):
      // Put a new one to do
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(fsLib.saveInStore(queryElements.whatToDo, queryElements.completed));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500! IP: '+ req.connection.remoteAddress+ ' Client: '+ req.headers['user-agent']);
        console.log(err);
      }
      break;
    case ('/delete'):
      // Removes an element by id
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(fsLib.deleteStore(parseInt(queryElements.id)));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500! IP: '+ req.connection.remoteAddress+ ' Client: '+ req.headers['user-agent']);
        console.log(err);
      }
      break;
    case ('/update'):
      // Updates an element by ID
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(fsLib.updateStore(parseInt(queryElements.id), queryElements.whatToDo, queryElements.completed));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500! IP: '+ req.connection.remoteAddress+ ' Client: '+ req.headers['user-agent']);
        console.log(err);
      }
      break;
    case ('/refactor'):
      // Reorder all the ToDos to solve the empty id problem
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(fsLib.refactorId());
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500! IP: '+ req.connection.remoteAddress+ ' Client: '+ req.headers['user-agent']);
        console.log(err);
      }
      break;
    default:
      // Serve other files [images] on the filesystem or the default
      var query = url.parse(req.url, true).pathname;

      fs.readFile(__dirname + query, function (err, content) {
        if (err) {
          // Send to the default page
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          // Read the file index.html
          fs.readFile( __dirname + '/index.html', (err, data) => {
            if (err) {
              throw err;
            }
            // Send to the browser
            res.end(data.toString());
          });
          console.log('404! Send to default page!');
        } else {
          // Serve the image
          res.statusCode = 200;
          res.setHeader('Content-Type', mimeTypes[query.substr((query.length - 3), 3)]);
          res.end(content);
        }
      });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});