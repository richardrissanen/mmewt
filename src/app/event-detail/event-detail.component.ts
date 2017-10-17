import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: object

  constructor( 
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    let id = parseInt(idString);

    this.event = this.dataService.getBy('id', id);    
  }
  

}
