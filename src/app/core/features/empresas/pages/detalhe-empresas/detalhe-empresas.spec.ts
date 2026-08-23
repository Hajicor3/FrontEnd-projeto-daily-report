import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheEmpresas } from './detalhe-empresas';

describe('DetalheEmpresas', () => {
  let component: DetalheEmpresas;
  let fixture: ComponentFixture<DetalheEmpresas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEmpresas],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheEmpresas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
