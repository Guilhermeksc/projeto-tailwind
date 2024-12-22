import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisidebarComponent } from './minisidebar.component';

describe('MinisidebarComponent', () => {
  let component: MinisidebarComponent;
  let fixture: ComponentFixture<MinisidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinisidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
