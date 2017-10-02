import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  describe('fetchEvents', () => {

    it('should return an array of objects', inject([DataService], (service: DataService) => {
      const response = service.fetchEvents();
      
      expect(response instanceof Array).toEqual(true);

      response.forEach(function(item) {
        expect(item instanceof Object).toEqual(true);        
      });

    }));

    it('should return an array objects with defined keys', inject([DataService], (service: DataService) => {
      const response = service.fetchEvents();
      
      response.forEach(function(item) {
        ['id', 'title', 'description', 'startTime', 'endTime', 'location'].forEach(function(key) {
          const objectKeys = Object.keys(item)
          expect(objectKeys.indexOf(key)).not.toBe(-1);
        });        
      });

    }));

  });
});
