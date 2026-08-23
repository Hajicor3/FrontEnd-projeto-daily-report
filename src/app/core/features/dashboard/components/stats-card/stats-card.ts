import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Atividade } from '../../../atividade/models/atividade.model';
import { EmpresaModel } from '../../../empresas/models/empresa.model';

@Component({
  imports: [MatIconModule, DecimalPipe],
  selector: 'app-stats-card',
  styleUrl: './stats-card.scss',
  templateUrl: './stats-card.html',
})
export class StatsCard {

  atividades = input<Atividade[]>([]);
  empresas = input<EmpresaModel[]>([]);

  private atividadesDoMes = computed(() => {
    const hoje = new Date();
    const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0');
    const anoAtual = String(hoje.getFullYear());

    return this.atividades()
      .filter(a => a.data.slice(5, 7) === mesAtual && a.data.slice(0, 4) === anoAtual);
  });

  horasTrabalhadasMes = computed(() => {
    const minutos = this.atividadesDoMes().reduce((soma, a) => soma + a.minutosTrabalhados, 0);
    return minutos / 60;
  });

  produtividade = computed(() => {
    const atividades = this.atividadesDoMes();
    const minutos = atividades.reduce((soma, a) => soma + a.minutosTrabalhados, 0);
    const diasTrabalhados = new Set(atividades.map(a => a.data)).size;

    return diasTrabalhados > 0 ? (minutos / 60) / diasTrabalhados : 0;
  });
}
