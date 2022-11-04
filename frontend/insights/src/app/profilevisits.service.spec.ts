import { TestBed } from '@angular/core/testing';

import { ProfilevisitsService } from './profilevisits.service';

describe('ProfilevisitsService', () => {
  let service: ProfilevisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilevisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
