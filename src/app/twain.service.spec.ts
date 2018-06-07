import { TestBed, inject } from '@angular/core/testing';

import { TwainService } from './twain.service';

describe('TwainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwainService]
    });
  });

  it('should be created', inject([TwainService], (service: TwainService) => {
    expect(service).toBeTruthy();
  }));
});
