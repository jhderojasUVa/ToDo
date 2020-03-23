const fs = require('fs');

const retrieveStore = () => {
    // This function will retrieve the the content of the store file
    // @return (string)
    return fs.readFileSync(__dirname + '/store/file.json', (err, data) => {
      return data.toString();
    }).toString();
  }
  
const retrieveToDo = (id) => {
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
  
 const saveInStore = (whatToDo, completed) => {
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
  
 const updateStore = (id, whatToDo, completed) => {
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
  
const deleteStore = (id) => {
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
  
 const refactorId = () => {
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

  exports.retrieveStore = retrieveStore;
  exports.retrieveToDo = retrieveToDo;
  exports.saveInStore = saveInStore;
  exports.updateStore = updateStore;
  exports.deleteStore = deleteStore;
  exports.refactorId = refactorId;