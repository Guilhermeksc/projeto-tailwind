import { TestBed } from '@angular/core/testing';

import { ControleProcessosService } from './controle-processos.service';

describe('ControleProcessosService', () => {
  let service: ControleProcessosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleProcessosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
