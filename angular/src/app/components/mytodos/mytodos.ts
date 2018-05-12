import { Component, OnInit } from '@angular/core';

// Model
import { todoModel } from '../../model/itemtodo.model';

// False data
import { ITEMS } from '../../model/items';

@Component({
  selector: 'toDos',
  templateUrl: './mytodos.html',
  styleUrls: ['./mytodos.css']
})

export class toDos {
  items = ITEMS;

  changeState(index) {
    if (this.items[index].itsdone == false) {
      this.items[index].itsdone = true;
    } else {
      this.items[index].itsdone = false;
    }
  }

  deleteItem(index) {
    this.items.splice(index, 1);
  }
}
