// src/app/core/auth/register/register.service.spec.ts

import { TestBed } from '@angular/core/testing';

import { RegisterService } from '../register/register.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
