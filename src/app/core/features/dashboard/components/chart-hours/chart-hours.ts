import { Component, input } from '@angular/core';
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

  empresas = input<EmpresaModel[]>([]);
  atividades = input<Atividade[]>([]);

  get horasPorEmpresa() {
    const totais = this.empresas().map(empresa => {
      const minutos = this.atividades()
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
