import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// This component resides the form to pass the new ToDos
@Component({
  selector: 'todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnInit {

  constructor() { }

  toDoForm = new FormGroup({
    toDoText: new FormControl(''),
    completed: new FormControl('')
  });
  
  buttonText : string = 'Add it!';

  onSubmit() {
    this.toDoForm.value.completed = this.toDoForm.value.completed ? this.toDoForm.value.completed : false;
    console.log(this.toDoForm.value);
  }

  ngOnInit() {
  }

}
