import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AtividadeService } from '../../../../services/atividade.service';
import { Atividade } from '../../models/atividade.model';
import { CategoriaAtividade } from '../../models/categoria-atividade.enum';

@Component({
  imports: [CommonModule, DatePipe, RouterLink],
  selector: 'app-detalhe-atividade',
  styleUrl: './detalhe-atividade.scss',
  templateUrl: './detalhe-atividade.html',
})
export class DetalheAtividade implements OnInit {
  atividadeService: AtividadeService;
  route: ActivatedRoute;

  atividade = signal<Atividade | undefined>(undefined);

  constructor(atividadeService: AtividadeService, route: ActivatedRoute) {
    this.atividadeService = atividadeService;
    this.route = route;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAtividadeData(id);
  }

  loadAtividadeData(id: number) {
    this.atividadeService.buscarAtividadePorId(id).subscribe({
      next: (response) => {
        console.log('✅ Atividade carregada com sucesso!');
        this.atividade.set(response);
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar atividade no id: " + id);
        console.error("Erro: " + erro.message);
      }
    });
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
