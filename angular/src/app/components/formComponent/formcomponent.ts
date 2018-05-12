import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Model
import { todoModel } from '../../model/itemtodo.model';
// False data
import { ITEMS } from '../../model/items';

@Component({
  selector: 'formComponent',
  templateUrl: './formComponent.html',
  styleUrls: ['./formComponent.css']
})
export class formComponent {

  // Defining variables, the items
  items = [];
  things = ITEMS;

  // Defining the variables on the component
  public whatIwant: string ='';
  public whattodo: string = '';

  // Addiding an item
  addItem(what: string) {
    let done: boolean = true;

    this.things.push({whattodo: what, itsdone: done});
  }

  // For updating the view
  write(val: string) {
    this.whatIwant = val;
  }
}
