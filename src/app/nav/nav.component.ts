import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() 
  onFilter: EventEmitter<any> = new EventEmitter();

  constructor(private _messageService: MessageService) { }

  ngOnInit() {}

  showAll() { this._messageService.brodcast('showAll') }
  showCurrent() { this._messageService.brodcast('showCurrent') }
  showFavorites() { this._messageService.brodcast('showFavorites') }

}
