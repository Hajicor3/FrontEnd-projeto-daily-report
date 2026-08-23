import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaModel } from '../../../empresas/models/empresa.model';
import { Atividade } from '../../../atividade/models/atividade.model';
import { CategoriaAtividade } from '../../../atividade/models/categoria-atividade.enum';

@Component({
  imports: [CommonModule],
  selector: 'app-chart-hours',
  styleUrl: './chart-hours.scss',
  templateUrl: './chart-hours.html',
})
export class ChartHours {
  empresas: EmpresaModel[] = [
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

  atividades: Atividade[] = [
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

  get horasPorEmpresa() {
    const totais = this.empresas.map(empresa => {
      const minutos = this.atividades
        .filter(a => a.empresaId === empresa.id)
        .reduce((soma, a) => soma + a.minutosTrabalhados, 0);

      return {
        empresa: empresa.nome,
        horas: minutos / 60,
      };
    });

    const maxHoras = Math.max(...totais.map(t => t.horas));

    return totais.map(t => ({
      ...t,
      percentual: maxHoras > 0 ? (t.horas / maxHoras) * 100 : 0,
    }));
  }
}
