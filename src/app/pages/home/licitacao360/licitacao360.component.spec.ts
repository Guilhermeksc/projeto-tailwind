import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Licitacao360Component } from './licitacao360.component';

describe('Licitacao360Component', () => {
  let component: Licitacao360Component;
  let fixture: ComponentFixture<Licitacao360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Licitacao360Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Licitacao360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
