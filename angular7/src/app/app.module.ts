import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoformComponent } from './todoform/todoform.component';
import { TodolistshowComponent } from './todolistshow/todolistshow.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoformComponent,
    TodolistshowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
