const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

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

  switch (url.pathname) {
    case ('/get'):
      // Get all the to do or one by id
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if (queryElements.id != undefined) { // User ask for one ID
        res.end(retrieveToDo(parseInt(queryElements.id)));
      } else { // User ask for all
        res.end(retrieveStore());
      }
      break;
    case ('/post'):
      // Put a new one to do
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(saveInStore(queryElements.whatToDo, queryElements.completed));
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
        res.end(deleteStore(parseInt(queryElements.id)));
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
        res.end(updateStore(parseInt(queryElements.id), queryElements.whatToDo, queryElements.completed));
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
        res.end(refactorId());
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
          //res.setHeader('Content-Type', 'image/png');
          res.setHeader('Content-Type', mimeTypes[query.substr((query.length - 3), 3)]);
          res.end(content);
        }
      });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function retrieveStore() {
  // This function will retrieve the the content of the store file
  // @return (string)
  return fs.readFileSync(__dirname + '/store/file.json', (err, data) => {
    return data.toString();
  }).toString();
}

function retrieveToDo(id) {
  // This function will return one ToDo by id
  // id (number)
  // @return ToDo (JSON)

  // First we test the arguments
  if (typeof id !== 'number' || isNaN(id)) {
    return JSON.stringify({'error' :true, 'cause': errorMessages.id});
  }

  let data = JSON.parse(retrieveStore());

  return JSON.stringify(data.ToDos.filter((element) => {
    return element.id == id;
  }));
}

function saveInStore(whatToDo, completed) {
  // Saves a ToDo in the store
  // whatToDo (string): Text to write
  // completed (boolean): if it's completed or not
  // @return (boolean)

  // Convert completed string to boolean
  completed = (completed == 'true');

  // This can be done in only one line, but on this ways is more readable
  // First we test the arguments
  if (typeof whatToDo != String && whatToDo == '') {
    return JSON.stringify({'error' :true, 'cause': errorMessages.whatToDo});
  }

  // Now if the completed is ok (it will be difficult to get here!)
  if (typeof completed !== "boolean") {
    return JSON.stringify({'error' :true, 'cause': errorMessages.completed});
  }

  let data = JSON.parse(retrieveStore());
  data.ToDos.push({
    'id': (data.ToDos[(data.ToDos.length - 1)].id) + 1,
    'whatToDo': whatToDo,
    'completed': completed
  });
  fs.writeFileSync(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log('There was an error saving the store file: ' + err);
    }
  });

  return JSON.stringify(data);
}

function updateStore(id, whatToDo, completed) {
  // Function that updates an item in the store
  // id (number)
  // whatToDo (string)
  // completed (boolean)
  // @return (string)

  completed = (completed == 'true');

  // First we test the arguments
  if (typeof id !== 'number' || isNaN(id)) {
    return JSON.stringify({'error': true, 'cause': errorMessages.id});
  }

  if (typeof whatToDo != 'string' && whatToDo == '') {
    return JSON.stringify({'error': true, 'cause': errorMessages.whatToDo});
  }

  if (typeof completed !== 'boolean') {
    return JSON.stringify({'error': true, 'cause': errorMessages.completed});
  }

  // First we retrieve the data
  let data = JSON.parse(retrieveStore());

  // Search and change the item
  data.ToDos.forEach((element) => {
    if (element.id == id) {
      element.whatToDo = whatToDo;
      element.completed = completed
    }
  });

  // Now save the file
  fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log('There was an error saving the store file: ' + err);
    }
  });

  return JSON.stringify(data);
}

function deleteStore(id) {
  // Function that removes an element from the store
  // id (number)
  // @return (string)
  // Check the argument
  if (typeof id !== 'number' || isNaN(id)) {
    return JSON.stringify({'error': true, 'cause': errorMessages.id});
  }

  // First we retrieve the data
  let data = JSON.parse(retrieveStore());

  // Now we remove the item with the id from the data
  data.ToDos = data.ToDos.filter((element, key) => {
    return element.id != id;
  });

  // Save to disk
  fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log('There was an error saving the store file: ' + err);
    }
  });

  return JSON.stringify(data);
}

function refactorId() {
  // Function that refactors the ids
  // @return (string)

  // First we retrieve the data
  let data = JSON.parse(retrieveStore());

  // Let's sort the elements by their IDs
  data.ToDos.sort((elemA, elemB) => {
    return elemA.id - elemB.id
  });

  // Now let's put the new IDs
  data.ToDos.forEach((element, key) => {
    element.id = key;
  });

  // And now, store into disk
  fs.writeFile(__dirname + '/store/file.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log('There was an error saving the store file: ' + err);
    }
  });

  return JSON.stringify(data);
}