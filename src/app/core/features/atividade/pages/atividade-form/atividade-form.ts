import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AtividadeService } from '../../../../services/atividade.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { EmpresaModel } from '../../../empresas/models/empresa.model';
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

  empresas: EmpresaModel[] = [];
  categorias = Object.values(CategoriaAtividade);

  // Formulário reativo, montado com FormGroup/FormControl "na mão" (sem
  // FormBuilder injetado) — assim o form fica pronto já no field
  // initializer, sem depender da ordem de execução do construtor.
  // Os campos com Validators.required espelham as anotações
  // @NotNull/@NotBlank do AtividadeRequest lá no backend.
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

  constructor(atividadeService: AtividadeService, empresaService: EmpresaService) {
    this.atividadeService = atividadeService;
    this.empresaService = empresaService;
  }

  ngOnInit(): void {
    this.empresas = this.empresaService.buscarEmpresas();
  }

  // Usado no template pra saber se mostra a borda vermelha + mensagem de erro
  // de um campo específico. Só mostra depois que o usuário mexeu no campo
  // (touched/dirty), pra não abrir a tela inteira "gritando" erro de cara.
  campoInvalido(nome: string): boolean {
    const controle = this.form.get(nome);
    return !!controle && controle.invalid && (controle.touched || controle.dirty);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // revela os erros de todos os campos, mesmo os que ninguém tocou ainda
      return;
    }

    const valores = this.form.getRawValue();

    // Os "!" abaixo são seguros aqui porque já garantimos form.valid acima
    // (os campos obrigatórios não podem mais ser null/vazio nesse ponto).
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

    this.atividadeService.criarAtividade(request);
  }
}
