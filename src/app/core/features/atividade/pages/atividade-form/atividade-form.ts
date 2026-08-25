import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AtividadeService } from '../../../../services/atividade.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { EmpresaModel } from '../../../empresas/models/empresa.model';
import { Atividade } from '../../models/atividade.model';
import { CategoriaAtividade } from '../../models/categoria-atividade.enum';
import { AtividadeRequest } from '../../models/atividade-request.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-atividade-form',
  styleUrl: './atividade-form.scss',
  templateUrl: './atividade-form.html',
})
export class AtividadeForm implements OnInit {
  atividadeService: AtividadeService;
  empresaService: EmpresaService;
  route: ActivatedRoute;
  router: Router;

  empresas = signal<EmpresaModel[]>([]);
  categorias = Object.values(CategoriaAtividade);

  atividadeId: number | null = null;

  form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: Validators.required }),
    encarregado: new FormControl('', { nonNullable: true, validators: Validators.required }),
    data: new FormControl('', { nonNullable: true, validators: Validators.required }),
    categoria: new FormControl<CategoriaAtividade | null>(null, Validators.required),
    empresaId: new FormControl<number | null>(null, Validators.required),
    projeto: new FormControl('', { nonNullable: true }),
    horaInicio: new FormControl('', { nonNullable: true, validators: Validators.required }),
    horaFim: new FormControl('', { nonNullable: true, validators: Validators.required }),
    descricao: new FormControl('', { nonNullable: true }),
    observacao: new FormControl('', { nonNullable: true }),
  });

  constructor(
    atividadeService: AtividadeService,
    empresaService: EmpresaService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.atividadeService = atividadeService;
    this.empresaService = empresaService;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    this.loadEmpresas();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.atividadeId = Number(idParam);
    const atividade = this.loadAtividadeData(this.atividadeId);
  }

  loadEmpresas() {
    this.empresaService.buscarEmpresas().subscribe({
      next: (response) =>{
        console.log('✅ Empresas carregadas com sucesso!');
        this.empresas.set(response);
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar empresas: " + erro.message)
      }
    });
  }

  loadAtividadeData(id: number) {
    this.atividadeService.buscarAtividadePorId(id).subscribe({
      next: (response) => {
        if (response != null) {
          this.preencherFormComAtividade(response);
        }
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar atividade no id: "+ id);
        console.error("Erro: " + erro.message);
      }
    });
  }

  private preencherFormComAtividade(atividade: Atividade): void {
    this.form.patchValue({
      titulo: atividade.titulo,
      encarregado: atividade.encarregado,
      data: this.formatarData(atividade.data),
      categoria: atividade.categoria,
      empresaId: atividade.empresaId,
      projeto: atividade.projeto,
      horaInicio: this.formatarHora(atividade.horaInicio),
      horaFim: this.formatarHora(atividade.horaFim),
      descricao: atividade.descricao,
      observacao: atividade.observacao,
    });
  }

  private formatarData(data: string): string {
    // "data" já vem do backend como yyyy-MM-dd, que é o formato que o
    // input type="date" espera. Não passamos por `new Date(...)` aqui: uma
    // string de data "pura" (sem hora) é interpretada como meia-noite UTC, e
    // reformatar com getFullYear/getMonth/getDate (que leem no horário local)
    // pode voltar um dia a menos em fusos atrás do UTC.
    return data.slice(0, 10);
  }

  private formatarHora(hora: string): string {
    // "hora" vem como HH:mm:ss, sem nenhuma data junto — não dá pra montar um
    // Date válido só com isso. Como só precisamos do HH:mm pro input
    // type="time", um corte de string resolve sem esse problema.
    return hora.slice(0, 5);
  }

  campoInvalido(nome: string): boolean {
    const controle = this.form.get(nome);
    return !!controle && controle.invalid && (controle.touched || controle.dirty);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();

    const request: AtividadeRequest = {
      titulo: valores.titulo!,
      data: valores.data!,
      encarregado: valores.encarregado,
      categoria: valores.categoria!,
      empresaId: valores.empresaId!,
      projeto: valores.projeto || undefined,
      horaInicio: valores.horaInicio!,
      horaFim: valores.horaFim!,
      descricao: valores.descricao || undefined,
      observacao: valores.observacao || undefined,
    };

    if (this.atividadeId) {
      this.atividadeService.atualizarAtividade(this.atividadeId, request).subscribe({
        next: (response) => {
          console.log('✅ Atividade atualizada com sucesso!');
          this.router.navigate(['/atividade', this.atividadeId]);
        },
        error: (erro) => {
          console.error("❌ Falha ao atualizar a atividade: " + erro.message);
        }
      });

    } else {
      this.atividadeService.criarAtividade(request).subscribe({
        next: (response) => {
          console.log('✅ Atividade criada com sucesso!');
          this.router.navigate(['/atividades']);
        },
        error: (erro) => {
          console.error("❌ Falha ao salvar a atividade: " + erro.message);
        }
      });
    }
  }

  deletarAtividade(id: number){
    this.atividadeService.deletarAtividade(id).subscribe({
      next: () => {
        console.log('✅ Atividade deletada com sucesso!');
        this.router.navigate(['/atividades'])

      },
      error: (erro) => {
        console.error('❌ Erro ao deletar atividade:', erro.message);

      }
    })
  }
}
