import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { MessageService } from '../message.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  allEvents: Array<object>
  events: Array<object>
  favIds: Array<object>
  noEventsMessage: string
  dateFormat: string

  constructor(private _dataService: DataService, private _messageService: MessageService, private _localStorageService: LocalStorageService) {
    this._messageService.listen().subscribe((message: object) => {
      this.process(message);
    });
  }

  ngOnInit() {
    this.allEvents = this._dataService.fetchEvents();
    this.events = this.allEvents;
    this.favIds = this._localStorageService.fetchFavorites();
    this.dateFormat = 'EEE hh:mma';
    this.updateNoEventsMessage('In order for events to show up here, you must tap the star.');    
  }

  process(message: object) {
    const value = message['value'];

    switch (message['type']) {
      case 'toggleFavorites': { 
        this.toggleFavorites(value); 
        break;
      }
      case 'search': { 
        this.events = this.searchEventsFor(value); 
        break;        
      }
    }
    
  }

  toggleFavorites(show: boolean) {
    if (show) {
        this.events = this.enumerateAllEventsForFavorites();
    } else {
      this.events = this.allEvents;
    } 
  }

  searchEventsFor(term: String) {    
    var eventsFound = new Array();
    
    this.allEvents.forEach(function(event) {
      const lowerCasedTitle = event['title'].toLowerCase();
      const lowerCasedTerm = term.toLowerCase();      
      if (lowerCasedTitle.indexOf(lowerCasedTerm) !== -1) { eventsFound.push(event); }
    });

    return eventsFound;
  }

  enumerateAllEventsForFavorites() { 
    var favoriteEvents = new Array();
    const favoriteEventIds = this._localStorageService.fetchFavorites();
    
    this.allEvents.forEach(function(event) {
      if (favoriteEventIds.indexOf(event['id']) !== -1) { favoriteEvents.push(event); }
    });

    return favoriteEvents; 
  }

  favoriteEvent(eventId) { 
    const finished = this._localStorageService.toggleFavorite(eventId); 
    if (finished)  { this.favIds = this._localStorageService.fetchFavorites(); }
  }

  isFavorite(eventId) { return this.favIds.indexOf(eventId) !== -1 }
  
  updateNoEventsMessage(message) { 
    if (this.events.length === 0) { this.noEventsMessage = message; }
    else { this.noEventsMessage = null } 
  }
  
}
