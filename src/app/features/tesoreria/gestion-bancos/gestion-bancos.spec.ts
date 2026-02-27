import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBancos } from './gestion-bancos';

describe('GestionBancos', () => {
  let component: GestionBancos;
  let fixture: ComponentFixture<GestionBancos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBancos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBancos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
