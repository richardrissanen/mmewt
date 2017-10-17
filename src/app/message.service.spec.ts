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
    _messageService.listen().subscribe((message: object) => {
      expect(message['type']).toEqual('message');
      expect(message['value']).toEqual(true);
    });
    
    _messageService.brodcast({type: 'message', value: true})
  }));
});
