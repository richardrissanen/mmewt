import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './data.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ 
    DataService,
    MessageService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
