import { TestBed } from '@angular/core/testing';

import { FollowersDetailsService } from './followers-details.service';

describe('FollowersDetailsService', () => {
  let service: FollowersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
