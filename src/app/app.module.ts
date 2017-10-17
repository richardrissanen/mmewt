import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';
import { EventDetailComponent } from './event-detail/event-detail.component';

const appRoutes: Routes = [
  { path: '', component: EventsComponent},
  { path: 'events/:id', component: EventDetailComponent},
  // { path: 'faq',      component: FaqComponent },
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    NavComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ 
    DataService,
    LocalStorageService,
    MessageService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
