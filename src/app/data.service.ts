import { Injectable, OnInit } from '@angular/core';

import { data } from './data';

@Injectable()
export class DataService {
  events: Array<object>

  fetchEvents() { return this.events }  

  constructor() {
    this.events = data;
  }

}
