import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Atividade } from '../../../atividade/models/atividade.model';
import { ChartHours } from "../chart-hours/chart-hours";
import { EmpresaModel } from '../../../empresas/models/empresa.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, ChartHours, RouterLink],
  selector: 'app-today-activities',
  styleUrl: './today-activities.scss',
  templateUrl: './today-activities.html',
})
export class TodayActivities {
  atividades = input<Atividade[]>([]);
  empresas = input<EmpresaModel[]>([]);

  DataAtual = new Date();
  horasTotaisDia = computed(() => {
    const minutos = this.atividadesDeHoje().reduce((soma, a) => soma + a.minutosTrabalhados, 0)
    return minutos / 60
  })

  atividadesDeHoje = computed(() => {
    const hoje = new Date();
    const ano = String(hoje.getFullYear());
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const hojeStr = `${ano}-${mes}-${dia}`;

    return this.atividades().filter(a => a.data === hojeStr);
  });
}
