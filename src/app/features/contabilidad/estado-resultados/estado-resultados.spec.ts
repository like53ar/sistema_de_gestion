import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoResultados } from './estado-resultados';

describe('EstadoResultados', () => {
  let component: EstadoResultados;
  let fixture: ComponentFixture<EstadoResultados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoResultados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoResultados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
