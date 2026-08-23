import { Component, OnInit } from '@angular/core';
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

  // undefined até carregar; permanece undefined se o id da rota não bater
  // com nenhuma atividade (mostra o estado "não encontrada" no template).
  atividade: Atividade | undefined;

  constructor(atividadeService: AtividadeService, route: ActivatedRoute) {
    this.atividadeService = atividadeService;
    this.route = route;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.atividade = this.atividadeService.buscarAtividadePorId(id);
  }

  // Mesma lógica de cor de badge do atividade-list. Já é a 3ª cópia desse
  // método (a outra está no atividade-form... na verdade não, só aqui e na
  // lista) — bom candidato pra virar uma função utilitária compartilhada
  // em vez de repetida em cada componente.
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
