import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfaseComponent } from './subfase.component';

describe('SubfaseComponent', () => {
  let component: SubfaseComponent;
  let fixture: ComponentFixture<SubfaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubfaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubfaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
