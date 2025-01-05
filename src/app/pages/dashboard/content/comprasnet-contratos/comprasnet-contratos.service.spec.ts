import { TestBed } from '@angular/core/testing';

import { ComprasnetContratosService } from './comprasnet-contratos.service';

describe('ComprasnetContratosService', () => {
  let service: ComprasnetContratosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasnetContratosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
