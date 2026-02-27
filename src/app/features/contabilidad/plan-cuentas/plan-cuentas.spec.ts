import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCuentas } from './plan-cuentas';

describe('PlanCuentas', () => {
  let component: PlanCuentas;
  let fixture: ComponentFixture<PlanCuentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCuentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCuentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
