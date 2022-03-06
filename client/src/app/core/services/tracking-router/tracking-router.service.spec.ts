import { TestBed } from '@angular/core/testing';

import { TrackingRouterService } from './tracking-router.service';

describe('TrackingRouterService', () => {
  let service: TrackingRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
