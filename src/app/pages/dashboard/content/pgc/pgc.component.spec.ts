import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgcComponent } from './pgc.component';

describe('PgcComponent', () => {
  let component: PgcComponent;
  let fixture: ComponentFixture<PgcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
