import { TestBed } from '@angular/core/testing';

import { TotalFollowingService } from './total-following.service';

describe('TotalFollowingService', () => {
  let service: TotalFollowingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalFollowingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
