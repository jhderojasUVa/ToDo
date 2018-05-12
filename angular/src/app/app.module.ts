import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { formComponent } from './components/formComponent/formComponent';
import { toDos } from './components/mytodos/mytodos';

@NgModule({
  declarations: [
    AppComponent, formComponent, toDos
  ],
  imports: [
    BrowserModule, //FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
