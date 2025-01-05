import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasnetContratosComponent } from './comprasnet-contratos.component';

describe('ComprasnetContratosComponent', () => {
  let component: ComprasnetContratosComponent;
  let fixture: ComponentFixture<ComprasnetContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasnetContratosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasnetContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
