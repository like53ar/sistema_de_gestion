import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionContable } from './integracion-contable';

describe('IntegracionContable', () => {
  let component: IntegracionContable;
  let fixture: ComponentFixture<IntegracionContable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegracionContable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegracionContable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
