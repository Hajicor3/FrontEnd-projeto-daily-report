import { Component, OnInit } from '@angular/core';
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

  empresas: EmpresaModel[] = [];
  categorias = Object.values(CategoriaAtividade);

  atividadeId: number | null = null;

  form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: Validators.required }),
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
    this.empresaService.buscarEmpresas().subscribe(response => {
      this.empresas = response;
    });
  }

  loadAtividadeData(id: number) {
    this.atividadeService.buscarAtividadePorId(id).subscribe(atividade => {
      if (atividade != null) {
        this.preencherFormComAtividade(atividade);
      }
    });
  }

  private preencherFormComAtividade(atividade: Atividade): void {
    this.form.patchValue({
      titulo: atividade.titulo,
      data: this.formatarData(atividade.data),
      categoria: atividade.categoriaAtividade,
      empresaId: atividade.empresaId,
      projeto: atividade.projeto,
      horaInicio: this.formatarHora(atividade.horaInicio),
      horaFim: this.formatarHora(atividade.horaFim),
      descricao: atividade.descricao,
      observacao: atividade.observacao,
    });
  }

  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  private formatarHora(hora: Date): string {
    const h = hora.getHours().toString().padStart(2, '0');
    const m = hora.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
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
      categoria: valores.categoria!,
      empresaId: valores.empresaId!,
      projeto: valores.projeto || undefined,
      horaInicio: valores.horaInicio!,
      horaFim: valores.horaFim!,
      descricao: valores.descricao || undefined,
      observacao: valores.observacao || undefined,
    };

    if (this.atividadeId) {
      this.atividadeService.atualizarAtividade(this.atividadeId, request).subscribe(response => {
        this.router.navigate(['/atividade', this.atividadeId]);
      });

    } else {
      this.atividadeService.criarAtividade(request).subscribe(response => {
        this.router.navigate(['/atividades']);
      });

    }
  }
}
