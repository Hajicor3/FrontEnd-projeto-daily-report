import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasForm } from './empresas-form';

describe('EmpresasForm', () => {
  let component: EmpresasForm;
  let fixture: ComponentFixture<EmpresasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
