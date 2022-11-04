import { TestBed } from '@angular/core/testing';

import { ContentreachService } from './contentreach.service';

describe('ContentreachService', () => {
  let service: ContentreachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentreachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
