import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultaunidade_compraComponent } from './consulta-unidade_compra.component';

describe('Consultaunidade_compraComponent', () => {
  let component: Consultaunidade_compraComponent;
  let fixture: ComponentFixture<Consultaunidade_compraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultaunidade_compraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultaunidade_compraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
