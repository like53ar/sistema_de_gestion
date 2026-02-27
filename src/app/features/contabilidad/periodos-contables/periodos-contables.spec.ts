import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosContables } from './periodos-contables';

describe('PeriodosContables', () => {
  let component: PeriodosContables;
  let fixture: ComponentFixture<PeriodosContables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodosContables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodosContables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
