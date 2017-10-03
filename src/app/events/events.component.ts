import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Array<object>

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.events = this._dataService.fetchEvents();
  }

}
