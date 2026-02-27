import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorizacionInventario } from './valorizacion-inventario';

describe('ValorizacionInventario', () => {
  let component: ValorizacionInventario;
  let fixture: ComponentFixture<ValorizacionInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorizacionInventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorizacionInventario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
