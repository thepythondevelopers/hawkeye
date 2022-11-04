import { TestBed } from '@angular/core/testing';

import { WbcsService } from './wbcs.service';

describe('WbcsService', () => {
  let service: WbcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WbcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
