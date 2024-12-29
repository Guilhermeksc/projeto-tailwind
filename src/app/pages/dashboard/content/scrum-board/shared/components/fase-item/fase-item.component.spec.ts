import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseItemComponent } from './fase-item.component';

describe('FaseItemComponent', () => {
  let component: FaseItemComponent;
  let fixture: ComponentFixture<FaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
