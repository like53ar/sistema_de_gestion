import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecios } from './lista-precios';

describe('ListaPrecios', () => {
  let component: ListaPrecios;
  let fixture: ComponentFixture<ListaPrecios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPrecios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPrecios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
