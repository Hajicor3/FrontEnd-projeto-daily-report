import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Atividade } from '../../../atividade/models/atividade.model';
import { ChartHours } from "../chart-hours/chart-hours";
import { EmpresaModel } from '../../../empresas/models/empresa.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, DatePipe, ChartHours, RouterLink],
  selector: 'app-today-activities',
  styleUrl: './today-activities.scss',
  templateUrl: './today-activities.html',
})
export class TodayActivities {
  @Input()
  atividades: Atividade[] = [];

  @Input()
  empresas: EmpresaModel[] = [];
}
