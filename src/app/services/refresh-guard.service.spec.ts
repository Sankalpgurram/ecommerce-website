import { TestBed } from '@angular/core/testing';

import { RefreshRedirectGuard } from './refresh-guard.service';

describe('RefreshGuardService', () => {
  let service: RefreshRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshRedirectGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
