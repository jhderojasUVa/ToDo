import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers/todo.reducers';
import { ListComponent } from './list/list.component';

import { HttpClientModule } from '@angular/common/http';

import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({todo: todoReducer}),
    HttpClientModule
  ],
  providers: [ TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
