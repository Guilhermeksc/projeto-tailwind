import { TestBed } from '@angular/core/testing';

import { PasswordChangeService } from './password-change.service';

describe('PasswordResetService', () => {
  let service: PasswordChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
