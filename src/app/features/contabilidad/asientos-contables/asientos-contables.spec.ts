import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosContables } from './asientos-contables';

describe('AsientosContables', () => {
  let component: AsientosContables;
  let fixture: ComponentFixture<AsientosContables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsientosContables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsientosContables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
