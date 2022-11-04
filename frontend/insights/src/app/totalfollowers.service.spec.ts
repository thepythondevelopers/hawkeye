import { TestBed } from '@angular/core/testing';

import { TotalfollowersService } from './totalfollowers.service';

describe('TotalfollowersService', () => {
  let service: TotalfollowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalfollowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
