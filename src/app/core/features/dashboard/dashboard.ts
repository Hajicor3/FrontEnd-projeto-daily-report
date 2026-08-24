import { AtividadeService } from './../../services/atividade.service';
import { Atividade } from './../atividade/models/atividade.model';
import { CategoriaAtividade } from '../atividade/models/categoria-atividade.enum';
import { Component, signal } from '@angular/core';
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

  atividades = signal<Atividade[]>([]);
  empresas = signal<EmpresaModel[]>([]);

  constructor(atividadeService: AtividadeService, empresaService: EmpresaService){
    this.atividadeService = atividadeService;
    this.empresaService = empresaService;
  }

  ngOnInit() {
    this.loadAtividades();
    this.loadEmpresas();
  }

  loadAtividades() {
     this.atividadeService.buscarAtividades().subscribe({
      next: (response) => {
        console.log('✅ Atividades carregadas com sucesso!');
        this.atividades.set(response);
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar atividades: " + erro);
      }
     })
  }

  loadEmpresas() {
    this.empresaService.buscarEmpresas().subscribe({
      next: (response) => {
        console.log('✅ Empresas carregadas com sucesso!');
        this.empresas.set(response);
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar empresas: " + erro);
      }
    });
  }
}
