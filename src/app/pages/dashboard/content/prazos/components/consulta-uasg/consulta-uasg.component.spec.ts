import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUasgComponent } from './consulta-uasg.component';

describe('ConsultaUasgComponent', () => {
  let component: ConsultaUasgComponent;
  let fixture: ComponentFixture<ConsultaUasgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaUasgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaUasgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
