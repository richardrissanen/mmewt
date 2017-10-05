import { Injectable, OnInit } from '@angular/core';

import { data } from './data';

@Injectable()
export class DataService {
  events: Array<object>

  constructor() {
    this.events = data;
  }

  fetchEvents() { 
    return this.sortBy('startTime', this.events)
  }  

  sortBy(key, arrayOfObjects) {
    return arrayOfObjects.sort(function(a, b){ return a[key] > b[key] })
  }

}
