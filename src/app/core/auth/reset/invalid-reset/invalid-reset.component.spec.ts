import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidResetComponent } from './invalid-reset.component';

describe('InvalidResetComponent', () => {
  let component: InvalidResetComponent;
  let fixture: ComponentFixture<InvalidResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
