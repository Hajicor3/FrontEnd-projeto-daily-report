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
  filtroData: Date | null = null;
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

  // O <input type="date"> nativo só fala string "yyyy-MM-dd" (tanto pra
  // exibir quanto pra emitir mudanças). Esse getter/setter é a ponte entre
  // essa string e o "filtroData" tipado como Date de verdade: o getter
  // formata o Date pra string usando os componentes locais (getFullYear/
  // getMonth/getDate), e o setter faz o caminho inverso construindo o Date
  // a partir de ano/mês/dia (em vez de "new Date(valor)"), evitando o mesmo
  // problema de fuso horário (meia-noite UTC) que já resolvemos antes.
  get filtroDataInput(): string {
    if (!this.filtroData) return '';

    const ano = this.filtroData.getFullYear();
    const mes = String(this.filtroData.getMonth() + 1).padStart(2, '0');
    const dia = String(this.filtroData.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  set filtroDataInput(valor: string) {
    if (!valor) {
      this.filtroData = null;
      return;
    }

    const [ano, mes, dia] = valor.split('-').map(Number);
    this.filtroData = new Date(ano, mes - 1, dia);
  }

  get atividadesFiltradas(): Atividade[] {
    const termo = this.termoBusca.toLowerCase().trim();

    // "data" é uma string yyyy-MM-dd. Comparamos com "filtroDataInput" (que
    // já é a mesma string formatada a partir do Date) em vez de comparar
    // objetos Date entre si, mantendo a mesma abordagem de string usada no
    // resto do componente.
    return this.atividades()
      .filter(a => this.categoriaSelecionada === 'TODAS' || a.categoria === this.categoriaSelecionada)
      .filter(a => a.titulo.toLowerCase().includes(termo))
      .filter(a => !this.filtroData || a.data === this.filtroDataInput)
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
}
