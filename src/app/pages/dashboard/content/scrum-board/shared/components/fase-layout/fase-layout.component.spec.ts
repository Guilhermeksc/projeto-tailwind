import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseLayoutComponent } from './fase-layout.component';

describe('FaseLayoutComponent', () => {
  let component: FaseLayoutComponent;
  let fixture: ComponentFixture<FaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
