import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArqueoCaja } from './arqueo-caja';

describe('ArqueoCaja', () => {
  let component: ArqueoCaja;
  let fixture: ComponentFixture<ArqueoCaja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArqueoCaja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArqueoCaja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
