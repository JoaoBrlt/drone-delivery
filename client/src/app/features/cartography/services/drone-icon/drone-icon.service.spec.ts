import { TestBed } from '@angular/core/testing';

import { DroneIconService } from './drone-icon.service';

describe('DroneIconService', () => {
  let service: DroneIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
