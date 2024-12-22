import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTabelaComponent } from './filtro-tabela.component';

describe('FiltroTabelaComponent', () => {
  let component: FiltroTabelaComponent;
  let fixture: ComponentFixture<FiltroTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
