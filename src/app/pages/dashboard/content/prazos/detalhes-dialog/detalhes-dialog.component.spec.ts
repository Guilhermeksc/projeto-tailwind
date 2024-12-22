import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDialogComponent } from './detalhes-dialog.component';

describe('DetalhesDialogComponent', () => {
  let component: DetalhesDialogComponent;
  let fixture: ComponentFixture<DetalhesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
