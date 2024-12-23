import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingRobotComponent } from './flying-robot.component';

describe('FlyingRobotComponent', () => {
  let component: FlyingRobotComponent;
  let fixture: ComponentFixture<FlyingRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingRobotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
