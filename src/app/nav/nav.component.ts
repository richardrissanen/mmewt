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
    this.toggleFavorites(this.isFavoritesToggledOn); 
  }
 
  showFavorites() { 
    this.isFavoritesToggledOn = !this.isFavoritesToggledOn;    
    this.toggleFavorites(this.isFavoritesToggledOn); 
  }

  
  private toggleFavorites(flag: boolean) {
    this._messageService.brodcast(flag);
  }

}
