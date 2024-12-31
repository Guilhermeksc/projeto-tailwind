import { TestBed } from '@angular/core/testing';

import { ApiContratoService } from './api-contrato.service';

describe('ApiContratoService', () => {
  let service: ApiContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
