import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligacionesLegales } from './obligaciones-legales';

describe('ObligacionesLegales', () => {
  let component: ObligacionesLegales;
  let fixture: ComponentFixture<ObligacionesLegales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObligacionesLegales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObligacionesLegales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
