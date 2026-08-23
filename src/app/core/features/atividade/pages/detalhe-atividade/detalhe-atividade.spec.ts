import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheAtividade } from './detalhe-atividade';

describe('DetalheAtividade', () => {
  let component: DetalheAtividade;
  let fixture: ComponentFixture<DetalheAtividade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheAtividade],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheAtividade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
