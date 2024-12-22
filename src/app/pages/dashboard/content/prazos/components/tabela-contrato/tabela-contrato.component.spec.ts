import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaContratosComponent } from './tabela-contrato.component';

describe('TabelaContratoComponent', () => {
  let component: TabelaContratosComponent;
  let fixture: ComponentFixture<TabelaContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaContratosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
