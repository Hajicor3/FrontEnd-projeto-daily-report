import { LoadingService } from './../../../../services/loading.service';
import { EmpresaService } from './../../../../services/empresa.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AtividadeService } from '../../../../services/atividade.service';
import { Atividade } from '../../models/atividade.model';
import { CategoriaAtividade } from '../../models/categoria-atividade.enum';
import { EmpresaModel } from '../../../empresas/models/empresa.model';
import { FiltroAtividade } from '../../models/filtro-atividade';

@Component({
  imports: [CommonModule, DatePipe, FormsModule, RouterLink],
  selector: 'app-atividade-list',
  styleUrl: './atividade-list.scss',
  templateUrl: './atividade-list.html',
})
export class AtividadeList implements OnInit {
  atividadeService: AtividadeService;
  empresaService: EmpresaService;
  loadingService:LoadingService;
  empresaSelecionada: any = null;

  atividades = signal<Atividade[]>([]);
  empresas = signal<EmpresaModel[]>([]);

  firstLoad = signal<boolean>(false);
  loading = signal<boolean>(false);

  filtro: FiltroAtividade = {
    data: null,
    empresaId: null,
    projeto: null,
    encarregado: null,
    categoria: null,
    dataInicial: null,
    dataFinal: null,
  };

  categorias = Object.values(CategoriaAtividade);

  constructor(atividadeService: AtividadeService, empresaService: EmpresaService, loadingService:LoadingService) {
    this.atividadeService = atividadeService;
    this.empresaService = empresaService;
    this.loadingService = loadingService;
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadAtividades(filtro: FiltroAtividade) {
    this.atividadeService.buscarAtividades(filtro).subscribe({
      next: (response) => {
        console.log('✅ Atividades carregadas com sucesso!');
        this.atividades.set(response);
        this.firstLoad.set(true);
        this.loading.set(false);
        this.loadingService.hide();
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar atividades: " + erro.message)
        this.firstLoad.set(true);
        this.loading.set(false);
        this.loadingService.hide();
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
        console.error("❌ Falha ao carregar ampresas: " + erro.message)
      }
    });
  }

  buscarAtividadesPorFiltro(){
    this.loading.set(true);
    this.loadingService.show();
    this.loadAtividades(this.filtro);
  }

  get atividadesLength() {
    return this.atividades().length;
  }

  limparFiltros() {
    if(this.filtro){
      this.filtro.categoria = null;
      this.filtro.data = null;
      this.filtro.dataFinal = null;
      this.filtro.dataInicial = null;
      this.filtro.empresaId = null;
      this.filtro.projeto = null;
      this.filtro.encarregado = null;
    }
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
