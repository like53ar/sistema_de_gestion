import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCompras } from './registro-compras';

describe('RegistroCompras', () => {
  let component: RegistroCompras;
  let fixture: ComponentFixture<RegistroCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCompras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
