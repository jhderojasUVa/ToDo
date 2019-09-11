const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// The data is stored in a file called file.json on the store directory

const server = http.createServer((req, res) => {

  const url = require('url').parse(req.url);
  // Input variables
  let id, whatToDo, completed;
  // If there's query let's separate the variables
  if (url.query) {
    switch (url.query.split('&').length) {
      case 1:
        // There's only one
        id = url.query.split('&')[0];
        break;
      case 2:
        // Only two
        whatToDo = url.query.split('&')[0];
        completed = url.query.split('&')[1];
        break;
      case 3:
        // All of them
        id = url.query.split('&')[0];
        whatToDo = url.query.split('&')[1];
        completed =url.query.split('&')[2];
        break;
      default:
        // Other
        break;
    }
  }

  switch (url.pathname) {
    case ('/get'):
      // Get all the to do or one by id
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if (typeof id == 'string' && parseInt(id.split('=')[1]) != 0) {
        res.end(retrieveToDo(parseInt(id.split('=')[1])));
        console.log('The user GET a ToDo with ID: ' + parseInt(id.split('=')[1]));
      } else {
        res.end(retrieveStore());
        console.log('The user GET all the ToDos');
      }
      break;
    case ('/post'):
      // Put a new one to do
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(saveInStore(decodeURI(whatToDo.split('=')[1]), (completed.split('=')[1] == 'true')));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500!');
        console.log(err);
      }
      break;
    case ('/delete'):
      // Removes an element by id
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(deleteStore(parseInt(id.split('=')[1])));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500!');
        console.log(err);
      }
      break;
    case ('/update'):
      // Updates an element by ID
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(updateStore(parseInt(id.split('=')[1]), decodeURI(whatToDo.split('=')[1]), (completed.split('=')[1] == 'true')));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('There was an error.\nHey man, there was an error!\n' + err);
        console.log('Error 500!');
        console.log(err);
      }
      break;
    default:
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
  if (typeof id !== 'number') {
    return false;
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

  // This can be done in only one line, but on this ways is more readable
  // First we test the arguments
  if (typeof whatToDo != String && whatToDo == '') {
    return false;
  }

  // Now if the completed is ok
  if (typeof completed !== "boolean") {
    return false;
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

  // First we test the arguments
  if (typeof id !== 'number') {
    return false;
  }

  if (typeof whatToDo != 'string' && whatToDo == '') {
    return false;
  }

  if (typeof completed !== 'boolean') {
    return false;
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
  if (typeof id !== 'number') {
    return false;
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