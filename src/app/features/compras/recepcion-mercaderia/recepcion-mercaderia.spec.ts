import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionMercaderia } from './recepcion-mercaderia';

describe('RecepcionMercaderia', () => {
  let component: RecepcionMercaderia;
  let fixture: ComponentFixture<RecepcionMercaderia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionMercaderia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionMercaderia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
