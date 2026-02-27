import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCompra } from './ordenes-compra';

describe('OrdenesCompra', () => {
  let component: OrdenesCompra;
  let fixture: ComponentFixture<OrdenesCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
