import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistshowComponent } from './todolistshow.component';

describe('TodolistshowComponent', () => {
  let component: TodolistshowComponent;
  let fixture: ComponentFixture<TodolistshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
