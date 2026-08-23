import { Service } from '@angular/core';
import { EmpresaModel } from '../features/empresas/models/empresa.model';
import { EmpresaRequest } from '../features/empresas/models/empresa-request.model';

@Service()
export class EmpresaService {

  buscarEmpresas(): EmpresaModel[] {
    const empresas: EmpresaModel[] = [
    new EmpresaModel(
      1,
      'VT Integração',
      'Integração de sistemas de transporte e bilhetagem',
      new Date(2026, 0, 10),
      new Date(2026, 0, 10)
    ),
    new EmpresaModel(
      2,
      'Tech Solutions',
      'Consultoria e desenvolvimento de software sob demanda',
      new Date(2026, 1, 15),
      new Date(2026, 1, 15)
    ),
    new EmpresaModel(
      3,
      'Sistema Escolar',
      'Plataforma de gestão acadêmica para escolas',
      new Date(2026, 2, 3),
      new Date(2026, 2, 3)
    ),
    new EmpresaModel(
      4,
      'Outros',
      'Projetos pontuais e freelas diversos',
      new Date(2026, 3, 1),
      new Date(2026, 3, 1)
    ),
  ];
  return empresas;
  }

  buscarEmpresaPorId(id: number): EmpresaModel | undefined {
    return this.buscarEmpresas().find(e => e.id === id);
  }

  criarEmpresa(request: EmpresaRequest): void {
    console.log('criarEmpresa chamado com:', request);
  }

  atualizarEmpresa(id: number, request: EmpresaRequest): void {
    console.log(`atualizarEmpresa(${id}) chamado com:`, request);
  }
}
