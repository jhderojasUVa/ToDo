import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

import { ToDoItem } from '../store/models/todo.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  whatToDo = new FormControl('');
  done = new FormControl('');

  @Output() sentToDo: EventEmitter<ToDoItem> = new EventEmitter();

  todoItem: ToDoItem;

  constructor() { }

  ngOnInit() {
  }

  sendToDoItem() {
    this.todoItem = {
      what: this.whatToDo.value,
      done: this.done.value ? true : false
    };

    this.sentToDo.emit(this.todoItem);
  }
}
