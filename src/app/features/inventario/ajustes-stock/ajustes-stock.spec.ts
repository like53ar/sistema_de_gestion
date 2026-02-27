import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesStock } from './ajustes-stock';

describe('AjustesStock', () => {
  let component: AjustesStock;
  let fixture: ComponentFixture<AjustesStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
