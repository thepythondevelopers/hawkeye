import { TestBed } from '@angular/core/testing';

import { MediaidService } from './mediaid.service';

describe('MediaidService', () => {
  let service: MediaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
