import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  lastButtonClicked: string

  @Output() 
  onFilter: EventEmitter<any> = new EventEmitter();

  constructor(private _messageService: MessageService) { }

  ngOnInit() { this.lastButtonClicked = 'showAll'; }

  showAll() { this.handleClick('showAll'); }
  showCurrent() { this.handleClick('showCurrent'); }  
  showFavorites() { this.handleClick('showFavorites'); }

  private handleClick(flag: string) {
    this._messageService.brodcast(flag);
    this.lastButtonClicked = flag; 
  }

}
