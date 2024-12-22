import { TestBed } from '@angular/core/testing';

import { MastheadService } from './masthead.service';

describe('MastheadService', () => {
  let service: MastheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
