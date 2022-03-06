import { TestBed } from '@angular/core/testing';

import { AirTrafficAuthorityService } from './air-traffic-authority.service';

describe('AirTrafficAuthorityService', () => {
  let service: AirTrafficAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirTrafficAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
