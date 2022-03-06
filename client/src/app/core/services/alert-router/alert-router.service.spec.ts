import { TestBed } from '@angular/core/testing';

import { AlertRouterService } from './alert-router.service';

describe('AlertRouterService', () => {
  let service: AlertRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
