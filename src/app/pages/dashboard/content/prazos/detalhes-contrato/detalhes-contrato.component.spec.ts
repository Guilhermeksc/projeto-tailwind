import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesContratoComponent } from './detalhes-contrato.component';

describe('DetalhesContratoComponent', () => {
  let component: DetalhesContratoComponent;
  let fixture: ComponentFixture<DetalhesContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
