import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  allEvents: Array<object>
  events: Array<object>

  constructor(private _dataService: DataService, private _messageService: MessageService) {
    this._messageService.listen().subscribe((message: String) => {
      this.changeEventContext(message);
    });
  }

  ngOnInit() {
    this.allEvents = this._dataService.fetchEvents();
    this.events = this.allEvents;
  }

  changeEventContext(message: String) {
    switch(message) {
      case 'showAll': {
        this.events = this.allEvents;
        break;
      }
      case 'showCurrent': {
        this.events = this.enumerateAllEventsForCurrent();
        break;
      }
      case 'showFavorites': {
        console.log('Only Favorites!!!')
        break;
      }
    }
  }

  enumerateAllEventsForCurrent() {
    var currentEvents = new Array();
    
    this.allEvents.forEach(function(event) {
      const now = new Date();
      
      // should subtract some arbitray amount of time (15 minutes?) from startTime so that events will show before they start
      if (event['endTime'] > now && event['startTime'] <= now) { currentEvents.push(event); }
    });

    return currentEvents;
  }

  enumerateAllEventsForFavorites() { return []; }
  
}
