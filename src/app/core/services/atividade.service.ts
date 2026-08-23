import { Service } from '@angular/core';
import { Atividade } from '../features/atividade/models/atividade.model';
import { CategoriaAtividade } from '../features/atividade/models/categoria-atividade.enum';
import { AtividadeRequest } from '../features/atividade/models/atividade-request.model';

@Service()
export class AtividadeService {

  buscarAtividades(): Atividade[] {
    const atividades: Atividade[] = [
        new Atividade(
          1,
          new Date(2026, 7, 18),
          'Implementação integração JAE',
          'Desenvolvimento da integração com o sistema JAE',
          1,
          'VT Integração',
          'Integração JAE',
          CategoriaAtividade.DESENVOLVIMENTO,
          new Date(2026, 7, 18, 9, 0),
          new Date(2026, 7, 18, 12, 0),
          180,
          '',
          new Date(2026, 7, 18, 9, 0),
          new Date(2026, 7, 18, 12, 0)
        ),
        new Atividade(
          2,
          new Date(2026, 7, 19),
          'Correção de bug na bilhetagem',
          'Correção de falha no cálculo de tarifas',
          1,
          'VT Integração',
          'Integração JAE',
          CategoriaAtividade.CORRECAO_BUG,
          new Date(2026, 7, 19, 13, 0),
          new Date(2026, 7, 19, 15, 30),
          150,
          '',
          new Date(2026, 7, 19, 13, 0),
          new Date(2026, 7, 19, 15, 30)
        ),
        new Atividade(
          3,
          new Date(2026, 7, 17),
          'Reunião de alinhamento do projeto',
          'Alinhamento de escopo com o cliente',
          2,
          'Tech Solutions',
          'Portal do Cliente',
          CategoriaAtividade.REUNIAO,
          new Date(2026, 7, 17, 10, 0),
          new Date(2026, 7, 17, 11, 0),
          60,
          '',
          new Date(2026, 7, 17, 10, 0),
          new Date(2026, 7, 17, 11, 0)
        ),
        new Atividade(
          4,
          new Date(2026, 7, 20),
          'Desenvolvimento de API de relatórios',
          'Criação dos endpoints de exportação de relatórios',
          2,
          'Tech Solutions',
          'Portal do Cliente',
          CategoriaAtividade.DESENVOLVIMENTO,
          new Date(2026, 7, 20, 14, 0),
          new Date(2026, 7, 20, 18, 0),
          240,
          '',
          new Date(2026, 7, 20, 14, 0),
          new Date(2026, 7, 20, 18, 0)
        ),
        new Atividade(
          5,
          new Date(2026, 7, 18),
          'Testes de regressão do módulo financeiro',
          'Validação das rotinas de cobrança após atualização',
          3,
          'Sistema Escolar',
          'Gestão Financeira',
          CategoriaAtividade.TESTES,
          new Date(2026, 7, 18, 9, 0),
          new Date(2026, 7, 18, 11, 0),
          120,
          '',
          new Date(2026, 7, 18, 9, 0),
          new Date(2026, 7, 18, 11, 0)
        ),
        new Atividade(
          6,
          new Date(2026, 7, 21),
          'Documentação da API de matrícula',
          'Escrita da documentação técnica dos endpoints',
          3,
          'Sistema Escolar',
          'Gestão Financeira',
          CategoriaAtividade.DOCUMENTACAO,
          new Date(2026, 7, 21, 15, 0),
          new Date(2026, 7, 21, 16, 30),
          90,
          '',
          new Date(2026, 7, 21, 15, 0),
          new Date(2026, 7, 21, 16, 30)
        ),
        new Atividade(
          7,
          new Date(2026, 7, 19),
          'Deploy da nova versão do site',
          'Publicação da versão 2.3 em produção',
          4,
          'Outros',
          'Site Institucional',
          CategoriaAtividade.DEPLOY,
          new Date(2026, 7, 19, 17, 0),
          new Date(2026, 7, 19, 18, 0),
          60,
          '',
          new Date(2026, 7, 19, 17, 0),
          new Date(2026, 7, 19, 18, 0)
        ),
        new Atividade(
          8,
          new Date(2026, 7, 20),
          'Suporte a cliente sobre relatório mensal',
          'Atendimento de dúvida sobre exportação de dados',
          4,
          'Outros',
          'Site Institucional',
          CategoriaAtividade.SUPORTE,
          new Date(2026, 7, 20, 10, 0),
          new Date(2026, 7, 20, 10, 45),
          45,
          '',
          new Date(2026, 7, 20, 10, 0),
          new Date(2026, 7, 20, 10, 45)
        ),
      ];
    return atividades;
  }

  criarAtividade(request: AtividadeRequest): void {
    console.log('criarAtividade chamado com:', request);
  }

  buscarAtividadePorId(id: number): Atividade | undefined {
    return this.buscarAtividades().find(a => a.id === id);
  }
}
