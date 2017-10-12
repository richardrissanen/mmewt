import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isFavoritesToggledOn: boolean

  @Output() 
  onFilter: EventEmitter<any> = new EventEmitter();

  constructor(private _messageService: MessageService) { }

  ngOnInit() { 
    this.isFavoritesToggledOn = false;
    this.brodcast('toggleFavorites', this.isFavoritesToggledOn); 
  }

  onKey(term: string) { this.brodcast('search', term); }

  showFavorites() { 
    this.isFavoritesToggledOn = !this.isFavoritesToggledOn;    
    this.brodcast('toggleFavorites', this.isFavoritesToggledOn); 
  }

  private brodcast(type: string, value: any) {
    this._messageService.brodcast({ 
      type: type,      
      value: value
    });
  }

}
