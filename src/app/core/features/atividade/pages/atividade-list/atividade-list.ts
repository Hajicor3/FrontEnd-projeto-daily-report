import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AtividadeService } from '../../../../services/atividade.service';
import { Atividade } from '../../models/atividade.model';
import { CategoriaAtividade } from '../../models/categoria-atividade.enum';

@Component({
  imports: [CommonModule, DatePipe, FormsModule, RouterLink],
  selector: 'app-atividade-list',
  styleUrl: './atividade-list.scss',
  templateUrl: './atividade-list.html',
})
export class AtividadeList implements OnInit {
  atividadeService: AtividadeService;

  atividades = signal<Atividade[]>([]);

  termoBusca: string = '';
  filtroMes: string = '';
  filtroAno: string = new Date().getFullYear().toString();
  categoriaSelecionada: CategoriaAtividade | 'TODAS' = 'TODAS';

  categorias = Object.values(CategoriaAtividade);

  constructor(atividadeService: AtividadeService) {
    this.atividadeService = atividadeService;
  }

  ngOnInit(): void {
    this.loadAtividades();
  }

  loadAtividades() {
    this.atividadeService.buscarAtividades().subscribe(atividades => {
      this.atividades.set(atividades);
    })
  }

  get atividadesFiltradas(): Atividade[] {
    const termo = this.termoBusca.toLowerCase().trim();
    // "data" é uma string yyyy-MM-dd. Comparamos por pedaços de string em vez
    // de passar por `new Date(...)`, pra não cair no mesmo problema de fuso
    // horário: string ISO nesse formato já compara e ordena certinho como
    // texto, sem ambiguidade nenhuma.
    const temFiltroData = this.filtroMes.length === 2 && this.filtroAno.length === 4;

    return this.atividades()
      .filter(a => this.categoriaSelecionada === 'TODAS' || a.categoria === this.categoriaSelecionada)
      .filter(a => a.titulo.toLowerCase().includes(termo))
      .filter(a => !temFiltroData || (a.data.slice(5, 7) === this.filtroMes && a.data.slice(0, 4) === this.filtroAno))
      .sort((a, b) => b.data.localeCompare(a.data));
  }

  corDaCategoria(categoria: CategoriaAtividade): string {
    const mapa: Record<CategoriaAtividade, string> = {
      [CategoriaAtividade.DESENVOLVIMENTO]: 'badge-dev',
      [CategoriaAtividade.CORRECAO_BUG]: 'badge-bug',
      [CategoriaAtividade.REUNIAO]: 'badge-reuniao',
      [CategoriaAtividade.TESTES]: 'badge-testes',
      [CategoriaAtividade.DOCUMENTACAO]: 'badge-doc',
      [CategoriaAtividade.DEPLOY]: 'badge-deploy',
      [CategoriaAtividade.SUPORTE]: 'badge-suporte',
      [CategoriaAtividade.ESTUDO]: 'badge-estudo',
      [CategoriaAtividade.OUTROS]: 'badge-outros',
    };
    return mapa[categoria];
  }

  onMesChange(valor: string, anoInputRef: HTMLInputElement): void {
    this.filtroMes = valor.replace(/\D/g, '').slice(0, 2);

    if (this.filtroMes.length === 2) {
      anoInputRef.focus();
    }
  }

  onAnoChange(valor: string): void {
    this.filtroAno = valor.replace(/\D/g, '').slice(0, 4);
  }
}
