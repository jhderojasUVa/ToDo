import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

import { ToDoItem } from '../store/models/todo.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // This component will render a form with an input text and a checkbox
  // Will send to the parent the data writed on the form

  // Form elements using form control
  whatToDo = new FormControl('');
  done = new FormControl('');

  // Event emitter to the parent component
  @Output() sentToDo: EventEmitter<ToDoItem> = new EventEmitter();

  todoItem: ToDoItem; // Basic ToDo Item

  constructor() { }

  ngOnInit() {
    // Not needed
  }

  sendToDoItem() {
    // This method sends the data from the form and emit to the parent component
    this.todoItem = {
      what: this.whatToDo.value,
      done: this.done.value ? true : false
    };

    this.sentToDo.emit(this.todoItem);
  }
}
