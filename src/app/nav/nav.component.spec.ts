import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { MessageService } from '../message.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [ MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should broadcast "showAll" when showAll() runs', inject([MessageService], (_messageService: MessageService) => {
    _messageService.listen().subscribe((message: String) => {
      expect(message).toEqual('showAll');
    });
    
    component.showAll();
  }));

  it('should broadcast "showCurrent" when showCurrent() runs', inject([MessageService], (_messageService: MessageService) => {
    _messageService.listen().subscribe((message: String) => {
      expect(message).toEqual('showCurrent');
    });
    
    component.showCurrent();
  }));

  it('should broadcast "showFavorites" when showFavorites() runs', inject([MessageService], (_messageService: MessageService) => {
    _messageService.listen().subscribe((message: String) => {
      expect(message).toEqual('showFavorites');
    });
    
    component.showFavorites();
  }));
});
