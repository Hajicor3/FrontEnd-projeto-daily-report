import { Observable } from 'rxjs';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service';
import { EmpresaModel } from '../../models/empresa.model';

@Component({
  imports: [CommonModule, DatePipe, RouterLink],
  selector: 'app-detalhe-empresas',
  styleUrl: './detalhe-empresas.scss',
  templateUrl: './detalhe-empresas.html',
})
export class DetalheEmpresas implements OnInit {
  empresaService: EmpresaService;
  route: ActivatedRoute;

  empresa = signal<EmpresaModel | undefined>(undefined);

  constructor(empresaService: EmpresaService, route: ActivatedRoute) {
    this.empresaService = empresaService;
    this.route = route;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmpresaData(id)
  }

  loadEmpresaData(id: number) {
    this.empresaService.buscarEmpresaPorId(id).subscribe({
      next: (response) => {
        console.log('✅ Empresa carregada com sucesso!');
        this.empresa.set(response);
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar empresa com id: " + id);
        console.error("erro: " + erro.message);
      }
    })
  }
}
