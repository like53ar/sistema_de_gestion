import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoCaja } from './flujo-caja';

describe('FlujoCaja', () => {
  let component: FlujoCaja;
  let fixture: ComponentFixture<FlujoCaja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlujoCaja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlujoCaja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
