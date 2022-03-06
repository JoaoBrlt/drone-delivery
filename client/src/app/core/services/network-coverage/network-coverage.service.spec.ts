import { TestBed } from '@angular/core/testing';

import { NetworkCoverageService } from './network-coverage.service';

describe('NetworkCoverageService', () => {
  let service: NetworkCoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkCoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
