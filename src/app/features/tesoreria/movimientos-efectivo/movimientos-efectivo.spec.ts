import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosEfectivo } from './movimientos-efectivo';

describe('MovimientosEfectivo', () => {
  let component: MovimientosEfectivo;
  let fixture: ComponentFixture<MovimientosEfectivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosEfectivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosEfectivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
