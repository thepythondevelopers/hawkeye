import { TestBed } from '@angular/core/testing';

import { ToppostService } from './toppost.service';

describe('ToppostService', () => {
  let service: ToppostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToppostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
