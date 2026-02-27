import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLegajos } from './gestion-legajos';

describe('GestionLegajos', () => {
  let component: GestionLegajos;
  let fixture: ComponentFixture<GestionLegajos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionLegajos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionLegajos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
