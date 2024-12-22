import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazosComponent } from './prazos.component';

describe('PrazosComponent', () => {
  let component: PrazosComponent;
  let fixture: ComponentFixture<PrazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrazosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
