import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EventsComponent } from './events.component';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';
import { LocalStorageService } from '../local-storage.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      providers: [ 
        DataService,
        MessageService,
        LocalStorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list with 4 events', inject([DataService], (service: DataService) => {
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(4);
  }));

  it('should have list items with an article that have one section each', inject([DataService], (service: DataService) => {
    const articles = fixture.debugElement.queryAll(By.css('li > article'));
    expect(articles.length).toBe(4);
    
    const sections = fixture.debugElement.queryAll(By.css('li > article > section'));
    expect(sections.length).toBe(4);
  }));

  it('should have events that match dataServiceEvents', inject([DataService], (service: DataService) => {
    const componentEvents = component.events;
    const dataServiceEvents = new DataService().fetchEvents()
    expect(componentEvents).toEqual(dataServiceEvents);
  }));

  it('should return an empty array when enumerateAllEventsForFavorites runs', inject([DataService], (service: DataService) => {
    const favoriteEvents = component.enumerateAllEventsForFavorites();
    expect(Object.prototype.toString.call(favoriteEvents)).toEqual('[object Array]');
    expect(favoriteEvents.length).toEqual(0);
  }));

});
