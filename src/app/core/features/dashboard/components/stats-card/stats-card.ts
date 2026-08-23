import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Atividade } from '../../../atividade/models/atividade.model';
import { EmpresaModel } from '../../../empresas/models/empresa.model';

@Component({
  imports: [MatIconModule],
  selector: 'app-stats-card',
  styleUrl: './stats-card.scss',
  templateUrl: './stats-card.html',
})
export class StatsCard {
  @Input()
  atividades: Atividade[] = [];

  @Input()
  empresas: EmpresaModel[] = [];
}
