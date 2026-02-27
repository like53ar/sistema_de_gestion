import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPagos } from './seguimiento-pagos';

describe('SeguimientoPagos', () => {
  let component: SeguimientoPagos;
  let fixture: ComponentFixture<SeguimientoPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoPagos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
