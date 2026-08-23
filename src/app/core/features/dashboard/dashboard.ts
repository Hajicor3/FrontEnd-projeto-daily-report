import { AtividadeService } from './../../services/atividade.service';
import { Atividade } from './../atividade/models/atividade.model';
import { CategoriaAtividade } from '../atividade/models/categoria-atividade.enum';
import { Component } from '@angular/core';
import { StatsCard } from "./components/stats-card/stats-card";
import { TodayActivities } from "./components/today-activities/today-activities";
import { EmpresaModel } from "./../empresas/models/empresa.model";
import { EmpresaService } from '../../services/empresa.service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [StatsCard, TodayActivities, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  atividadeService: AtividadeService;
  empresaService: EmpresaService;

  atividades: Atividade[] = [];
  empresas: EmpresaModel[] = []

  constructor(atividadeService: AtividadeService, empresaService: EmpresaService){
    this.atividadeService = atividadeService;
    this.empresaService = empresaService;
  }

  ngOnInit() {
    this.atividades = this.atividadeService.buscarAtividades();
    this.empresas = this.empresaService.buscarEmpresas();
  }
}
