import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionHaberes } from './liquidacion-haberes';

describe('LiquidacionHaberes', () => {
  let component: LiquidacionHaberes;
  let fixture: ComponentFixture<LiquidacionHaberes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidacionHaberes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidacionHaberes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
