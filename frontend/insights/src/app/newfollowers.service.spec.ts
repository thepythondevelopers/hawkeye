import { TestBed } from '@angular/core/testing';

import { NewfollowersService } from './newfollowers.service';

describe('NewfollowersService', () => {
  let service: NewfollowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewfollowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
