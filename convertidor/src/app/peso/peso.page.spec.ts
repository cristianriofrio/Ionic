import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesoPage } from './peso.page';

describe('DistanciaPage', () => {
  let component: PesoPage;
  let fixture: ComponentFixture<PesoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
