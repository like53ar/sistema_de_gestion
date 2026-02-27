import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionBancaria } from './conciliacion-bancaria';

describe('ConciliacionBancaria', () => {
  let component: ConciliacionBancaria;
  let fixture: ComponentFixture<ConciliacionBancaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliacionBancaria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliacionBancaria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
