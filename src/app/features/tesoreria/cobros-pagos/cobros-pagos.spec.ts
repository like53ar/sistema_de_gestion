import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosPagos } from './cobros-pagos';

describe('CobrosPagos', () => {
  let component: CobrosPagos;
  let fixture: ComponentFixture<CobrosPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobrosPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrosPagos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
