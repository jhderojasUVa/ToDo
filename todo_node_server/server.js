const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Data to store in memory with one example
var todoData = [
  { id: 1, whatToDo: 'nothing', completed: false }
];

const server = http.createServer((req, res) => {

  const url = require('url').parse(req.url);

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
      //const [ id, whatToDo, completed ] = url.query.split('&');
      const [ whatToDo, completed ] = url.query.split('&');
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
        res.end('There was an error.\nHey man, there was an error!\n');
        console.log('Error 500!');
      }
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>Page not found</h1>
        <p>Sorry, the page you are looking for is not here.</p>
        <p>
          <ul>
            <li><strong>/get</strong>: for getting all the TODOs</li>
            <li><strong>/post?whatToDo=XXXXX&completed=true|false</strong>: to add a ToDo</li>
          </ul>
        </p>
        <p>Every time you do the correct it will respond with the ToDos.</p>
        `);
      console.log('404!');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
