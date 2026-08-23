import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Atividade } from '../../../atividade/models/atividade.model';
import { CategoriaAtividade } from '../../../atividade/models/categoria-atividade.enum';
import { ChartHours } from "../chart-hours/chart-hours";

@Component({
  imports: [CommonModule, DatePipe, ChartHours],
  selector: 'app-today-activities',
  styleUrl: './today-activities.scss',
  templateUrl: './today-activities.html',
})
export class TodayActivities {
  atividades: Atividade[] = [
    new Atividade(
      1,
      new Date(2026, 7, 22),
      'Implementação integração JAE',
      'Desenvolvimento da integração com o sistema JAE',
      1,
      'VT Integração',
      'Integração JAE',
      CategoriaAtividade.DESENVOLVIMENTO,
      new Date(2026, 7, 22, 9, 0),
      new Date(2026, 7, 22, 11, 30),
      150,
      '',
      new Date(2026, 7, 22, 9, 0),
      new Date(2026, 7, 22, 11, 30)
    ),
    new Atividade(
      2,
      new Date(2026, 7, 22),
      'Daily da equipe',
      'Reunião diária de alinhamento com a equipe',
      1,
      'VT Integração',
      'Integração JAE',
      CategoriaAtividade.REUNIAO,
      new Date(2026, 7, 22, 11, 30),
      new Date(2026, 7, 22, 12, 0),
      30,
      '',
      new Date(2026, 7, 22, 11, 30),
      new Date(2026, 7, 22, 12, 0)
    ),
    new Atividade(
      3,
      new Date(2026, 7, 22),
      'Correção de pipeline',
      'Correção de falha no pipeline de deploy',
      1,
      'VT Integração',
      'Integração JAE',
      CategoriaAtividade.CORRECAO_BUG,
      new Date(2026, 7, 22, 14, 0),
      new Date(2026, 7, 22, 16, 0),
      120,
      '',
      new Date(2026, 7, 22, 14, 0),
      new Date(2026, 7, 22, 16, 0)
    ),
  ];
}
