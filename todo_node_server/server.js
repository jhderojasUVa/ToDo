const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Data to store in memory with one example
var todoData = [
  { id: 1, whatToDo: 'nothing', completed: false }
];

const server = http.createServer((req, res) => {

  const url = require('url').parse(req.url);
  // Input variables
  let id, whatToDo, completed;
  // If there's query let's separate the variables
  if (url.query) {
    switch (url.query.split('&').length) {
      case 1:
        // There's only one
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
      // Get all the to do
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todoData));
      console.log('The user GET all the ToDos');
      break;
    case ('/post'):
      // Put a new one to do
      try {
        todoData.push({
          id: todoData.length + 1,
          whatToDo: whatToDo.split('=')[1],
          completed: (completed.split('=')[1] == 'true')
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todoData));
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
        todoData = todoData.filter((element, key) => {
          return element.id != parseInt(id.split('=')[1]);
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todoData));
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
        todoData.forEach((element) => {
          if (element.id == parseInt(id.split('=')[1])) {
            element.whatToDo = whatToDo.split('=')[1];
            element.completed = (completed.split('=')[1] == 'true')
          }
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todoData));
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
      res.end(`<!doctype html>
        <html lang="en">
        <head>
          <title>404! Page not found</title>
          <style>
          html {
            font-family: Arial, Helvetica, Times;
            font-size: 1em;
            font-color: black;
          }
          body {
            max-width: 50%;
            margin: auto;
          }
          </style>
        </head>
        <body>
        <h1>404: Page not found</h1>
        <p>Sorry, the page you are looking for is not here.</p>
        <p>
          <ul>
            <li><strong>/get</strong>: for getting all the TODOs</li>
            <li><strong>/post?whatToDo=XXXXX&completed=true|false</strong>: to add a ToDo</li>
            <li><strong>/delete?id=XXX</strong>: removes a TODO by id</li>
          </ul>
        </p>
        <p>Every time you do the correct it will respond with the ToDos.</p>
        </body>
        </html>
        `);
      console.log('404! Send to default page!');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
