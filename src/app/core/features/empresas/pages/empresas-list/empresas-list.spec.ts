import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasList } from './empresas-list';

describe('EmpresasList', () => {
  let component: EmpresasList;
  let fixture: ComponentFixture<EmpresasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
