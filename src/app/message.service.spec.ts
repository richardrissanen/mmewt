import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should broadcast "showAll" and receive "showAll" when listening', inject([MessageService], (_messageService: MessageService) => {
    _messageService.listen().subscribe((message: String) => {
      expect(message).toEqual('showAll');
    });
    
    _messageService.brodcast('showAll')
  }));
});
