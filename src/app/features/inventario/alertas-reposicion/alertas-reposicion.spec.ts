import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasReposicion } from './alertas-reposicion';

describe('AlertasReposicion', () => {
  let component: AlertasReposicion;
  let fixture: ComponentFixture<AlertasReposicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasReposicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasReposicion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
