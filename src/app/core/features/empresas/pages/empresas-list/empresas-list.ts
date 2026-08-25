import { LoadingService } from './../../../../services/loading.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service';
import { EmpresaModel } from '../../models/empresa.model';

@Component({
  imports: [CommonModule, DatePipe, FormsModule, RouterLink],
  selector: 'app-empresas-list',
  styleUrl: './empresas-list.scss',
  templateUrl: './empresas-list.html',
})
export class EmpresasList implements OnInit {
  empresaService: EmpresaService;
  loadingService: LoadingService;

  empresas = signal<EmpresaModel[]>([]);

  termoBusca: string = '';

  constructor(empresaService: EmpresaService, loadingService: LoadingService) {
    this.empresaService = empresaService;
    this.loadingService = loadingService;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresaService.buscarEmpresas().subscribe({
      next: (response) => {
        console.log('✅ Empresas carregadas com sucesso!');
        this.empresas.set(response);
        this.loadingService.hide();
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar empresas: " + erro.message);
        this.loadingService.hide();
      }
    });
  }

  get empresasFiltradas(): EmpresaModel[] {
    const termo = this.termoBusca.toLowerCase().trim();

    return this.empresas()
      .filter(e => e.nome.toLowerCase().includes(termo))
      .sort((a, b) => a.nome.localeCompare(b.nome as string));
  }
}
