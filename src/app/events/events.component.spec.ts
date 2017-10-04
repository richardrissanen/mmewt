import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EventsComponent } from './events.component';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      providers: [ 
        DataService,
        MessageService
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

  it('should have list items with an article that have 3 sections each', inject([DataService], (service: DataService) => {
    const articles = fixture.debugElement.queryAll(By.css('li > article'));
    expect(articles.length).toBe(4);
    
    const sections = fixture.debugElement.queryAll(By.css('li > article > section'));
    expect(sections.length).toBe(12);
  }));

  it('should have list items with an article that has 1 section that has a dl', inject([DataService], (service: DataService) => {
    const dl = fixture.debugElement.queryAll(By.css('li > article > section > dl'));
    expect(dl.length).toBe(4);
  }));

  it('should have list items with an article that has 1 section that has a dl with 3 dt and dd', inject([DataService], (service: DataService) => {
    const dt = fixture.debugElement.queryAll(By.css('li > article > section > dl > dt'));
    expect(dt.length).toBe(12);

    const dd = fixture.debugElement.queryAll(By.css('li > article > section > dl > dd'));
    expect(dd.length).toBe(12);
  }));

  it('should have events that match dataServiceEvents', inject([DataService], (service: DataService) => {
    const componentEvents = component.events;
    const dataServiceEvents = new DataService().fetchEvents()
    expect(componentEvents).toEqual(dataServiceEvents);
  }));

  it('should return an array with 1 event when enumerateAllEventsForCurrent runs', inject([DataService], (service: DataService) => {
    spyOn(service, 'fetchEvents').and.returnValue(
      [
        {
          id: 4,
          title: 'Event Title #4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          startTime: new Date(),
          endTime: new Date(),
          location: 'Location #2',
          host: 'Hostname',
          feature: 'Feature Name'
        }
      ]
    )
    const currentEvents = component.enumerateAllEventsForCurrent();
    expect(Object.prototype.toString.call(currentEvents)).toEqual('[object Array]');
    expect(currentEvents.length).toEqual(1);
  }));

  it('should return an empty array when enumerateAllEventsForFavorites runs', inject([DataService], (service: DataService) => {
    const favoriteEvents = component.enumerateAllEventsForFavorites();
    expect(Object.prototype.toString.call(favoriteEvents)).toEqual('[object Array]');
    expect(favoriteEvents.length).toEqual(0);
  }));

});
