import { TestBed } from '@angular/core/testing';

import { PaymentListService } from './payment-list.service';

describe('PaymentListService', () => {
  let service: PaymentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
